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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/handshake.jpg')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.78) 0%, rgba(20,20,20,0.6) 55%, rgba(42,18,8,0.55) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-2">About Seehra Transport</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">Your trusted<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage:"linear-gradient(135deg,#e62b1e,#f7a50b)" }}>logistics partner</span></h1>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3">Who We Are</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">Invisible every day,<br />but essential to everyone</h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-lg">Seehra Transport is a leading logistics and delivery company specialising in multi-drop and last-mile delivery services across the United Kingdom. With over a decade of experience from our base in Oldbury, West Midlands, we've built our reputation on three simple things: reliability, efficiency, and genuine customer care.</p>
          <p className="text-gray-600 leading-relaxed mb-8 text-lg">Every week our team handles thousands of parcels, and behind each one is a professional driver and a support team making sure your goods arrive exactly when they should. When you hand something to us, you're trusting us with your reputation as well as your parcel — and that's a responsibility we take seriously on every single job.</p>
          <Link href="/contact" className="inline-block bg-[#f7680b] text-white px-8 py-4 rounded-full font-bold hover:bg-[#e55a00] transition-colors">Get in Touch Today →</Link>
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
