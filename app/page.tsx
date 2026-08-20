import Link from "next/link";
import QuoteWidget from "@/components/QuoteWidget";

const services = [
  { href: "/services#multi-drop", icon: "", title: "Multi-Drop Delivery", desc: "Efficient multi-stop routes for businesses that need to reach multiple locations. We optimise every route for speed and cost.", tags: ["Route Optimised","Bulk Volume","POD Included"] },
  { href: "/services#last-mile", icon: "", title: "Last-Mile Logistics", desc: "From depot or warehouse directly to your customer's door. GPS tracked with photo proof of delivery.", tags: ["GPS Tracked","POD","B2C & B2B"] },
  { href: "/services#flexible", icon: "", title: "Flexible Solutions", desc: "Custom delivery arrangements — dedicated vehicles, scheduled collections, out-of-hours and specialist handling.", tags: ["Custom","Dedicated","Out-of-Hours"] },
  { href: "/services", icon: "", title: "Same-Day Courier", desc: "Urgent delivery within 4–6 hours for time-critical shipments.", tags: ["4–6 hrs","Express"] },
  { href: "/services", icon: "", title: "Next-Day Express", desc: "Next working day with AM, PM or evening time slots.", tags: ["Next Day","Flexible Slots"] },
  { href: "/services", icon: "", title: "Standard Delivery", desc: "Cost-effective 2–3 working day service with full tracking.", tags: ["2–3 Days","Tracked"] },
];

export default function HomePage() {
  return (
    <>
      {/*  HERO  */}
      <section className="relative min-h-[78vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden text-center">
        {/* Hero background photo with dark overlay for readability */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/delivery-handoff.jpg')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.62) 0%, rgba(20,20,20,0.48) 50%, rgba(42,18,8,0.45) 100%)" }} />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-extrabold text-white mb-5 tracking-tight text-center w-full sm:whitespace-nowrap" style={{ fontSize:"clamp(2.6rem, 7vw, 5.5rem)", lineHeight:"1.05" }}>
            Your Freight Secure<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage:"linear-gradient(135deg,#e62b1e,#f7a50b)" }}>In Our Transit</span>
          </h1>
          <p className="text-white/80 text-base sm:text-xl leading-relaxed mb-8 sm:mb-9 max-w-2xl mx-auto px-2">
            Multi-drop and last-mile logistics specialists serving businesses across the United Kingdom — on time, every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
            <Link href="/contact" className="bg-[#f7680b] hover:bg-[#e55a00] text-white px-9 py-4 rounded-full font-bold text-lg transition-all hover:shadow-lg hover:shadow-orange-500/30 w-full sm:w-auto text-center">
              Get a Quote →
            </Link>
            <Link href="/services" className="border-2 border-white/50 hover:border-white text-white px-9 py-4 rounded-full font-bold text-lg transition-all hover:bg-white/10 w-full sm:w-auto text-center">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/*  QUOTE  */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" id="quote" style={{ background:"linear-gradient(135deg,#e62b1e 0%,#f7680b 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <QuoteWidget />
        </div>
      </section>

      {/*  SERVICES  */}
      <section className="bg-gray-50 py-16 sm:py-24 px-4 sm:px-6" id="services">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3 text-center">Our Expertise</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-center mb-3">All roads lead to your door</h2>
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

      {/*  RECRUITMENT TEASER  */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background:"linear-gradient(135deg,#e62b1e 0%,#f7680b 100%)" }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">Drive with Seehra.</h2>
            <p className="text-white/80 text-base sm:text-lg max-w-xl">Hiring self-employed delivery drivers for East & West Midlands routes. Weekly pay, training provided, fuel paid on top of your day rate.</p>
          </div>
          <Link href="/careers" className="bg-white text-[#f7680b] px-8 py-4 rounded-xl font-bold text-base whitespace-nowrap hover:bg-orange-50 transition-colors shadow-xl w-full lg:w-auto text-center">View Careers →</Link>
        </div>
      </section>
    </>
  );
}
