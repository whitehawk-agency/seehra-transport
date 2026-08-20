import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.seehratransport.com"),
  title: {
    default: "Seehra Transport | Multi-Drop & Last-Mile Logistics UK",
    template: "%s | Seehra Transport",
  },
  description: "Professional courier and logistics services across the UK. Multi-drop, last-mile, same-day, and next-day delivery. Based in Oldbury, West Midlands.",
  keywords: ["courier","delivery","logistics","multi-drop delivery","last-mile logistics","UK courier","West Midlands courier","Oldbury logistics","same day delivery","next day delivery","parcel delivery","Seehra Transport"],
  authors: [{ name: "Seehra Transport Limited" }],
  creator: "Seehra Transport Limited",
  publisher: "Seehra Transport Limited",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    siteName: "Seehra Transport",
    title: "Seehra Transport | Multi-Drop & Last-Mile Logistics UK",
    description: "Professional courier and logistics services across the UK. Multi-drop, last-mile, same-day, and next-day delivery. Based in Oldbury, West Midlands.",
    url: "https://www.seehratransport.com",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/delivery-handoff.jpg", width: 1600, height: 1066, alt: "Seehra Transport delivery driver handing a parcel to a customer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seehra Transport | Multi-Drop & Last-Mile Logistics UK",
    description: "Professional courier and logistics services across the UK. Based in Oldbury, West Midlands.",
    images: ["/delivery-handoff.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Seehra Transport Limited",
    description: "Professional multi-drop and last-mile courier and logistics services across the UK.",
    url: "https://www.seehratransport.com",
    telephone: "+447990702743",
    email: "info@seehratransport.com",
    logo: "https://www.seehratransport.com/icon-512.png",
    image: "https://www.seehratransport.com/delivery-handoff.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11 Union Road",
      addressLocality: "Oldbury",
      addressRegion: "West Midlands",
      postalCode: "B69 3EX",
      addressCountry: "GB",
    },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      opens: "09:00",
      closes: "17:00",
    }],
    sameAs: [
      "https://www.linkedin.com/company/seehratransport/",
      "https://uk.indeed.com/cmp/Seehra-Transport-Limited",
    ],
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
