import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy | Seehra Transport",
  description: "How Seehra Transport collects, uses, stores, and protects your personal data in accordance with UK GDPR.",
};

const sections: [string, string[]][] = [
  ["Who We Are", [
    "Seehra Transport Limited (\"we\", \"us\", \"our\") is a logistics and delivery company registered in England & Wales (Company No. 09462678), with its registered office at Unit 5 & 6 Park Lane Industrial Estate, Park Lane, Oldbury, West Midlands, B69 4JX.",
    "We are the data controller responsible for your personal data. For any data protection queries, contact us at info@seehratransport.com.",
  ]],
  ["Information We Collect", [
    "We collect personal information that you provide directly to us, including: your name, email address, telephone number, postal address, collection and delivery postcodes, and any details you include in enquiries or quote requests.",
    "If you apply for a driver or staff position, we also collect information relevant to your application, such as your driving licence category, work experience, availability, and any CV or supporting documents you submit.",
    "We may also automatically collect limited technical data when you visit our website, such as your IP address, browser type, and pages visited, through cookies and similar technologies (see our Cookie Policy).",
  ]],
  ["Legal Basis for Processing", [
    "Under UK GDPR, we rely on the following legal bases to process your personal data: (1) Performance of a contract — to provide the delivery services you request; (2) Legitimate interests — to operate, improve, and secure our business and respond to enquiries; (3) Consent — for non-essential cookies and marketing communications, which you may withdraw at any time; and (4) Legal obligation — where we are required to retain or disclose data by law.",
  ]],
  ["How We Use Your Information", [
    "We use your personal data to: provide and manage delivery and logistics services; prepare and send quotes; communicate with you about your orders and enquiries; process and assess job applications; improve our services and website; and comply with our legal and regulatory obligations.",
  ]],
  ["Data Sharing", [
    "We do not sell your personal data. We may share your information with trusted third parties only where necessary, including: delivery and courier partners involved in fulfilling your order; IT, hosting, and email service providers who support our operations; and professional advisers or authorities where required by law.",
    "All third parties are required to keep your data secure and to process it only in accordance with our instructions.",
  ]],
  ["International Transfers", [
    "Your personal data is primarily stored and processed within the UK. Where any data is transferred outside the UK (for example, by our technology providers), we ensure appropriate safeguards are in place, such as UK adequacy regulations or standard contractual clauses, to protect your information.",
  ]],
  ["Data Retention", [
    "We keep your personal data only for as long as necessary for the purposes set out in this policy. Quote and enquiry data is typically retained for up to 24 months. Customer order records are retained for up to 6 years to meet legal and accounting obligations. Unsuccessful job application data is retained for up to 12 months unless you ask us to delete it sooner.",
  ]],
  ["Your Rights", [
    "Under UK GDPR, you have the right to: access the personal data we hold about you; request correction of inaccurate data; request erasure of your data; restrict or object to processing; request data portability; and withdraw consent at any time where processing is based on consent.",
    "To exercise any of these rights, email info@seehratransport.com. We will respond within one month.",
  ]],
  ["How to Complain", [
    "If you have concerns about how we handle your personal data, please contact us first so we can try to resolve the matter. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK supervisory authority, at ico.org.uk or by calling 0303 123 1113.",
  ]],
  ["Data Security", [
    "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. While no system can be guaranteed completely secure, we take reasonable steps to safeguard the information you provide.",
  ]],
  ["Contact Us", [
    "For any privacy-related queries, email info@seehratransport.com or write to: Seehra Transport Limited, Unit 5 & 6 Park Lane Industrial Estate, Park Lane, Oldbury, West Midlands, B69 4JX.",
  ]],
];

export default function PrivacyPage() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Privacy Policy</h1>
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
