"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("seehra-cookie-consent");
      if (!consent) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  function setConsent(value: "accepted" | "rejected") {
    try {
      localStorage.setItem("seehra-cookie-consent", value);
    } catch {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-white text-sm font-bold mb-1">We value your privacy</p>
          <p className="text-white/60 text-xs leading-relaxed">
            We use essential cookies to make our site work. With your consent, we may also use analytics and marketing cookies to improve your experience. See our{" "}
            <Link href="/cookies" className="text-[#f7680b] underline">Cookie Policy</Link>.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setConsent("rejected")}
            className="flex-1 sm:flex-none border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-xs font-bold px-5 py-2.5 rounded-lg transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => setConsent("accepted")}
            className="flex-1 sm:flex-none text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
