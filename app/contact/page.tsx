"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName:"",lastName:"",email:"",phone:"",enquiry:"",message:"" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      setStatus(res.ok ? "sent" : "error");
    } catch { setStatus("error"); }
  }

  const inp = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f7680b] transition-colors";

  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-end overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 60%,#2a1208 100%)" }} />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(247,104,11,1) 1px,transparent 1px),linear-gradient(90deg,rgba(247,104,11,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-2">Get In Touch</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">Talk to us</h1>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-3xl font-extrabold mb-5">We're here to help</h2>
            <p className="text-gray-600 leading-relaxed mb-8">Whether you're enquiring about delivery services, discussing a contract, or applying to join our driver network — our team is ready to help.</p>
            {[
              { icon:"", label:"Email", value:"info@seehratransport.com", href:"mailto:info@seehratransport.com" },
              { icon:"", label:"Phone", value:"07990 702743", href:"tel:07990702743" },
              { icon:"", label:"Secondary", value:"07512 837585", href:"tel:07512837585" },
              { icon:"", label:"Head Office", value:"Unit 5 & 6 Park Lane Industrial Estate, Park Lane, Oldbury, West Midlands, B69 4JX" },
              { icon:"", label:"Hours", value:"Monday – Friday, 9:00 AM – 5:00 PM · Sat–Sun Closed" },
            ].map(d => (
              <div key={d.label} className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>{d.icon}</div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{d.label}</div>
                  {d.href ? <a href={d.href} className="text-gray-900 font-medium text-sm hover:text-[#f7680b] transition-colors">{d.value}</a> : <p className="text-gray-700 text-sm">{d.value}</p>}
                </div>
              </div>
            ))}
            <div className="mt-6 rounded-2xl overflow-hidden">
              <div className="w-full h-44 flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
                <p className="relative z-10 text-white font-extrabold text-lg">On Time. Every Time.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold mb-5">Send us a message</h2>
            {status === "sent" ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4"></div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-500">Thank you. We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">First Name *</label><input required className={inp} value={form.firstName} onChange={e=>setForm(p=>({...p,firstName:e.target.value}))} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Last Name *</label><input required className={inp} value={form.lastName} onChange={e=>setForm(p=>({...p,lastName:e.target.value}))} /></div>
                </div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email *</label><input required type="email" className={inp} value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} /></div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</label><input className={inp} value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} /></div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Enquiry Type</label>
                  <select className={inp} value={form.enquiry} onChange={e=>setForm(p=>({...p,enquiry:e.target.value}))}>
                    <option value="">Select...</option>
                    <option>Delivery Services</option><option>Request a Quote</option><option>Multi-Drop Contract</option><option>Driver Recruitment</option><option>Track a Shipment</option><option>Enterprise / Business Account</option><option>Other</option>
                  </select>
                </div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Message *</label><textarea required rows={4} className={inp+" resize-none"} value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} /></div>
                <button type="submit" disabled={status==="sending"} className="w-full py-4 rounded-xl font-bold text-white text-sm uppercase tracking-wide transition-all hover:opacity-90 disabled:opacity-50 mt-1" style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>
                  {status==="sending" ? "Sending..." : "Send Message →"}
                </button>
                {status==="error" && <p className="text-red-500 text-xs text-center">Something went wrong. Please email info@seehratransport.com directly.</p>}
                <p className="text-gray-400 text-xs text-center">We typically respond within 2 business hours.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
