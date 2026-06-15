import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Track Your Shipment",
  description: "Track your Seehra Transport delivery in real time. Enter your tracking reference and postcode for a live status update.",
};
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
