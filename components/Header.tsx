"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/recruitment-portal", label: "Recruitment" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <div className="bg-[#f7680b] text-white text-center py-2.5 px-4 text-xs sm:text-sm font-medium leading-snug">
        Looking to track your order?{" "}
        <Link href="/track" className="underline font-bold hover:no-underline">Track your shipment here →</Link>
      </div>

      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between overflow-visible">
          <Link href="/" aria-label="Seehra Transport home"><Logo /></Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={`text-base font-medium transition-colors ${pathname === link.href ? "text-[#f7680b]" : "text-gray-600 hover:text-gray-900"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact"
            style={{ fontFamily: '"Geovano Sans", ui-sans-serif, system-ui, sans-serif' }}
            className="hidden lg:inline-flex items-center gap-2.5 bg-[#f7680b] text-white px-7 py-3 rounded-full text-base font-bold tracking-wide hover:bg-[#e55a00] transition-colors whitespace-nowrap shadow-sm hover:shadow-md">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Talk to us
          </Link>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <div className={`w-5 h-0.5 bg-gray-800 transition-all mb-1.5 origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-800 transition-all mb-1.5 ${mobileOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-800 transition-all origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
            <nav className="flex flex-col px-5 py-3">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3.5 px-2 text-base font-semibold border-b border-gray-50 ${pathname === link.href ? "text-[#f7680b]" : "text-gray-800"}`}>
                  {link.label}
                </Link>
              ))}
              <Link href="/contact"
                onClick={() => setMobileOpen(false)}
                style={{ fontFamily: '"Geovano Sans", ui-sans-serif, system-ui, sans-serif' }}
                className="mt-4 mb-1 bg-[#f7680b] text-white px-5 py-3.5 rounded-full text-base font-bold tracking-wide text-center inline-flex items-center justify-center gap-2.5">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                Talk to us
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
