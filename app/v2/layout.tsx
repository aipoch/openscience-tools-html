import type { Metadata } from "next";
import "./v2.css";

export const metadata: Metadata = {
  title: "AIPOCH Open-Science — One Traceable Research Workspace",
  description:
    "Open-source, local-first scientific AI workspace with model choice, executable research capabilities, and traceable artifacts.",
  openGraph: {
    title: "AIPOCH Open-Science — One Traceable Research Workspace",
    description:
      "Plan, execute, inspect and reproduce scientific work in one open workspace.",
    url: "https://open-science.app/v2",
    images: [
      {
        url: "/og-v2.png",
        width: 1672,
        height: 941,
        alt: "AIPOCH Open-Science — Your research, one traceable workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIPOCH Open-Science — One Traceable Research Workspace",
    description:
      "Plan, execute, inspect and reproduce scientific work in one open workspace.",
    images: ["/og-v2.png"],
  },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
