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
            { text: "10+ Years Experience", accent: false },
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
            <a href="tel:07990702743" className="text-sm text-white/50 hover:text-[#f7680b] transition-colors"> 07990 702743</a>
            <a href="tel:07512837585" className="text-sm text-white/50 hover:text-[#f7680b] transition-colors"> 07512 837585</a>
            <a href="mailto:info@seehratransport.com" className="text-sm text-white/50 hover:text-[#f7680b] transition-colors"> info@seehratransport.com</a>
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
              { href: "/recruitment-portal", label: "Careers" },
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
          <div className="mt-5 flex items-center gap-3">
            <a href="https://www.instagram.com/seehratransport" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#f7680b] hover:bg-[#f7680b] transition-all group">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-white transition-colors">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/seehratransport" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#f7680b] hover:bg-[#f7680b] transition-all group">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/50 group-hover:text-white transition-colors">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/seehra-transport" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#f7680b] hover:bg-[#f7680b] transition-all group">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/50 group-hover:text-white transition-colors">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/25">
            © Seehra Transport Limited, {new Date().getFullYear()}. All rights reserved. Registered in England & Wales. Company No. 09462678.
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
