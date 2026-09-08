import type { Metadata } from "next";
import DownloadCards from "./download-cards";
import {
  formatReleaseDate,
  getStableRelease,
  type DownloadKind,
} from "./release-data";
import "./download.css";

const DOWNLOAD_URL = "https://aipoch.com/open-science/download";
const REPOSITORY_URL = "https://github.com/aipoch/open-science";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Download Open-Science for macOS, Windows and Linux | AIPOCH",
  description:
    "Download the latest stable Open-Science desktop app for Apple Silicon, Intel Mac, Windows x64, or Linux. Check system requirements and SHA256 checksums.",
  alternates: { canonical: DOWNLOAD_URL },
  openGraph: {
    title: "Download Open-Science for macOS, Windows and Linux",
    description:
      "Get the latest stable AIPOCH Open-Science desktop app and verify your installer.",
    url: DOWNLOAD_URL,
    siteName: "AIPOCH Open-Science",
    type: "website",
    images: [
      {
        url: "https://aipoch.com/og-open-science-download.png",
        width: 1200,
        height: 630,
        alt: "Download AIPOCH Open-Science for macOS, Windows, and Linux",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Open-Science for macOS, Windows and Linux",
    description:
      "Get the latest stable AIPOCH Open-Science desktop app and verify your installer.",
    images: ["https://aipoch.com/og-open-science-download.png"],
  },
};

const assetOrder: DownloadKind[] = [
  "macArm64",
  "macX64",
  "windowsX64",
  "linuxAppImage",
  "linuxDeb",
];

const faqs = [
  {
    question: "Which Mac download should I choose?",
    answer:
      "Choose Apple Silicon for an M1, M2, M3, M4, or newer Mac. Choose Intel only for an older Mac with an Intel processor. In macOS, open Apple menu → About This Mac to check.",
  },
  {
    question: "Why does Windows SmartScreen show a warning?",
    answer:
      "The current Windows installer is not Authenticode-signed, so SmartScreen may show an “unrecognized app” or “unknown publisher” message. Confirm that the file came from this page, verify its SHA256 checksum, then select More info → Run anyway if you want to continue.",
  },
  {
    question: "Are the macOS downloads signed and notarized?",
    answer:
      "Official stable macOS releases are Developer ID signed and notarized by Apple. Locally built copies are not notarized and may require approval in Privacy & Security.",
  },
  {
    question: "Does Open-Science update automatically?",
    answer:
      "Yes. After installation, Open-Science checks the stable update channel and can update itself in place. This page remains the source for first installs, recovery, and manual verification.",
  },
  {
    question: "Does the installer include an AI model?",
    answer:
      "No. Open-Science is model-agnostic. During first-run setup, you choose and connect a supported agent runtime and model provider. App-managed runtimes can be installed without a separate Node.js setup.",
  },
  {
    question: "Where are the release notes and older versions?",
    answer:
      "Use the GitHub Releases link below for the complete changelog, previous versions, update metadata, and all published assets.",
  },
];

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function DownloadPage() {
  const release = await getStableRelease();
  const releaseDate = formatReleaseDate(release.publishedAt);
  const downloadUrls = assetOrder.map((kind) => release.assets[kind].url);
  const fileNames = assetOrder.map((kind) => release.assets[kind].name);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "AIPOCH Open-Science",
      applicationCategory: "ScienceApplication",
      operatingSystem: "macOS 12+, Windows 10/11 x64, Linux x64",
      softwareVersion: release.version,
      datePublished: release.publishedAt,
      downloadUrl: downloadUrls,
      fileFormat: fileNames,
      url: DOWNLOAD_URL,
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      codeRepository: REPOSITORY_URL,
      publisher: {
        "@type": "Organization",
        name: "AIPOCH",
        url: "https://aipoch.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <main className="download-site" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <header className="download-header">
        <a
          className="download-brand"
          href="https://aipoch.com/open-science"
          aria-label="AIPOCH Open-Science home"
        >
          <img src="/assets/aipoch-mark.png" alt="AIPOCH" />
        </a>
        <nav aria-label="Download page navigation">
          <a className="is-active" href="https://aipoch.com/open-science">
            Open-Science
          </a>
          <a href="https://aipoch.com/medflow">Product</a>
          <a href="https://aipoch.com/agent-skills">Agent Skills</a>
          <a href="https://aipoch.com/leaderboard">Benchmark</a>
          <a href="https://aipoch.com/blog">Blog</a>
        </nav>
        <div className="download-header-actions">
          <a href="https://aipoch.com/docs/">Docs</a>
          <a className="header-download-button" href="#downloads">
            Get Open-Science
          </a>
        </div>
      </header>

      <section className="download-hero">
        <div className="download-hero-grid" aria-hidden="true" />
        <div className="download-hero-copy">
          <p className="download-kicker">OPEN-SCIENCE / DOWNLOAD</p>
          <h1>
            <span>Download Open-Science</span>
            <span>for macOS, Windows and Linux</span>
          </h1>
          <p className="download-lede">
            Get the open-source, local-first AI research workbench. Choose your
            platform below, then verify the installer before your first launch.
          </p>
          <div className="release-status" aria-label="Latest stable release">
            <span className="status-dot" aria-hidden="true" />
            <strong>Stable {release.tag}</strong>
            <span>Released {releaseDate}</span>
          </div>
        </div>
        <div className="download-hero-mark" aria-label={`Stable version ${release.version}`}>
          <span>STABLE RELEASE</span>
          <strong>{release.tag}</strong>
          <i>{releaseDate}</i>
        </div>
      </section>

      <section className="downloads-section" id="downloads">
        <div className="section-heading">
          <p className="download-kicker">LATEST STABLE RELEASE</p>
          <div>
            <h2>Choose your installer.</h2>
            <p>
              All five downloads, file sizes, and SHA256 checksums are rendered
              on this page. Your operating system is highlighted when it can be
              detected safely.
            </p>
          </div>
        </div>
        <DownloadCards assets={release.assets} version={release.version} />
        <div className="release-links">
          <a href={release.checksumUrl}>Download SHA256SUMS.txt ↓</a>
          <a href={release.releaseUrl}>Read {release.name} release notes ↗</a>
        </div>
      </section>

      <section className="requirements-section" id="requirements">
        <div className="section-heading compact">
          <p className="download-kicker">SYSTEM REQUIREMENTS</p>
          <div>
            <h2>Know before you install.</h2>
            <p>
              Open-Science is a desktop application. Python and R are optional;
              the guided setup can prepare app-managed research environments.
            </p>
          </div>
        </div>
        <div className="requirements-table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Platform</th>
                <th scope="col">Minimum</th>
                <th scope="col">Package</th>
                <th scope="col">First launch</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">macOS</th>
                <td>macOS 12 Monterey</td>
                <td>ARM64 or Intel DMG</td>
                <td>Signed and notarized stable build</td>
              </tr>
              <tr>
                <th scope="row">Windows</th>
                <td>Windows 10 or 11, 64-bit</td>
                <td>x64 setup EXE</td>
                <td>SmartScreen warning expected</td>
              </tr>
              <tr>
                <th scope="row">Linux</th>
                <td>64-bit desktop Linux</td>
                <td>AppImage or Debian package</td>
                <td>AppImage may need execute permission</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="trust-section-download">
        <article>
          <span className="trust-number">01</span>
          <p className="download-kicker">MACOS SECURITY</p>
          <h2>Signed and notarized stable releases.</h2>
          <p>
            Official stable macOS builds use an Apple Developer ID signature
            and notarization. If Gatekeeper reports a problem, do not disable it
            globally—confirm the download source and checksum first. A copy you
            build locally is not notarized.
          </p>
        </article>
        <article>
          <span className="trust-number">02</span>
          <p className="download-kicker">WINDOWS SMARTSCREEN</p>
          <h2>Unknown publisher warning.</h2>
          <p>
            The current Windows installer does not yet have an Authenticode
            certificate. SmartScreen may show “unrecognized app.” Verify that
            the file came from this page and that its SHA256 matches, then use
            More info → Run anyway to continue.
          </p>
        </article>
      </section>

      <section className="verify-section" id="verify">
        <div className="section-heading inverse">
          <p className="download-kicker">VERIFY YOUR DOWNLOAD</p>
          <div>
            <h2>Check the bytes before you run them.</h2>
            <p>
              Compare the command output with the full SHA256 shown on the
              matching download card above. For stronger supply-chain
              verification, validate GitHub&apos;s signed build attestation.
            </p>
          </div>
        </div>
        <div className="command-grid">
          <article>
            <span>MACOS</span>
            <pre>
              <code>shasum -a 256 ./aipoch-open-science-*.dmg</code>
            </pre>
          </article>
          <article>
            <span>WINDOWS POWERSHELL</span>
            <pre>
              <code>
                Get-FileHash .\aipoch-open-science-*-setup.exe -Algorithm SHA256
              </code>
            </pre>
          </article>
          <article>
            <span>LINUX</span>
            <pre>
              <code>sha256sum ./aipoch-open-science-*</code>
            </pre>
          </article>
          <article>
            <span>SIGNED ATTESTATION</span>
            <pre>
              <code>
                gh attestation verify &lt;installer&gt; --repo aipoch/open-science
              </code>
            </pre>
          </article>
        </div>
        <p className="verification-note">
          A matching checksum confirms the downloaded bytes match the Release.
          The signed attestation also ties those bytes to the official
          repository&apos;s Release workflow and commit.
        </p>
      </section>

      <section className="source-section" id="source">
        <div className="source-copy">
          <p className="download-kicker">BUILD FROM SOURCE</p>
          <h2>Inspect it. Build it. Change it.</h2>
          <p>
            Open-Science is licensed under Apache 2.0. Source builds require
            Git, Node.js 22, and npm. Packaged output is written to the
            repository&apos;s <code>dist/</code> directory.
          </p>
          <a href={`${REPOSITORY_URL}#development--packaging`}>
            Read the development guide ↗
          </a>
        </div>
        <div className="source-terminal" aria-label="Build from source commands">
          <div>
            <span />
            <span />
            <span />
            <b>TERMINAL</b>
          </div>
          <pre>
            <code>{`git clone https://github.com/aipoch/open-science.git
cd open-science
npm install

# Choose one target
npm run build:mac
npm run build:win
npm run build:linux`}</code>
          </pre>
        </div>
      </section>

      <section className="updates-section">
        <div>
          <p className="download-kicker">AUTOMATIC UPDATES</p>
          <h2>Install once. Stay on the stable channel.</h2>
        </div>
        <p>
          Open-Science checks its official stable update feed and can update in
          place after installation. New stable GitHub assets also appear on this
          page automatically within one hour—drafts, prereleases, and incomplete
          uploads are ignored.
        </p>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-heading compact">
          <p className="download-kicker">FAQ</p>
          <div>
            <h2>Download and installation questions.</h2>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {faq.question}
                <i aria-hidden="true">+</i>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="github-fallback">
        <p className="download-kicker">NEED ANOTHER VERSION?</p>
        <h2>Every release remains available on GitHub.</h2>
        <p>
          Browse older installers, full release notes, update metadata,
          checksums, and release certification files.
        </p>
        <a href="https://github.com/aipoch/open-science/releases">
          View all GitHub Releases <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="download-footer">
        <div className="footer-intro">
          <a className="footer-logo" href="https://aipoch.com">
            <img src="/assets/aipoch-mark.png" alt="AIPOCH" />
          </a>
          <p>
            The open-source harness for scientific research — model-agnostic,
            auditable, and yours to run.
          </p>
        </div>
        <div className="footer-column">
          <strong>RESOURCE</strong>
          <a className="footer-accent" href={REPOSITORY_URL}>Github</a>
          <a href="https://design-system.aipoch.com/">Design System</a>
        </div>
        <div className="footer-column">
          <strong>EXPLORE</strong>
          <a href="https://aipoch.com/guides">Guides</a>
          <a href="https://aipoch.com/blog">Blog</a>
          <a href="https://aipoch.com/contact-us">Contact Us</a>
        </div>
        <div className="footer-column">
          <strong>CONNECT</strong>
          <a href="https://x.com/aipoch_ai">Twitter</a>
          <a href="https://www.linkedin.com/company/pochai/">LinkedIn</a>
          <a href="https://www.youtube.com/@AIPOCH_AI">YouTube</a>
        </div>
        <div className="footer-column">
          <strong>LEGAL</strong>
          <a href="https://aipoch.com/terms-of-service">Terms of Service</a>
          <a href="https://aipoch.com/privacy-policy">Privacy Policy</a>
          <a href="https://aipoch.com/cookie-policy">Cookie Policy</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AIPOCH · ALL RIGHTS RESERVED.</span>
          <span>OPEN-SOURCE HARNESS FOR SCIENTIFIC RESEARCH</span>
        </div>
      </footer>
    </main>
  );
}
