import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cookie Policy | Seehra Transport",
  description: "How Seehra Transport uses cookies and similar technologies, and how you can manage your preferences.",
};

const sections: [string, string[]][] = [
  ["What Are Cookies", [
    "Cookies are small text files placed on your device when you visit a website. They help websites function properly, remember your preferences, and provide information to site owners about how the site is used.",
  ]],
  ["Types of Cookies We Use", [
    "Essential cookies: These are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as submitting a form.",
    "Analytics cookies: These help us understand how visitors interact with our website by collecting anonymous information. They are only set with your consent.",
    "Marketing cookies: These may be used to deliver relevant advertising and measure the effectiveness of campaigns. They are only set with your consent.",
  ]],
  ["Your Consent and Choices", [
    "When you first visit our website, you will be asked whether you accept non-essential (analytics and marketing) cookies. Essential cookies do not require consent as they are strictly necessary for the site to work.",
    "You can change or withdraw your consent at any time by clearing the cookies stored in your browser, after which you will be asked again on your next visit. You can also manage cookies directly through your browser settings.",
  ]],
  ["Managing Cookies in Your Browser", [
    "Most browsers allow you to refuse or delete cookies. The method varies between browsers — please refer to your browser's help section. Please note that disabling essential cookies may affect the functionality of our website.",
  ]],
  ["Contact Us", [
    "If you have any questions about our use of cookies, email info@seehratransport.com.",
  ]],
];

export default function CookiesPage() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Cookie Policy</h1>
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
