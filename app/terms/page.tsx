import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service" };
export default function TermsPage() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: January 2026</p>
        {[["Acceptance of Terms","By using Seehra Transport services, you agree to these terms. If you do not agree, please do not use our services."],["Service Description","Seehra Transport provides courier and logistics services across the UK. All services are subject to availability and our delivery terms."],["Liability","Our liability for lost or damaged goods is limited to £100 unless additional insurance is purchased. We are not liable for consequential losses."],["Payment","Payment is due as agreed at time of booking. We reserve the right to pursue unpaid invoices through legal means."],["Governing Law","These terms are governed by the laws of England and Wales."]].map(([t,d])=>(
          <div key={t as string} className="mb-8">
            <h2 className="text-xl font-bold mb-3">{t as string}</h2>
            <p className="text-gray-600 leading-relaxed">{d as string}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
