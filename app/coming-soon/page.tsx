import Image from "next/image";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden" style={{ background: "#0a0a0a" }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(247,104,11,1) 1px,transparent 1px),linear-gradient(90deg,rgba(247,104,11,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(230,43,30,0.08) 0%, transparent 70%)" }} />
      <div className="relative z-10 max-w-2xl w-full">
        <div className="flex justify-center mb-12">
          <Image src="/logo-footer-cropped.png" alt="Seehra Transport" width={340} height={133} style={{ height: "80px", width: "auto" }} priority />
        </div>
        <h1 className="font-extrabold text-white mb-5" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", lineHeight: 1.05 }}>
          COMING<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#e62b1e,#f7a50b)" }}>SOON</span>
        </h1>
        <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg mx-auto">We are working on something great. Stay tuned.</p>
        <div className="w-16 h-1 mx-auto mb-10 rounded-full" style={{ background: "linear-gradient(90deg,#e62b1e,#f7680b)" }} />
        <p className="text-white/40 text-sm mb-4">In the meantime, get in touch:</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <a href="mailto:info@seehratransport.com" className="text-white/70 hover:text-[#f7680b] transition-colors text-sm font-semibold border border-white/10 px-6 py-3 rounded-xl hover:border-[#f7680b]">info@seehratransport.com</a>
          <a href="tel:07990702743" className="text-white/70 hover:text-[#f7680b] transition-colors text-sm font-semibold border border-white/10 px-6 py-3 rounded-xl hover:border-[#f7680b]">07990 702743</a>
        </div>
        <Link href="/" className="text-white/25 hover:text-white/50 text-xs transition-colors">Back to main site</Link>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center"><p className="text-white/15 text-xs">© Seehra Transport Limited 2025 · Company No. 09462678</p></div>
    </div>
  );
}
