import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Client Portal" };
export default function PortalPage() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-24">
      <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm w-full max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center text-2xl" style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>🔐</div>
        <h1 className="text-3xl font-extrabold mb-2">Client Portal</h1>
        <p className="text-gray-500 text-sm mb-8">Business account access for managing bookings, tracking shipments, and viewing invoices.</p>
        <div className="flex flex-col gap-3 mb-6">
          <input placeholder="Email Address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f7680b] transition-colors" />
          <input type="password" placeholder="Password" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f7680b] transition-colors" />
          <button className="w-full py-3.5 rounded-xl font-bold text-white text-sm uppercase tracking-wide" style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>Sign In</button>
        </div>
        <p className="text-gray-400 text-xs">Don't have an account? <Link href="/contact" className="text-[#f7680b] underline">Contact us</Link> to set up business access.</p>
      </div>
    </section>
  );
}
