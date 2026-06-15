import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Seehra Transport for quotes, enquiries, and logistics support across the UK. Call, email, or send us a message.",
};
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
