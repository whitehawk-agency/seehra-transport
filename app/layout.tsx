import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "Seehra Transport | Multi-Drop & Last-Mile Logistics UK",
    template: "%s | Seehra Transport",
  },
  description: "Professional courier and logistics services across the UK. Multi-drop, last-mile, same-day, and next-day delivery. Based in Oldbury, West Midlands. From £4.99.",
  keywords: ["courier","delivery","logistics","multi-drop","last mile","UK","West Midlands","same day","next day","Seehra Transport"],
  openGraph: { siteName: "Seehra Transport", locale: "en_GB", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
