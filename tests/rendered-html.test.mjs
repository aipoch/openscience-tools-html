import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cp } from "node:fs/promises";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import test, { after, before } from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const buildRoot = join(projectRoot, ".next");
const standaloneRoot = join(buildRoot, "standalone");
const standaloneServer = join(standaloneRoot, "server.js");

let baseUrl;
let serverError;
let serverProcess;
let serverOutput = "";

function hasExited() {
  return (
    serverProcess.exitCode !== null || serverProcess.signalCode !== null
  );
}

function waitForProcessExit() {
  if (hasExited()) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const finish = () => {
      serverProcess.off("exit", finish);
      resolve();
    };

    serverProcess.once("exit", finish);
  });
}

async function reservePort() {
  const listener = createServer();
  listener.unref();

  await new Promise((resolve, reject) => {
    listener.once("error", reject);
    listener.listen(0, "127.0.0.1", resolve);
  });

  const address = listener.address();
  assert.ok(address && typeof address !== "string");

  await new Promise((resolve, reject) => {
    listener.close((error) => (error ? reject(error) : resolve()));
  });

  return address.port;
}

async function stopServer() {
  if (!serverProcess || hasExited() || serverProcess.pid === undefined) {
    return;
  }

  const exitPromise = waitForProcessExit().then(() => true);
  const terminationSent = serverProcess.kill("SIGTERM");
  if (!terminationSent && !hasExited()) {
    throw new Error("Could not send SIGTERM to the Next.js production server.");
  }

  const terminated = await Promise.race([
    exitPromise,
    delay(5_000, false, { ref: false }),
  ]);

  if (!terminated && !hasExited()) {
    const killSent = serverProcess.kill("SIGKILL");
    if (!killSent && !hasExited()) {
      throw new Error("Could not send SIGKILL to the Next.js production server.");
    }

    const killed = await Promise.race([
      exitPromise,
      delay(5_000, false, { ref: false }),
    ]);
    if (!killed && !hasExited()) {
      throw new Error("Next.js production server did not exit after SIGKILL.");
    }
  }
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (serverError) {
      throw new Error(`Could not start the Next.js production server.\n${serverOutput}`);
    }

    if (hasExited()) {
      throw new Error(
        `Next.js production server exited unexpectedly.\n${serverOutput}`,
      );
    }

    try {
      const response = await fetch(baseUrl, {
        signal: AbortSignal.timeout(1_000),
      });
      await response.body?.cancel();

      if (response.ok) {
        return;
      }
    } catch {
      // The server can reject connections briefly while loading its build output.
    }

    await delay(100);
  }

  throw new Error(`Timed out waiting for ${baseUrl}.\n${serverOutput}`);
}

