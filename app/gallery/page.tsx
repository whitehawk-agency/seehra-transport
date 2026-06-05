import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Gallery", description: "Photos from Seehra Transport operations across the UK." };
const photos = [
  { url: "https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Multi-drop delivery parcels" },
  { url: "https://images.pexels.com/photos/4391478/pexels-photo-4391478.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Driver recruitment" },
  { url: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Delivery vans fleet" },
  { url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80", alt: "Warehouse operations" },
  { url: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80", alt: "Delivery fleet on the road" },
  { url: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Parcel sorting" },
];
export default function GalleryPage() {
  return (
    <>
      <section className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-4">Gallery</p>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl">Our operations<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage:"linear-gradient(135deg,#e62b1e,#f7a50b)" }}>in action</span></h1>
        </div>
      </section>
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((p,i) => (
              <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? "md:col-span-2" : ""}`}>
                <img src={p.url} alt={p.alt} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-6">Want to see more? Get in touch or follow us on social media.</p>
            <Link href="/contact" className="inline-block bg-[#f7680b] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#e55a00] transition-colors">Contact Us →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
