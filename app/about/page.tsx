import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "About Us", description: "Learn about Seehra Transport — your trusted UK logistics partner with over a decade of experience." };

const values = [
  { num:"01", title:"Reliability", desc:"Our 98% on-time delivery rate isn't just a statistic — it's our standard operating procedure, every single day." },
  { num:"02", title:"Efficiency", desc:"Advanced route optimisation minimises delivery times and costs, benefiting both our clients and the environment." },
  { num:"03", title:"Professionalism", desc:"Every driver represents your brand at the door. We maintain the highest standards in appearance and conduct." },
  { num:"04", title:"Transparency", desc:"Real-time tracking and honest communication throughout. No surprises, no excuses." },
  { num:"05", title:"Flexibility", desc:"Solutions that adapt to your schedule, your customers, and your specific requirements." },
  { num:"06", title:"Safety", desc:"Driver safety, goods security, and public safety are paramount in everything we do." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 60%,#2a1208 100%)" }} />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(247,104,11,1) 1px,transparent 1px),linear-gradient(90deg,rgba(247,104,11,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-2">About Seehra Transport</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">Your trusted<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage:"linear-gradient(135deg,#e62b1e,#f7a50b)" }}>logistics partner</span></h1>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3">Who We Are</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-5">Invisible every day,<br />but essential to everyone</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Seehra Transport is a leading logistics and delivery company specialising in multi-drop and last-mile delivery services across the UK. With over a decade of experience, we've built our reputation on reliability, efficiency, and exceptional customer service.</p>
            <p className="text-gray-600 leading-relaxed mb-4">Our team of professional drivers and logistics experts work tirelessly to ensure your deliveries reach their destination on time, every time. In today's fast-paced business environment, timely delivery isn't just a service — it's a necessity.</p>
            <div className="border-l-4 border-[#f7680b] pl-5 mb-7">
              <p className="text-gray-500 italic text-sm leading-relaxed mb-2">"Being a privately owned business means we make decisions quickly — building trusted partnerships and delivering logistical services tailored to each client's unique needs."</p>
              <p className="text-gray-400 text-xs font-semibold not-italic">— The Seehra Transport Team</p>
            </div>
            <Link href="/contact" className="inline-block bg-[#f7680b] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#e55a00] transition-colors">Get in Touch Today →</Link>
          </div>
          <div className="rounded-2xl overflow-hidden">
<div className="w-full h-[420px] rounded-2xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0a0a0a,#2a1208)" }}>
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(247,104,11,1) 1px,transparent 1px),linear-gradient(90deg,rgba(247,104,11,1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="relative z-10">
                <div className="text-5xl font-extrabold text-transparent bg-clip-text mb-2" style={{ backgroundImage: "linear-gradient(135deg,#e62b1e,#f7a50b)" }}>15,000+</div>
                <p className="text-white/70 text-sm mb-6">parcels delivered every week</p>
                <div className="grid grid-cols-2 gap-4 max-w-xs">
                  <div><div className="text-2xl font-extrabold text-white">98%</div><div className="text-white/40 text-xs">On-time rate</div></div>
                  <div><div className="text-2xl font-extrabold text-white">100+</div><div className="text-white/40 text-xs">Vehicles</div></div>
                  <div><div className="text-2xl font-extrabold text-white">10+</div><div className="text-white/40 text-xs">Years</div></div>
                  <div><div className="text-2xl font-extrabold text-white">UK</div><div className="text-white/40 text-xs">Nationwide</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — numbers + title + desc only, NO stats underneath */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6">

        <div className="absolute inset-0 bg-gray-50/97" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3 text-center">Our Core Values</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-10">The principles that guide everything we do</h2>
          <div className="grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map(v => (
              <div key={v.num} className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all">
                <div className="text-4xl font-extrabold mb-3 text-transparent bg-clip-text leading-none" style={{ backgroundImage:"linear-gradient(135deg,#e62b1e,#f7a50b)" }}>{v.num}</div>
                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
          {/* No stats block here — removed as requested */}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
<div className="w-full h-80 rounded-2xl flex items-center justify-center p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative z-10 text-center">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="mx-auto mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM20 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 001 1h1m-8 0h4m4 0h1a1 1 0 001-1v-3.28a1 1 0 00-.684-.948l-2.36-.787a1 1 0 01-.578-.502l-1.736-3.473A1 1 0 0014.382 6H13"/></svg>
              <p className="text-white font-extrabold text-xl mb-1">Reliable. Efficient.</p>
              <p className="text-white/80 text-sm">Professional logistics you can count on</p>
            </div>
          </div>
          <div>
            <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3">Why Choose Us</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-5">Proven track record.<br />Modern fleet. Real support.</h2>
            {[
              ["Proven Track Record","Over 10 years delivering 15,000+ parcels every week. Our clients trust us because we've consistently delivered."],
              ["Modern Fleet","100+ well-maintained vehicles ensures we can handle any delivery requirement, large or small."],
              ["Real-Time Tracking","Know exactly where your deliveries are at all times. Full transparency from collection to delivery."],
              ["Dedicated Support","Our team is always available to answer questions, provide updates, and resolve any issues quickly."],
            ].map(([t,d]) => (
              <div key={t as string} className="flex items-start gap-3 mb-4">
                <span className="text-[#f7680b] font-bold text-lg mt-0.5">→</span>
                <div>
                  <div className="font-bold text-sm mb-0.5">{t as string}</div>
                  <div className="text-gray-500 text-sm">{d as string}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-3">Ready to work with us?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">Join hundreds of businesses that trust Seehra Transport for their delivery needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-white text-[#f7680b] px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-colors">Get in Touch Today →</Link>
            <Link href="/services" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">View Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
