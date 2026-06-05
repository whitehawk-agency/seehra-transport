import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="overflow-hidden border-b border-white/10 py-5">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(4).fill([
            { text: "Multi-Drop Delivery", accent: true },
            { text: "Same Day Courier", accent: false },
            { text: "Last-Mile Logistics", accent: true },
            { text: "Fully Insured", accent: false },
            { text: "GPS Tracked", accent: true },
            { text: "15+ Years Experience", accent: false },
            { text: "On Time. Every Time.", accent: true },
            { text: "UK Nationwide", accent: false },
            { text: "West Midlands Based", accent: true },
            { text: "From £4.99", accent: false },
          ]).flat().map((item, i) => (
            <span key={i} className={`mx-8 text-xs font-bold tracking-widest uppercase ${item.accent ? "text-[#f7680b]" : "text-white/30"}`}>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="mb-6"><Logo variant="footer" /></div>
          <p className="text-sm text-white/40 leading-relaxed mb-6">
            Multi-Drop & Last-Mile Logistics across the UK. Professional delivery solutions — on time, every time.
          </p>
          <div className="flex flex-col gap-2">
            <a href="tel:07990702743" className="text-sm text-white/50 hover:text-[#f7680b] transition-colors">📞 07990 702743</a>
            <a href="tel:07512837585" className="text-sm text-white/50 hover:text-[#f7680b] transition-colors">📞 07512 837585</a>
            <a href="mailto:info@seehratransport.com" className="text-sm text-white/50 hover:text-[#f7680b] transition-colors">✉️ info@seehratransport.com</a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-5">Our Services</h4>
          <ul className="flex flex-col gap-3">
            {[
              { href: "/services#multi-drop", label: "Multi-Drop Delivery" },
              { href: "/services#last-mile", label: "Last-Mile Logistics" },
              { href: "/services#flexible", label: "Flexible Solutions" },
              { href: "/services", label: "Same-Day Courier" },
              { href: "/services", label: "Next-Day Express" },
              { href: "/services", label: "Standard Delivery" },
            ].map(s => (
              <li key={s.label}>
                <Link href={s.href} className="text-sm text-white/55 hover:text-[#f7680b] transition-colors">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-5">Company</h4>
          <ul className="flex flex-col gap-3">
            {[
              { href: "/about", label: "About Us" },
              { href: "/about", label: "Our Values" },
              { href: "/recruitment", label: "Careers" },
              { href: "/track", label: "Track a Shipment" },
              { href: "/contact", label: "Contact Us" },
            ].map(s => (
              <li key={s.label}>
                <Link href={s.href} className="text-sm text-white/55 hover:text-[#f7680b] transition-colors">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-5">Head Office</h4>
          <address className="not-italic text-sm text-white/50 leading-relaxed mb-4">
            Unit 5 & 6 Park Lane Industrial Estate<br />
            Park Lane, Oldbury<br />
            West Midlands, B69 4JX<br />
            United Kingdom
          </address>
          <p className="text-sm text-white/50">Mon–Fri: 9:00 AM – 5:00 PM<br />Sat–Sun: Closed</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#f7680b] animate-pulse" />
            <span className="text-xs text-white/30">Company No. 09462678</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/25">
            © Seehra Transport Limited, 2025. All rights reserved. Registered in England & Wales. Company No. 09462678.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-xs text-white/25 hover:text-[#f7680b] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/25 hover:text-[#f7680b] transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-xs text-white/25 hover:text-[#f7680b] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
