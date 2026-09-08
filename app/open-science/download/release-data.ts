import { fallbackRelease } from "./release-fallback";

const RELEASES_API =
  "https://api.github.com/repos/aipoch/open-science/releases?per_page=10";
const REFRESH_SECONDS = 60 * 60;

export type DownloadKind =
  | "macArm64"
  | "macX64"
  | "windowsX64"
  | "linuxAppImage"
  | "linuxDeb";

export type DownloadEvent =
  | "download_mac_arm64"
  | "download_mac_x64"
  | "download_windows_x64"
  | "download_linux_appimage"
  | "download_linux_deb";

export interface DownloadAsset {
  kind: DownloadKind;
  name: string;
  size: number;
  url: string;
  sha256: string;
}

export interface StableRelease {
  tag: string;
  version: string;
  name: string;
  publishedAt: string;
  releaseUrl: string;
  checksumUrl: string;
  assets: Record<DownloadKind, DownloadAsset>;
}

interface GitHubAsset {
  name?: unknown;
  size?: unknown;
  browser_download_url?: unknown;
  digest?: unknown;
}

interface GitHubRelease {
  tag_name?: unknown;
  name?: unknown;
  published_at?: unknown;
  html_url?: unknown;
  draft?: unknown;
  prerelease?: unknown;
  assets?: unknown;
}

const assetMatchers: Record<DownloadKind, RegExp> = {
  macArm64: /-mac-arm64\.dmg$/i,
  macX64: /-mac-x64\.dmg$/i,
  windowsX64: /-win-x64-setup\.exe$/i,
  linuxAppImage: /-linux-x86_64\.AppImage$/i,
  linuxDeb: /_amd64\.deb$/i,
};

let lastKnownStable = fallbackRelease;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function shaFromDigest(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const match = /^sha256:([a-f0-9]{64})$/i.exec(value);
  return match?.[1]?.toLowerCase() ?? null;
}

function findAsset(
  assets: GitHubAsset[],
  kind: DownloadKind,
): DownloadAsset | null {
  const match = assets.find(
    (asset) =>
      isNonEmptyString(asset.name) && assetMatchers[kind].test(asset.name),
  );

  if (
    !match ||
    !isNonEmptyString(match.name) ||
    typeof match.size !== "number" ||
    !Number.isFinite(match.size) ||
    match.size <= 0 ||
    !isNonEmptyString(match.browser_download_url)
  ) {
    return null;
  }

  const sha256 = shaFromDigest(match.digest);
  if (!sha256) return null;

  return {
    kind,
    name: match.name,
    size: match.size,
    url: match.browser_download_url,
    sha256,
  };
}

function normalizeRelease(value: unknown): StableRelease | null {
  if (!value || typeof value !== "object") return null;
  const release = value as GitHubRelease;

  if (
    release.draft !== false ||
    release.prerelease !== false ||
    !isNonEmptyString(release.tag_name) ||
    !isNonEmptyString(release.published_at) ||
    !isNonEmptyString(release.html_url) ||
    !Array.isArray(release.assets)
  ) {
    return null;
  }

  const assets = release.assets as GitHubAsset[];
  const macArm64 = findAsset(assets, "macArm64");
  const macX64 = findAsset(assets, "macX64");
  const windowsX64 = findAsset(assets, "windowsX64");
  const linuxAppImage = findAsset(assets, "linuxAppImage");
  const linuxDeb = findAsset(assets, "linuxDeb");
  const checksumAsset = assets.find(
    (asset) => asset.name === "SHA256SUMS.txt",
  );

  if (
    !macArm64 ||
    !macX64 ||
    !windowsX64 ||
    !linuxAppImage ||
    !linuxDeb ||
    !checksumAsset ||
    !isNonEmptyString(checksumAsset.browser_download_url)
  ) {
    return null;
  }

  return {
    tag: release.tag_name,
    version: release.tag_name.replace(/^v/i, ""),
    name: isNonEmptyString(release.name)
      ? release.name
      : `Open-Science ${release.tag_name}`,
    publishedAt: release.published_at,
    releaseUrl: release.html_url,
    checksumUrl: checksumAsset.browser_download_url,
    assets: {
      macArm64,
      macX64,
      windowsX64,
      linuxAppImage,
      linuxDeb,
    },
  };
}

export async function getStableRelease(): Promise<StableRelease> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "aipoch-download-page",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(RELEASES_API, {
      headers,
      next: { revalidate: REFRESH_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`GitHub Releases API returned ${response.status}`);
    }

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) {
      throw new Error("GitHub Releases API returned an unexpected payload");
    }

    const stable = payload
      .map(normalizeRelease)
      .find((release): release is StableRelease => release !== null);

    if (!stable) {
      throw new Error("No complete stable release was found");
    }

    lastKnownStable = stable;
    return stable;
  } catch {
    return lastKnownStable;
  }
}

export function formatFileSize(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function formatReleaseDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}
