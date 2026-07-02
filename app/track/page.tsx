"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
function TrackForm() {
  const params = useSearchParams();
  const [ref, setRef] = useState(params.get("ref") || "");
  const [postcode, setPostcode] = useState(params.get("postcode") || "");
  const [result, setResult] = useState<null|"found"|"notfound">(null);
  const inp = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f7680b] transition-colors";
  function track(e: React.FormEvent) {
    e.preventDefault();
    setResult(ref.trim().length > 3 ? "found" : "notfound");
  }
  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={track} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-2xl font-extrabold mb-6">Track your shipment</h2>
        <div className="flex flex-col gap-4">
          <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Tracking Reference *</label><input required placeholder="e.g. ST-2024-00123" className={inp} value={ref} onChange={e=>setRef(e.target.value)} /></div>
          <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Delivery Postcode *</label><input required placeholder="e.g. B69 4JX" className={inp} value={postcode} onChange={e=>setPostcode(e.target.value)} /></div>
          <button type="submit" className="w-full py-4 rounded-xl font-bold text-white text-sm uppercase tracking-wide transition-all hover:opacity-90" style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>Track Shipment →</button>
        </div>
      </form>
      {result === "found" && (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#f7680b" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <h3 className="font-extrabold text-lg mb-2">We\'ll get your update to you</h3>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">
            Thanks — to give you the most accurate, up-to-date status for reference <strong className="text-gray-700">{ref}</strong>, our team will confirm your shipment\'s progress directly. Please contact us and quote your reference and postcode.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`mailto:info@seehratransport.com?subject=Tracking%20enquiry%20-%20${encodeURIComponent(ref)}`} className="text-white text-sm font-bold px-6 py-3 rounded-xl transition-all hover:opacity-90" style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>Email Us</a>
            <a href="tel:07990702743" className="border border-gray-200 text-gray-700 text-sm font-bold px-6 py-3 rounded-xl hover:border-[#f7680b] hover:text-[#f7680b] transition-colors">Call 07990 702743</a>
          </div>
        </div>
      )}
      {result === "notfound" && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2"></div>
          <h3 className="font-bold text-red-700 mb-1">Reference Not Found</h3>
          <p className="text-red-600 text-sm">Please check your reference number and postcode. Contact <a href="mailto:info@seehratransport.com" className="underline">info@seehratransport.com</a> for help.</p>
        </div>
      )}
    </div>
  );
}
export default function TrackPage() {
  return (
    <>
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover" style={{ backgroundImage: "url('/track-scan.jpg')", backgroundPosition: "center 22%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.82) 0%, rgba(20,20,20,0.66) 55%, rgba(42,18,8,0.62) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-4">Shipment Tracking</p>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">Track your order</h1>
          <p className="text-white/60 max-w-md mx-auto">Enter your tracking reference and delivery postcode and our team will get you a status update on your shipment.</p>
        </div>
      </section>
      <section className="py-24 px-6 bg-gray-50">
        <Suspense fallback={<div className="max-w-xl mx-auto text-center text-gray-400">Loading...</div>}>
          <TrackForm />
        </Suspense>
      </section>
    </>
  );
}
