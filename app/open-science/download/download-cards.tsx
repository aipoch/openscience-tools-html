"use client";

import { useSyncExternalStore } from "react";
import type {
  DownloadAsset,
  DownloadEvent,
  DownloadKind,
} from "./release-data";

type DetectedOS = "mac" | "windows" | "linux" | null;

interface DownloadCardDefinition {
  kind: DownloadKind;
  family: Exclude<DetectedOS, null>;
  event: DownloadEvent;
  eyebrow: string;
  title: string;
  architecture: string;
  extension: string;
  requirement: string;
}

const cards: DownloadCardDefinition[] = [
  {
    kind: "macArm64",
    family: "mac",
    event: "download_mac_arm64",
    eyebrow: "MACOS",
    title: "Apple Silicon",
    architecture: "M1 or newer · ARM64",
    extension: "DMG",
    requirement: "macOS 12 Monterey or later",
  },
  {
    kind: "macX64",
    family: "mac",
    event: "download_mac_x64",
    eyebrow: "MACOS",
    title: "Intel",
    architecture: "Intel processor · x64",
    extension: "DMG",
    requirement: "macOS 12 Monterey or later",
  },
  {
    kind: "windowsX64",
    family: "windows",
    event: "download_windows_x64",
    eyebrow: "WINDOWS",
    title: "Windows x64",
    architecture: "64-bit installer",
    extension: "EXE",
    requirement: "Windows 10 or 11 · x64",
  },
  {
    kind: "linuxAppImage",
    family: "linux",
    event: "download_linux_appimage",
    eyebrow: "LINUX",
    title: "AppImage",
    architecture: "Portable · x86_64",
    extension: "APPIMAGE",
    requirement: "64-bit Linux desktop",
  },
  {
    kind: "linuxDeb",
    family: "linux",
    event: "download_linux_deb",
    eyebrow: "LINUX",
    title: "Debian package",
    architecture: "Debian / Ubuntu · amd64",
    extension: "DEB",
    requirement: "64-bit Debian-based Linux",
  },
];

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function detectOperatingSystem(): DetectedOS {
  const value = `${navigator.userAgent} ${navigator.platform}`.toLowerCase();
  if (value.includes("mac")) return "mac";
  if (value.includes("win")) return "windows";
  if (value.includes("linux") || value.includes("x11")) return "linux";
  return null;
}

function trackDownload(
  event: DownloadEvent,
  asset: DownloadAsset,
  version: string,
) {
  const properties = {
    download_version: version,
    download_file: asset.name,
    download_platform: asset.kind,
    transport_type: "beacon",
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...properties });
  window.gtag?.("event", event, properties);
}

export default function DownloadCards({
  assets,
  version,
}: {
  assets: Record<DownloadKind, DownloadAsset>;
  version: string;
}) {
  const detectedOS = useSyncExternalStore(
    () => () => undefined,
    detectOperatingSystem,
    () => null,
  );

  return (
    <div className="download-grid" aria-label="Open-Science installers">
      {cards.map((card) => {
        const asset = assets[card.kind];
        const recommended = detectedOS === card.family;

        return (
          <article
            className={`download-card${recommended ? " is-recommended" : ""}`}
            key={card.kind}
          >
            <div className="download-card-top">
              <span className="download-platform">{card.eyebrow}</span>
              <span className="download-format">{card.extension}</span>
            </div>
            {recommended && (
              <span className="recommended-label">For your system</span>
            )}
            <h3>{card.title}</h3>
            <p className="download-architecture">{card.architecture}</p>
            <dl className="download-facts">
              <div>
                <dt>Requires</dt>
                <dd>{card.requirement}</dd>
              </div>
              <div>
                <dt>File</dt>
                <dd>{(asset.size / 1024 / 1024).toFixed(1)} MB</dd>
              </div>
            </dl>
            <a
              className="download-button"
              href={asset.url}
              data-analytics-event={card.event}
              onClick={() => trackDownload(card.event, asset, version)}
            >
              Download <span aria-hidden="true">↓</span>
            </a>
            <details className="checksum-detail">
              <summary>SHA256 checksum</summary>
              <code>{asset.sha256}</code>
            </details>
          </article>
        );
      })}
    </div>
  );
}
