"use client";

export default function CookieSettingsLink() {
  function openCookieSettings() {
    try {
      // Clear any saved choice so the popup shows the options fresh
      localStorage.removeItem("seehra-cookie-consent");
    } catch {}
    window.dispatchEvent(new Event("seehra:open-cookies"));
  }

  return (
    <button
      onClick={openCookieSettings}
      className="text-xs text-white/25 hover:text-[#f7680b] transition-colors"
    >
      Cookie Settings
    </button>
  );
}
