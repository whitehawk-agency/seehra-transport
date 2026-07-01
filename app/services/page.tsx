import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Our Services", description: "Multi-drop delivery, last-mile logistics, same-day courier, next-day and flexible solutions across the UK." };

const services = [
  { id:"multi-drop", icon:"", title:"Multi-Drop Delivery", subtitle:"Efficient multi-location delivery solutions",
    img:"/driver-clipboard.jpg",
    desc:"Our multi-drop delivery service is designed for businesses that need to reach multiple locations efficiently. Whether you're delivering to 5 locations or 50, we optimise routes to ensure timely delivery at every stop.",
    includes:["Optimised route planning","Real-time tracking for all deliveries","Proof of delivery at each location","Flexible scheduling to match your business","Professional drivers trained in customer service","Same-day and next-day options available"],
    idealFor:["Retail chains and outlets","Wholesale distributors","Food and beverage suppliers","Construction material suppliers","Pharmaceutical companies"] },
  { id:"last-mile", icon:"", title:"Last-Mile Logistics", subtitle:"Direct delivery to your customers' doorsteps",
    img:"/drone-delivery.jpg", imgPos:"center 30%",
    desc:"Last-mile delivery is often the most critical part of the logistics chain. We specialise in getting your products from our depot or warehouse directly to your customers' doors — ensuring a positive delivery experience.",
    includes:["Direct delivery to residential and business addresses","Customisable delivery time windows","SMS and email delivery notifications","Photo proof of delivery","Signature capture options","Returns management"],
    idealFor:["E-commerce businesses","Online retailers","Subscription box services","Direct-to-consumer brands","Furniture and appliance retailers"] },
  { id:"flexible", icon:"", title:"Flexible Solutions", subtitle:"Custom delivery tailored to your needs",
    img:"/truck-road.jpg",
    desc:"Every business has unique logistics requirements. Our flexible solutions adapt to your specific needs — dedicated vehicles, scheduled collections, or specialised handling. From one-off urgent deliveries to long-term contracts.",
    includes:["Dedicated vehicle hire","Scheduled regular collections","Out-of-hours delivery options","Weekend and bank holiday deliveries","Fragile item handling","Two-person delivery teams"],
    idealFor:["Businesses with irregular needs","High-value or fragile goods","Out-of-hours requirements","Long-term contract clients","Businesses needing dedicated vehicles"] },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative h-[45vh] min-h-[300px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/container-worker.jpg')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.78) 0%, rgba(20,20,20,0.6) 55%, rgba(42,18,8,0.55) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16 w-full">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-2">Our Expertise</p>
          <h1 className="text-[2.6rem] leading-[1.1] sm:text-5xl lg:text-6xl font-extrabold text-white">Comprehensive logistics<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage:"linear-gradient(135deg,#e62b1e,#f7a50b)" }}>solutions</span></h1>
        </div>
      </section>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={`py-14 sm:py-20 px-4 sm:px-6 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
              <div className="text-4xl mb-3">{s.icon}</div>
              <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-2">{s.subtitle}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">{s.desc}</p>
              <Link href="/contact" className="inline-block bg-[#f7680b] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e55a00] transition-colors text-sm">Get a Quote →</Link>
            </div>
            <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
              <div className="rounded-2xl w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" style={{ objectPosition: s.imgPos || "center" }} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section id="pricing" className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3 text-center">Transparent Pricing</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-3">Simple, Fair Rates</h2>
          <p className="text-gray-500 text-center mb-10 max-w-lg mx-auto text-sm">No hidden fees. All prices exclude VAT. Volume discounts available.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { name:"Standard Delivery", price:"£4.99", period:"2–3 working days", features:["Full tracking","Up to 25kg","Proof of delivery","Email notifications"] },
              { name:"Next Day Delivery", price:"£12.99", period:"Next working day", features:["1-hour time window","Priority handling","SMS notifications","AM / PM / Eve slots"], popular:true },
              { name:"Same Day Delivery", price:"£24.99", period:"Same day · 4-hr window", features:["Express handling","Real-time tracking","Urgent collection","Live driver updates"] },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl p-6 border ${(plan as any).popular ? "border-[#f7680b] bg-[#0a0a0a] shadow-xl shadow-orange-500/10" : "border-gray-200 bg-white"}`}>
                {(plan as any).popular && <div className="text-xs font-bold text-[#f7680b] tracking-widest uppercase mb-2">Most Popular</div>}
                <h3 className={`text-base font-bold mb-1 ${(plan as any).popular ? "text-white":"text-gray-900"}`}>{plan.name}</h3>
                <div className={`text-3xl font-extrabold mb-1 ${(plan as any).popular ? "text-white":"text-gray-900"}`}>{plan.price}</div>
                <div className={`text-xs mb-4 ${(plan as any).popular ? "text-white/50":"text-gray-400"}`}>{plan.period}</div>
                <ul className="flex flex-col gap-1.5 mb-5">
                  {plan.features.map(f => <li key={f} className={`text-xs flex items-center gap-2 ${(plan as any).popular ? "text-white/70":"text-gray-600"}`}><span className="text-[#f7680b]"></span>{f}</li>)}
                </ul>
                <Link href="/contact" className={`block text-center py-2.5 rounded-xl font-bold text-sm transition-colors ${(plan as any).popular ? "bg-[#f7680b] text-white hover:bg-[#e55a00]":"border border-gray-200 text-gray-700 hover:border-[#f7680b] hover:text-[#f7680b]"}`}>Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14 sm:py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/warehouse.jpg')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(20,20,20,0.82) 60%, rgba(42,18,8,0.82) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3 text-center">For Businesses</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center mb-3">Enterprise Solutions</h2>
          <p className="text-white/60 text-center mb-8 max-w-lg mx-auto text-sm">Tailored logistics for high-volume businesses with advanced integration and dedicated support.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon:"", title:"Volume Discounts", desc:"Competitive pricing for businesses shipping 100+ parcels per week." },
              { icon:"", title:"Dedicated Account Manager", desc:"A single point of contact who understands your business." },
              { icon:"", title:"API Integration", desc:"RESTful API for booking, tracking, and managing deliveries." },
              { icon:"", title:"Marketplace Integrations", desc:"Connect Shopify, Amazon, eBay, and WooCommerce." },
              { icon:"", title:"Flexible Payment Terms", desc:"NET-30 and NET-60 options, consolidated monthly invoicing." },
              { icon:"", title:"Priority Business Support", desc:"Phone and email support with priority handling." },
            ].map(f => (
              <div key={f.title} className="bg-white/8 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-orange-500/40 transition-all">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="font-bold mb-1 text-white text-sm">{f.title}</h3>
                <p className="text-white/55 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/contact" className="inline-block bg-[#f7680b] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#e55a00] transition-colors">Request Enterprise Quote →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
