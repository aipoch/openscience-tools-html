import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://open-science.app"),
  title: "Open-Science: Tools and Workflows for Reproducible Research | AIPOCH",
  description:
    "Learn how Open-Science connects methods, data, code and results—and explore practical tools and workflows for research that others can inspect, reproduce and build on.",
  alternates: {
    canonical: "https://open-science.app/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assets/aipoch-mark.png",
    shortcut: "/assets/aipoch-mark.png",
  },
  openGraph: {
    title: "Open-Science: Tools and Workflows for Reproducible Research | AIPOCH",
    description:
      "Learn how Open-Science connects methods, data, code and results—and explore practical tools and workflows for research that others can inspect, reproduce and build on.",
    url: "https://open-science.app/",
    siteName: "Open-Science by AIPOCH",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 1024, alt: "AIPOCH Open-Science — Build Science in the Open" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open-Science: Tools and Workflows for Reproducible Research | AIPOCH",
    description: "Practical tools and connected workflows for transparent, inspectable and reproducible research.",
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://open-science.app/#website",
      url: "https://open-science.app/",
      name: "Open-Science by AIPOCH",
      publisher: {
        "@type": "Organization",
        name: "AIPOCH",
        url: "https://aipoch.com/",
      },
    },
    {
      "@type": "CollectionPage",
      "@id": "https://open-science.app/#guide",
      url: "https://open-science.app/",
      name: "Open-Science Tools and Workflows for Reproducible Research",
      description:
        "A practical guide to connected Open-Science principles, tools and workflows by AIPOCH.",
      isPartOf: { "@id": "https://open-science.app/#website" },
      about: [
        { "@type": "Thing", name: "Open-Science" },
        { "@type": "Thing", name: "Reproducible research" },
        { "@type": "Thing", name: "Research workflows" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://open-science.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Does Open-Science guarantee reproducible results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No software can guarantee that a research result will be reproduced. Open-Science helps researchers preserve evidence, methods, execution records and artifacts so the work can be inspected, reviewed and rerun.",
          },
        },
        {
          "@type": "Question",
          name: "Is Open-Science intended for clinical use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Open-Science is designed for research workflows and is not intended for clinical diagnosis, treatment or other medical decisions.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          id="aipoch-google-analytics"
          dangerouslySetInnerHTML={{
            __html: `if (location.hostname === 'open-science.app' || location.hostname === 'www.open-science.app' || location.hostname === 'aipoch.com' || location.hostname === 'www.aipoch.com') {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){window.dataLayer.push(arguments);};
  window.gtag('js', new Date());
  window.gtag('config', 'G-HFPR0TYS9X');
  var ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-HFPR0TYS9X';
  document.head.appendChild(ga);
}`,
          }}
        />
      </body>
    </html>
  );
}
