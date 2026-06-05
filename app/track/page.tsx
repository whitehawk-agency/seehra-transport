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
    // In production this calls the backend. For now show a demo state.
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
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6"><div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" /><span className="font-bold text-green-700 text-sm">Shipment Located</span></div>
          <div className="flex flex-col gap-3">
            {[["In Transit","Your parcel is with the driver","✅"],["Out for Delivery","Estimated delivery today","🚐"],["On Time","No delays reported","⏱️"]].map(([t,d,i])=>(
              <div key={t} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <span className="text-xl">{i}</span>
                <div><div className="font-bold text-sm">{t}</div><div className="text-gray-500 text-xs">{d}</div></div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-4 text-center">For live updates, contact us at info@seehratransport.com</p>
        </div>
      )}
      {result === "notfound" && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2">❌</div>
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
      <section className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-4">Shipment Tracking</p>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">Track your order</h1>
          <p className="text-white/60 max-w-md mx-auto">Enter your tracking reference and delivery postcode for a live status update on your shipment.</p>
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
