import Image from "next/image";

export default function Logo({ variant = "header" }: { variant?: "header" | "footer" }) {
  if (variant === "footer") {
    return (
      <Image
        src="/logo-footer-cropped.png"
        alt="Seehra Transport"
        width={1699}
        height={664}
        className="object-contain"
        style={{ height: "60px", width: "auto" }}
        priority
      />
    );
  }
  return (
    <Image
      src="/logo-cropped.png"
      alt="Seehra Transport"
      width={1596}
      height={614}
      className="object-contain"
      style={{ height: "45px", width: "auto" }}
      priority
    />
  );
}
