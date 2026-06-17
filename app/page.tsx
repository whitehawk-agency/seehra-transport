import Link from "next/link";
import QuoteWidget from "@/components/QuoteWidget";

const services = [
  { href: "/services#multi-drop", icon: "", title: "Multi-Drop Delivery", desc: "Efficient multi-stop routes for businesses that need to reach multiple locations. We optimise every route for speed and cost.", tags: ["Route Optimised","Bulk Volume","POD Included"] },
  { href: "/services#last-mile", icon: "", title: "Last-Mile Logistics", desc: "From depot or warehouse directly to your customer's door. GPS tracked with photo proof of delivery.", tags: ["GPS Tracked","POD","B2C & B2B"] },
  { href: "/services#flexible", icon: "", title: "Flexible Solutions", desc: "Custom delivery arrangements — dedicated vehicles, scheduled collections, out-of-hours and specialist handling.", tags: ["Custom","Dedicated","Out-of-Hours"] },
  { href: "/services#pricing", icon: "", title: "Same-Day Courier", desc: "Urgent delivery within 4–6 hours for time-critical shipments. From £24.99.", tags: ["4–6 hrs","Express"] },
  { href: "/services#pricing", icon: "", title: "Next-Day Express", desc: "Next working day with AM, PM or evening time slots. From £12.99.", tags: ["Next Day","Flexible Slots"] },
  { href: "/services#pricing", icon: "", title: "Standard Delivery", desc: "Cost-effective 2–3 working day service with full tracking. From £4.99.", tags: ["2–3 Days","Tracked"] },
];

