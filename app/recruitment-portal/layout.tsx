import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Careers & Job Vacancies",
  description: "Join the Seehra Transport team. Browse current driver and logistics vacancies across the East and West Midlands and apply online.",
};
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
