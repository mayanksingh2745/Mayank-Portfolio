import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Mayank Singh — AI Engineer & Data Scientist",
  description:
    "Portfolio of Mayank Singh: AI Engineer & Data Scientist specializing in predictive modeling, production ML pipelines, SQL analytics, and intelligent systems.",
  metadataBase: new URL("https://mayanksingh.dev"),
  keywords: [
    "Mayank Singh",
    "AI Engineer",
    "Data Scientist",
    "Applied Machine Learning",
    "Forward Deployed Engineer",
    "ML Pipelines",
    "Predictive Modeling",
    "PostgreSQL",
    "Deep Learning",
  ],
  authors: [{ name: "Mayank Singh", url: "https://github.com/mayanksingh2745" }],
  creator: "Mayank Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mayanksingh.dev",
    title: "Mayank Singh — AI Engineer & Data Scientist",
    description:
      "Turning complex data into production decisions: ML pipelines, predictive models, and high-impact analytics.",
    siteName: "Mayank Singh Portfolio",
    images: [
      {
        url: "/avatar/pose-portrait.webp",
        width: 1050,
        height: 1400,
        alt: "Mayank Singh — AI Engineer & Data Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank Singh — AI Engineer & Data Scientist",
    description:
      "Production ML pipelines, predictive models, and high-impact data systems.",
    images: ["/avatar/pose-portrait.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mayank Singh",
    jobTitle: "AI Engineer / Data Scientist",
    url: "https://mayanksingh.dev",
    sameAs: [
      "https://github.com/mayanksingh2745",
      "https://www.linkedin.com/in/mayanksingh2745",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noida",
      addressCountry: "India",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Ajay Kumar Garg Engineering College",
    },
    knowsAbout: [
      "Machine Learning",
      "Predictive Modeling",
      "SQL Optimization",
      "Data Analytics",
      "Deep Learning",
      "Python",
      "IoT Predictive Maintenance",
    ],
  };

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmMono.variable} dark antialiased`}
    >
      <head>
        <link rel="preload" href="/avatar/pose-portrait.webp" as="image" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0A0A0C] text-[#F2EFE8] font-sans selection:bg-[#D9B36A] selection:text-[#0A0A0C] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