export default function HomePage() {
  return (
    <>
      {/*  HERO  */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden text-center">
        {/* Hero background — swap the URL below for your own image when ready */}
<div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 55%,#2a1208 100%)" }} />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(247,104,11,1) 1px,transparent 1px),linear-gradient(90deg,rgba(247,104,11,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(230,43,30,0.10) 0%, transparent 70%)" }} />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-extrabold text-white mb-5 tracking-tight text-center w-full" style={{ fontSize:"clamp(2rem, 5vw, 4.5rem)", lineHeight:"1.1" }}>
            Your Freight Secure<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage:"linear-gradient(135deg,#e62b1e,#f7a50b)" }}>In Our Transit</span>
          </h1>
          <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto px-2">
            Multi-drop and last-mile logistics specialists serving businesses across the United Kingdom — on time, every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
            <Link href="/contact" className="bg-[#f7680b] hover:bg-[#e55a00] text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:shadow-lg hover:shadow-orange-500/30 w-full sm:w-auto text-center">
              Get a Quote →
            </Link>
            <Link href="/services" className="border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:bg-white/10 w-full sm:w-auto text-center">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/*  MARQUEE  */}
      <div className="bg-[#0a0a0a] border-t border-white/5 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(2).fill(["Multi-Drop Delivery","Last-Mile Logistics","Same-Day Courier","Next-Day Express","Flexible Solutions","98% On-Time","GPS Tracked","Fully Insured","Nationwide UK","West Midlands Based","From £4.99","On Time. Every Time."]).flat().map((item, i) => (
            <span key={i} className={`mx-6 text-xs font-bold tracking-widest uppercase ${i % 2 === 0 ? "text-[#f7680b]" : "text-white/20"}`}>{item}</span>
          ))}
        </div>
      </div>

      {/*  OUR STORY  */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white" id="about">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3 text-center">Who We Are</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5 text-center">
            Invisible every day,{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage:"linear-gradient(135deg,#e62b1e,#f7a50b)" }}>but essential to everyone</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-base">
            Seehra Transport is a professional logistics and delivery company specialising in multi-drop and last-mile services across the UK. Based at Park Lane Industrial Estate in Oldbury, we deliver 15,000 individual parcels every week, Monday to Friday.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4 text-base">
            Over a decade of experience has allowed us to build a reputation on three things: reliability, efficiency, and professionalism. Our team work tirelessly so your deliveries arrive on time — and your customers' experience reflects well on your brand.
          </p>
          <div className="border-l-4 border-[#f7680b] pl-5 mb-8">
            <p className="text-gray-500 italic text-sm leading-relaxed mb-2">
              "Being a privately owned business means we make decisions quickly — building trusted partnerships and delivering logistical services tailored to each client's needs."
            </p>
            <p className="text-gray-400 text-xs font-semibold not-italic">— The Seehra Transport Team</p>
          </div>
          <div className="mb-10">
            <Link href="/about" className="inline-block border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:border-[#f7680b] hover:text-[#f7680b] transition-colors">
              Our Story →
            </Link>
          </div>
          <QuoteWidget />
        </div>
      </section>

      {/*  SERVICES  */}
      <section className="bg-gray-50 py-16 sm:py-24 px-4 sm:px-6" id="services">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3 text-center">Our Expertise</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-center mb-3">All roads lead to your door</h2>
          <p className="text-gray-500 text-sm leading-relaxed text-center max-w-xl mx-auto mb-10">
            Comprehensive logistics solutions covering every delivery requirement — from urgent same-day runs to complex multi-drop distribution.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <Link key={s.title} href={s.href}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all hover:-translate-y-1 flex flex-col">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#f7680b] transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {s.tags.map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">{t}</span>)}
                </div>
                <span className="text-[#f7680b] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Discover <span>→</span></span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services" className="inline-block border border-gray-200 hover:border-[#f7680b] text-gray-700 hover:text-[#f7680b] px-8 py-3 rounded-xl font-semibold text-sm transition-all">View all services →</Link>
          </div>
        </div>
      </section>

      {/*  PRICING  */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3 text-center">Transparent Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-3">Simple, Fair Rates</h2>
          <p className="text-gray-500 text-center mb-10 max-w-lg mx-auto text-sm">No hidden fees. No surprises. Volume discounts available for businesses.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name:"Standard Delivery", price:"£4.99", period:"2–3 working days", features:["Full tracking included","Up to 25kg","Proof of delivery","Email notifications"] },
              { name:"Next Day Delivery", price:"£12.99", period:"Next working day", features:["1-hour time window","Priority handling","SMS notifications","AM / PM / Eve slots"], popular:true },
              { name:"Same Day Delivery", price:"£24.99", period:"Same day · 4-hr window", features:["Express handling","Real-time tracking","Urgent collection","Live driver updates"] },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl p-6 border ${(plan as any).popular ? "border-[#f7680b] bg-[#0a0a0a] shadow-xl shadow-orange-500/10 sm:scale-105" : "border-gray-200 bg-white"}`}>
                {(plan as any).popular && <div className="text-xs font-bold text-[#f7680b] tracking-widest uppercase mb-3">Most Popular</div>}
                <h3 className={`text-lg font-bold mb-1 ${(plan as any).popular ? "text-white":"text-gray-900"}`}>{plan.name}</h3>
                <div className={`text-3xl font-extrabold mb-1 ${(plan as any).popular ? "text-white":"text-gray-900"}`}>{plan.price}</div>
                <div className={`text-sm mb-5 ${(plan as any).popular ? "text-white/50":"text-gray-400"}`}>{plan.period}</div>
                <ul className="flex flex-col gap-2 mb-6">
                  {plan.features.map(f => <li key={f} className={`text-sm flex items-center gap-2 ${(plan as any).popular ? "text-white/70":"text-gray-600"}`}><span className="text-[#f7680b]"></span>{f}</li>)}
                </ul>
                <Link href="/contact" className={`block text-center py-3 rounded-xl font-bold text-sm transition-colors ${(plan as any).popular ? "bg-[#f7680b] text-white hover:bg-[#e55a00]":"border border-gray-200 text-gray-700 hover:border-[#f7680b] hover:text-[#f7680b]"}`}>Get Started</Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-6">All prices exclude VAT. <Link href="/contact" className="text-[#f7680b] underline">Contact us</Link> for volume discounts.</p>
        </div>
      </section>

      {/*  RECRUITMENT TEASER  */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background:"linear-gradient(135deg,#e62b1e 0%,#f7680b 100%)" }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">Drive with Seehra.</h2>
            <p className="text-white/80 text-base sm:text-lg max-w-xl">Hiring self-employed delivery drivers for East & West Midlands routes. Weekly pay, training provided, fuel paid on top of your day rate.</p>
          </div>
          <Link href="/recruitment-portal" className="bg-white text-[#f7680b] px-8 py-4 rounded-xl font-bold text-base whitespace-nowrap hover:bg-orange-50 transition-colors shadow-xl w-full lg:w-auto text-center">View Careers →</Link>
        </div>
      </section>
    </>
  );
}
