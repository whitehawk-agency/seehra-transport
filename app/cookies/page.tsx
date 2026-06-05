import type { Metadata } from "next";
export const metadata: Metadata = { title: "Cookie Policy" };
export default function CookiesPage() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Cookie Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: January 2026</p>
        <p className="text-gray-600 leading-relaxed mb-6">We use cookies to improve your experience on our website. Cookies are small text files stored on your device.</p>
        {[["Essential Cookies","Required for the website to function. Cannot be disabled."],["Analytics Cookies","Help us understand how visitors use our site so we can improve it."],["Marketing Cookies","Used to show relevant advertisements. Can be disabled in your browser settings."]].map(([t,d])=>(
          <div key={t as string} className="mb-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
            <h2 className="font-bold mb-2">{t as string}</h2>
            <p className="text-gray-600 text-sm">{d as string}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
