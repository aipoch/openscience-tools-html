import type { StableRelease } from "./release-data";

// Last known-good stable release. Keep this committed so a GitHub outage or an
// incomplete upload can never leave the server-rendered download area empty.
export const fallbackRelease: StableRelease = {
  tag: "v0.25.1",
  version: "0.25.1",
  name: "Open-Science v0.25.1",
  publishedAt: "2026-09-03T04:52:15Z",
  releaseUrl: "https://github.com/aipoch/open-science/releases/tag/v0.25.1",
  checksumUrl:
    "https://github.com/aipoch/open-science/releases/download/v0.25.1/SHA256SUMS.txt",
  assets: {
    macArm64: {
      kind: "macArm64",
      name: "aipoch-open-science-0.25.1-mac-arm64.dmg",
      size: 239070002,
      url: "https://github.com/aipoch/open-science/releases/download/v0.25.1/aipoch-open-science-0.25.1-mac-arm64.dmg",
      sha256: "83e14ab6fb79c40436cc1972412e69e8b7cd6df95924d072fb9f84c0f53ff905",
    },
    macX64: {
      kind: "macX64",
      name: "aipoch-open-science-0.25.1-mac-x64.dmg",
      size: 250664773,
      url: "https://github.com/aipoch/open-science/releases/download/v0.25.1/aipoch-open-science-0.25.1-mac-x64.dmg",
      sha256: "ba276ed872e1aa419dddfdffcba8de09ee4a77953288c59997397d5823ad9e30",
    },
    windowsX64: {
      kind: "windowsX64",
      name: "aipoch-open-science-0.25.1-win-x64-setup.exe",
      size: 244737673,
      url: "https://github.com/aipoch/open-science/releases/download/v0.25.1/aipoch-open-science-0.25.1-win-x64-setup.exe",
      sha256: "75fc060dba28a65ab16aeca3b716601265ff63c1b748172e5dcde5f4b2f3ac5b",
    },
    linuxAppImage: {
      kind: "linuxAppImage",
      name: "aipoch-open-science-0.25.1-linux-x86_64.AppImage",
      size: 259405054,
      url: "https://github.com/aipoch/open-science/releases/download/v0.25.1/aipoch-open-science-0.25.1-linux-x86_64.AppImage",
      sha256: "d73742cef36638a59c2a4ecfaebaa4bc7b6541b9bc0e30dd9dd467ac321abe2f",
    },
    linuxDeb: {
      kind: "linuxDeb",
      name: "aipoch-open-science_0.25.1_amd64.deb",
      size: 189841076,
      url: "https://github.com/aipoch/open-science/releases/download/v0.25.1/aipoch-open-science_0.25.1_amd64.deb",
      sha256: "1c6f872ca30e4e3cca6aca82e6399366adf67e4c50b9505cf69b428ae79cf7d5",
    },
  },
};
