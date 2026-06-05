import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: January 2026</p>
        {[["Information We Collect","We collect personal information you provide when requesting a quote, contacting us, or applying for a driver position. This includes name, email, phone number, address, and delivery details."],["How We Use Your Information","We use your information to provide delivery services, process quotes, communicate with you about your orders, and process driver applications."],["Data Sharing","We do not sell your personal data. We may share information with delivery partners and payment processors as required to fulfil your order."],["Your Rights","You have the right to access, correct, or delete your personal data. Contact info@seehratransport.com to exercise these rights."],["Contact Us","For any privacy-related queries, email info@seehratransport.com or write to: Unit 5 & 6 Park Lane Industrial Estate, Park Lane, Oldbury, West Midlands, B69 4JX."]].map(([t,d])=>(
          <div key={t as string} className="mb-8">
            <h2 className="text-xl font-bold mb-3">{t as string}</h2>
            <p className="text-gray-600 leading-relaxed">{d as string}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
