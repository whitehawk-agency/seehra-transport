"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/recruitment", label: "Recruitment" },
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
      <div className="bg-[#f7680b] text-white text-center py-2.5 px-4 text-sm font-medium">
        Looking to track your order?{" "}
        <Link href="/track" className="underline font-bold hover:no-underline">Track your shipment here →</Link>
      </div>

      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" aria-label="Seehra Transport home"><Logo /></Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={`text-sm font-medium transition-colors ${pathname === link.href ? "text-[#f7680b]" : "text-gray-600 hover:text-gray-900"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact"
            className="hidden lg:block bg-[#f7680b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#e55a00] transition-colors whitespace-nowrap">
            Get in Touch Today
          </Link>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <div className={`w-5 h-0.5 bg-gray-800 transition-all mb-1.5 origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-800 transition-all mb-1.5 ${mobileOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-800 transition-all origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className={`block py-2.5 text-sm font-medium ${pathname === link.href ? "text-[#f7680b]" : "text-gray-700"}`}>
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="mt-3 bg-[#f7680b] text-white px-5 py-3 rounded-lg text-sm font-semibold text-center">
                Get in Touch Today
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
