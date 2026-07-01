"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("seehra-cookie-consent");
      if (!consent) {
        setShow(true);
        requestAnimationFrame(() => setVisible(true));
      }
    } catch {
      setShow(true);
      requestAnimationFrame(() => setVisible(true));
    }

    // Allow the footer "Cookie Settings" link to re-open the popup
    function reopen() {
      setShow(true);
      requestAnimationFrame(() => setVisible(true));
    }
    window.addEventListener("seehra:open-cookies", reopen);
    return () => window.removeEventListener("seehra:open-cookies", reopen);
  }, []);

  function setConsent(value: "accepted" | "rejected") {
    try {
      localStorage.setItem("seehra-cookie-consent", value);
    } catch {}
    setVisible(false);
    setTimeout(() => setShow(false), 250);
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* Popup card */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-7 transition-all duration-300"
        style={{
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z" />
            <path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01" />
          </svg>
        </div>

        <h2 className="text-lg font-extrabold text-gray-900 mb-2">We value your privacy</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          We use essential cookies to make our site work. With your consent, we may also use
          analytics and marketing cookies to improve your experience. You can change your choice at
          any time. Read our{" "}
          <Link href="/cookies" className="text-[#f7680b] font-semibold underline">
            Cookie Policy
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setConsent("accepted")}
            className="flex-1 text-white text-sm font-bold px-5 py-3 rounded-full transition-all hover:opacity-90 order-1 sm:order-2"
            style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}
          >
            Accept All
          </button>
          <button
            onClick={() => setConsent("rejected")}
            className="flex-1 border border-gray-200 text-gray-700 hover:border-gray-400 text-sm font-bold px-5 py-3 rounded-full transition-colors order-2 sm:order-1"
          >
            Reject Non-Essential
          </button>
        </div>
      </div>
    </div>
  );
}
