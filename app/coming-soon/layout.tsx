import Image from "next/image";

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-center">
        <Image src="/logo-cropped.png" alt="Seehra Transport" width={160} height={62} style={{ height: "45px", width: "auto" }} priority />
      </header>
      <main>{children}</main>
      <footer className="bg-[#0a0a0a] py-6 text-center">
        <Image src="/logo-footer-cropped.png" alt="Seehra Transport" width={200} height={77} style={{ height: "60px", width: "auto" }} />
        <p className="text-white/20 text-xs mt-4">© Seehra Transport Limited 2025 · Company No. 09462678</p>
      </footer>
    </>
  );
}
