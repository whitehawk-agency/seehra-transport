"use client";
import { useState } from "react";
import Link from "next/link";

type Tab = "quote" | "track";

export default function QuoteWidget() {
  const [tab, setTab] = useState<Tab>("quote");
  const [quoteForm, setQuoteForm] = useState({ name:"", email:"", phone:"", collection:"", delivery:"", service:"", weight:"", details:"" });
  const [trackRef, setTrackRef] = useState("");
  const [trackPostcode, setTrackPostcode] = useState("");
  const [quoteStatus, setQuoteStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  async function submitQuote(e: React.FormEvent) {
    e.preventDefault();
    setQuoteStatus("sending");
    try {
      const res = await fetch("/api/quote", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(quoteForm) });
      setQuoteStatus(res.ok ? "sent" : "error");
    } catch { setQuoteStatus("error"); }
  }

  const inp = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#f7680b] transition-colors placeholder-gray-400";

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
      {/* Tabs — no "Get a Quote" label, just Quote Form / Track Order */}
      <div className="flex gap-2 mb-6">
        {(["quote","track"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold tracking-wide uppercase transition-all ${
              tab === t ? "text-white" : "text-gray-400 border border-gray-200 hover:text-gray-600"
            }`}
            style={tab === t ? { background:"linear-gradient(135deg,#e62b1e,#f7680b)" } : {}}
          >
            {t === "quote" ? "Request a Quote" : "Track Order"}
          </button>
        ))}
      </div>

      {tab === "quote" ? (
        quoteStatus === "sent" ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-gray-900 font-bold text-lg mb-2">Quote Request Sent!</h3>
            <p className="text-gray-500 text-sm">We've received your details and will email you shortly.</p>
            <button onClick={() => setQuoteStatus("idle")} className="mt-4 text-[#f7680b] text-sm underline">Request another quote</button>
          </div>
        ) : (
          <form onSubmit={submitQuote} className="flex flex-col gap-3">
            <p className="text-gray-500 text-xs mb-1">Tell us what you need and we'll get back to you with a price.</p>
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder="Your Name *" className={inp} value={quoteForm.name} onChange={e=>setQuoteForm(p=>({...p,name:e.target.value}))} />
              <input required type="email" placeholder="Email Address *" className={inp} value={quoteForm.email} onChange={e=>setQuoteForm(p=>({...p,email:e.target.value}))} />
            </div>
            <input placeholder="Phone Number" className={inp} value={quoteForm.phone} onChange={e=>setQuoteForm(p=>({...p,phone:e.target.value}))} />
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder="Collection Postcode *" className={inp} value={quoteForm.collection} onChange={e=>setQuoteForm(p=>({...p,collection:e.target.value}))} />
              <input required placeholder="Delivery Postcode *" className={inp} value={quoteForm.delivery} onChange={e=>setQuoteForm(p=>({...p,delivery:e.target.value}))} />
            </div>
            <select required className={inp + " appearance-none cursor-pointer"} value={quoteForm.service} onChange={e=>setQuoteForm(p=>({...p,service:e.target.value}))}>
              <option value="">Service Type *</option>
              <option>Standard (2–3 days) — from £4.99</option>
              <option>Next Day — from £12.99</option>
              <option>Same Day — from £24.99</option>
              <option>Multi-Drop Delivery</option>
              <option>Last-Mile Logistics</option>
              <option>Flexible / Custom Solution</option>
            </select>
            <select className={inp + " appearance-none cursor-pointer"} value={quoteForm.weight} onChange={e=>setQuoteForm(p=>({...p,weight:e.target.value}))}>
              <option value="">Package Weight (optional)</option>
              <option>Up to 5kg</option>
              <option>5–10kg</option>
              <option>10–25kg</option>
              <option>Over 25kg</option>
            </select>
            <textarea rows={2} placeholder="Additional details (optional)" className={inp + " resize-none"} value={quoteForm.details} onChange={e=>setQuoteForm(p=>({...p,details:e.target.value}))} />
            <button
              type="submit"
              disabled={quoteStatus === "sending"}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white uppercase tracking-wide transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}
            >
              {quoteStatus === "sending" ? "Sending..." : "Submit Quote Request →"}
            </button>
            {quoteStatus === "error" && <p className="text-red-500 text-xs text-center">Something went wrong — please email info@seehratransport.com</p>}
            <p className="text-gray-400 text-xs text-center">No hidden fees · We'll respond promptly</p>
          </form>
        )
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-gray-500 text-xs mb-1">Enter your tracking reference to get a live status update.</p>
          <input placeholder="Tracking Reference (e.g. ST-2024-00123)" className={inp} value={trackRef} onChange={e=>setTrackRef(e.target.value)} />
          <input placeholder="Delivery Postcode" className={inp} value={trackPostcode} onChange={e=>setTrackPostcode(e.target.value)} />
          <Link
            href={`/track?ref=${trackRef}&postcode=${trackPostcode}`}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white uppercase tracking-wide text-center block transition-all hover:opacity-90"
            style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}
          >
            Track Shipment →
          </Link>
          <p className="text-gray-400 text-xs text-center">Real-time GPS tracking · Proof of delivery included</p>
        </div>
      )}
    </div>
  );
}
