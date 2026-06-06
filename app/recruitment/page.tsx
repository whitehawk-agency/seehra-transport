"use client";
import { useState } from "react";

export default function RecruitmentPage() {
  const [form, setForm] = useState({ name:"",email:"",phone:"",address:"",licence:"",years:"",experience:"",availability:"",info:"" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setStatus("sending");
    try {
      const res = await fetch("/api/recruit", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      setStatus(res.ok ? "sent" : "error");
    } catch { setStatus("error"); }
  }

  const inp = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f7680b] transition-colors";

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-2">Join Our Team</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">Become part of a<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage:"linear-gradient(135deg,#e62b1e,#f7a50b)" }}>professional driving team</span></h1>
        </div>
      </section>

      {/* Why Drive With Us */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3 text-center">Why Drive With Us</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-center mb-10">The benefits of joining Seehra Transport</h2>
          <div className="grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { icon:"", title:"Competitive Pay", desc:"Industry-leading rates. Fuel paid on top of your day rate. Weekly payments, reliable every week." },
              { icon:"", title:"Flexible Schedules", desc:"Full-time, part-time, and flexible options. Choose which days you want to work." },
              { icon:"", title:"Modern Fleet", desc:"Well-maintained vehicles. Low-deposit rental vans available directly from us." },
              { icon:"", title:"Full Support", desc:"Training fully paid. DBS check arranged and paid for. Drugs & alcohol test — we pay." },
            ].map(b => (
              <div key={b.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="font-bold mb-2 text-base">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Requirements + Form side by side */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3">Requirements</p>
              <h2 className="text-3xl font-extrabold mb-7">What we're looking for</h2>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { icon:"", title:"Valid UK Driving Licence", desc:"Must be held over 1 year with no more than 6 penalty points." },
                  { icon:"", title:"Smartphone", desc:"Required for our route app and real-time delivery management." },
                  { icon:"", title:"DBS Check", desc:"Required. We help you obtain this and cover the cost." },
                  { icon:"", title:"Drugs & Alcohol Test", desc:"Required before starting. We arrange and pay for this." },
                  { icon:"", title:"East & West Midlands Routes", desc:"Currently recruiting for routes in both regions." },
                  { icon:"", title:"Reliable & Customer-Focused", desc:"Punctual, hard-working and customer conscious." },
                ].map(r => (
                  <div key={r.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-xl">{r.icon}</span>
                    <div>
                      <div className="font-bold text-sm mb-0.5">{r.title}</div>
                      <div className="text-gray-500 text-sm">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* What you get */}
              <div className="bg-[#0a0a0a] rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">What you get</h3>
                {["Weekly payments — every week","Training fully paid for","Fuel paid on top of day rate","Choose your working days","DBS check — we help arrange & pay","Drugs & alcohol test — we pay","Bring your own van or rent from us","Full support from our logistics team"].map(i => (
                  <div key={i} className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0">
                    <span className="text-[#f7680b] font-bold text-sm"></span>
                    <span className="text-white/60 text-sm">{i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div id="apply" className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold mb-5">Apply Now</h2>
              {status === "sent" ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4"></div>
                  <h3 className="text-xl font-bold mb-2">Application Received!</h3>
                  <p className="text-gray-500">Thank you. We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name *</label><input required className={inp} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} /></div>
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email *</label><input required type="email" className={inp} value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} /></div>
                  </div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone *</label><input required className={inp} value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Address *</label><input required className={inp} value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Licence Type *</label>
                    <select required className={inp} value={form.licence} onChange={e=>setForm(p=>({...p,licence:e.target.value}))}>
                      <option value="">Select...</option>
                      <option>Category B (Car / Small Van)</option>
                      <option>Category C1 (Medium Goods)</option>
                      <option>Category C (Large Goods)</option>
                      <option>Category C+E (Articulated)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Years Holding Licence</label><input className={inp} value={form.years} onChange={e=>setForm(p=>({...p,years:e.target.value}))} /></div>
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Availability *</label>
                      <select required className={inp} value={form.availability} onChange={e=>setForm(p=>({...p,availability:e.target.value}))}>
                        <option value="">Select...</option>
                        <option>Full-time</option><option>Part-time</option><option>Flexible</option><option>Weekends Only</option>
                      </select>
                    </div>
                  </div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Driving Experience</label>
                    <select className={inp} value={form.experience} onChange={e=>setForm(p=>({...p,experience:e.target.value}))}>
                      <option value="">Select...</option>
                      <option>No professional experience</option><option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>5+ years</option>
                    </select>
                  </div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Additional Information</label><textarea rows={3} className={inp+" resize-none"} value={form.info} onChange={e=>setForm(p=>({...p,info:e.target.value}))} /></div>
                  <button type="submit" disabled={status==="sending"} className="w-full py-4 rounded-xl font-bold text-white text-sm uppercase tracking-wide transition-all hover:opacity-90 disabled:opacity-50 mt-1" style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>
                    {status==="sending" ? "Submitting..." : "Submit Application →"}
                  </button>
                  {status==="error" && <p className="text-red-500 text-xs text-center">Something went wrong. Please email recruitment@seehratransport.com directly.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
