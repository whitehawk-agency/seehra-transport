import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Service | Seehra Transport",
  description: "The terms and conditions governing use of Seehra Transport's logistics and delivery services.",
};

const sections: [string, string[]][] = [
  ["1. Introduction", [
    "These Terms of Service (\"Terms\") govern the supply of delivery and logistics services by Seehra Transport Limited (\"we\", \"us\", \"our\") to you. By requesting or using our services, you agree to be bound by these Terms.",
  ]],
  ["2. Our Services", [
    "We provide multi-drop delivery, last-mile logistics, same-day, next-day, and standard delivery services, together with related flexible solutions. Service availability, timescales, and pricing are confirmed at the point of booking and may vary depending on location, volume, and other factors.",
  ]],
  ["3. Quotes and Pricing", [
    "Quotes are provided based on the information you supply and are valid for 30 days unless stated otherwise. Final pricing may change if the actual collection, delivery, weight, or dimensions differ from those quoted. All prices exclude VAT unless stated otherwise.",
  ]],
  ["4. Your Responsibilities", [
    "You are responsible for ensuring that items are properly packaged, accurately described, and legal to transport. You must provide correct collection and delivery details. We are not liable for delays or failures caused by incorrect information, inadequate packaging, or prohibited items.",
  ]],
  ["5. Prohibited Items", [
    "We do not carry illegal goods, hazardous or dangerous materials, perishable items (unless agreed in advance), cash, or items of exceptional value unless expressly agreed in writing. We reserve the right to refuse any item at our discretion.",
  ]],
  ["6. Liability for Loss or Damage", [
    "We take great care with every consignment. Our standard liability for loss of or damage to goods is limited to £100 per consignment, in line with common industry practice. For items of higher value, enhanced cover can be arranged in advance by declaring the value in writing at the time of booking, which may be subject to an additional charge.",
    "We are not liable for indirect or consequential losses, or for delays caused by events outside our reasonable control (including traffic, weather, accidents, or other force majeure events).",
  ]],
  ["7. Claims", [
    "Any claim for loss or damage must be notified to us in writing within 7 days of the delivery date (or expected delivery date). We may require evidence to support a claim, including photographs and proof of value.",
  ]],
  ["8. Cancellations", [
    "You may cancel a booking before collection. Cancellations made at short notice or after a driver has been dispatched may be subject to a charge to cover costs incurred. Please contact us as early as possible to cancel or amend a booking.",
  ]],
  ["9. Payment", [
    "Payment terms are agreed at the point of booking. For account customers, invoices are payable within the agreed period. We reserve the right to suspend services where payments are overdue.",
  ]],
  ["10. Dispute Resolution", [
    "If a dispute arises, both parties agree to first attempt to resolve it amicably through good-faith discussion. These Terms are governed by the laws of England & Wales, and any disputes that cannot be resolved will be subject to the exclusive jurisdiction of the courts of England & Wales.",
  ]],
  ["11. Changes to These Terms", [
    "We may update these Terms from time to time. The version in force at the time of your booking applies to that booking. The latest version is always available on our website.",
  ]],
  ["12. Contact", [
    "For any questions about these Terms, contact us at info@seehratransport.com or write to: Seehra Transport Limited, 11 Union Road, Oldbury, England, B69 3EX.",
  ]],
];

export default function TermsPage() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: June 2026</p>
        {sections.map(([title, paras]) => (
          <div key={title} className="mb-8">
            <h2 className="text-xl font-bold mb-3">{title}</h2>
            {paras.map((p, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-3">{p}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
