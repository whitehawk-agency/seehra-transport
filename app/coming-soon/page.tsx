export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80')" }} />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 max-w-3xl w-full">

        {/* SVG Logo - no background, always transparent */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3">
            <svg width="70" height="58" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="44" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#e62b1e"/>
                  <stop offset="100%" stopColor="#f7a50b"/>
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="44" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f7680b"/>
                  <stop offset="100%" stopColor="#f7b50b"/>
                </linearGradient>
              </defs>
              <path d="M0 3 L19 18 L0 33 L7 33 L26 18 L7 3 Z" fill="url(#g1)"/>
              <path d="M16 3 L35 18 L16 33 L23 33 L44 18 L23 3 Z" fill="url(#g2)" opacity="0.9"/>
            </svg>
            <div className="text-left leading-tight">
              <div className="text-white font-extrabold tracking-wide" style={{ fontSize: "2rem" }}>SEEHRA</div>
              <div className="text-white font-extrabold tracking-widest" style={{ fontSize: "1.5rem", marginTop: "-4px" }}>TRANSPORT</div>
            </div>
          </div>
        </div>

        <h1 className="font-extrabold text-white mb-6 whitespace-nowrap" style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 1 }}>
          COMING{" "}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#e62b1e,#f7a50b)" }}>SOON</span>
        </h1>

        <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg mx-auto">We are working on something great. Seehra Transport is launching a brand new experience — stay tuned.</p>

        <div className="w-16 h-1 mx-auto mb-8 rounded-full" style={{ background: "linear-gradient(90deg,#e62b1e,#f7680b)" }} />

        <p className="text-white/40 text-sm mb-4">In the meantime, get in touch:</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a href="mailto:info@seehratransport.com" className="text-white/70 hover:text-[#f7680b] transition-colors text-sm font-semibold border border-white/10 px-6 py-3 rounded-xl hover:border-[#f7680b]">info@seehratransport.com</a>
          <a href="tel:07990702743" className="text-white/70 hover:text-[#f7680b] transition-colors text-sm font-semibold border border-white/10 px-6 py-3 rounded-xl hover:border-[#f7680b]">07990 702743</a>
        </div>
        <a href="/" className="text-white/25 hover:text-white/50 text-xs transition-colors">← Back to main site</a>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-white/15 text-xs">© Seehra Transport Limited 2025 · Company No. 09462678</p>
      </div>
    </div>
  );
}