before(async () => {
  // Mirror the runtime filesystem assembled by the production Docker image.
  await cp(join(projectRoot, "public"), join(standaloneRoot, "public"), {
    recursive: true,
  });
  await cp(join(buildRoot, "static"), join(standaloneRoot, ".next", "static"), {
    recursive: true,
  });

  const port = await reservePort();
  baseUrl = `http://127.0.0.1:${port}`;
  serverProcess = spawn(process.execPath, [standaloneServer], {
    cwd: projectRoot,
    env: {
      ...process.env,
      HOSTNAME: "127.0.0.1",
      NODE_ENV: "production",
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  // Preserve child output so startup failures remain actionable after cleanup.
  serverProcess.on("error", (error) => {
    serverError = error;
    serverOutput += `${error.stack ?? error}\n`;
  });
  serverProcess.stdout.on("data", (chunk) => {
    serverOutput += chunk;
  });
  serverProcess.stderr.on("data", (chunk) => {
    serverOutput += chunk;
  });

  try {
    await waitForServer();
  } catch (error) {
    await stopServer();
    throw error;
  }
});

after(async () => {
  await stopServer();
});

async function render(pathname) {
  return fetch(`${baseUrl}${pathname}`, {
    headers: { accept: "text/html" },
  });
}

test("server-renders a complete download page without client JavaScript", async () => {
  const response = await render("/open-science/download");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(
    response.headers.get("cache-control") ?? "",
    /s-maxage=3600(?:,|$)/i,
  );

  const html = await response.text();
  assert.match(
    html,
    /<title>Download Open-Science for macOS, Windows and Linux \| AIPOCH<\/title>/,
  );
  assert.match(html, /Download Open-Science/);
  assert.match(html, /for macOS, Windows and Linux/);
  assert.match(html, /Stable [\s\S]{0,30}v\d+\.\d+\.\d+/);
  assert.match(html, /Apple Silicon/);
  assert.match(html, /Windows x64/);
  assert.match(html, /AppImage/);
  assert.match(html, /Debian package/);
  assert.match(html, /[a-f0-9]{64}/);
  assert.doesNotMatch(html, /Loading downloads/i);

  const assetLinks = html.match(
    /https:\/\/github\.com\/aipoch\/open-science\/releases\/download\/[^"]+/g,
  );
  assert.ok(assetLinks && new Set(assetLinks).size >= 6);

  for (const eventName of [
    "download_mac_arm64",
    "download_mac_x64",
    "download_windows_x64",
    "download_linux_appimage",
    "download_linux_deb",
  ]) {
    assert.match(html, new RegExp(`data-analytics-event="${eventName}"`));
  }
});

test("publishes download metadata and the Open-Science guide sitemap entry", async () => {
  const pageResponse = await render("/open-science/download");
  const pageHtml = await pageResponse.text();
  assert.match(
    pageHtml,
    /<link rel="canonical" href="https:\/\/aipoch\.com\/open-science\/download"\/?>/,
  );
  assert.match(pageHtml, /"@type":"SoftwareApplication"/);
  assert.match(pageHtml, /"@type":"FAQPage"/);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(
    sitemapResponse.headers.get("content-type") ?? "",
    /application\/xml/i,
  );
  const sitemapXml = await sitemapResponse.text();
  assert.match(sitemapXml, /<loc>https:\/\/open-science\.app\/<\/loc>/);
});

test("publishes distinct metadata and structured data for the Open-Science guide", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(
    html,
    /<title>Open-Science: Tools and Workflows for Reproducible Research \| AIPOCH<\/title>/,
  );
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/open-science\.app"\/?>/,
  );
  assert.match(html, /Open-Science for[\s\S]{0,80}Reproducible Research/);
  assert.match(html, /"@type":"CollectionPage"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /Does Open-Science guarantee reproducible results\?/);
});

test("serves the V2 page and robots policy", async () => {
  const v2Response = await render("/v2");
  assert.equal(v2Response.status, 200);
  assert.match(v2Response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const v2Html = await v2Response.text();
  assert.match(
    v2Html,
    /<title>AIPOCH Open-Science . One Traceable Research Workspace<\/title>/,
  );
  assert.match(v2Html, /One traceable workspace/);

  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  assert.match(robotsResponse.headers.get("content-type") ?? "", /^text\/plain\b/i);
  const robotsText = await robotsResponse.text();
  assert.match(robotsText, /User-Agent: \*/i);
  assert.match(robotsText, /Allow: \//i);
  assert.match(
    robotsText,
    /Sitemap: https:\/\/open-science\.app\/sitemap\.xml/i,
  );
});

test("serves public, stylesheet, and client JavaScript assets", async () => {
  const pageResponse = await render("/v2");
  const html = await pageResponse.text();
  const stylesheetPath = html.match(
    /<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/i,
  )?.[1];
  const scriptPath = html.match(/<script[^>]+src="([^"]+)"/i)?.[1];

  assert.ok(stylesheetPath, "expected a stylesheet URL in the V2 HTML");
  assert.ok(scriptPath, "expected a client JavaScript URL in the V2 HTML");

  for (const assetPath of [
    "/assets/aipoch-mark.png",
    stylesheetPath,
    scriptPath,
  ]) {
    const response = await fetch(new URL(assetPath, baseUrl));
    assert.equal(response.status, 200, `${assetPath} should be available`);
  }
});
