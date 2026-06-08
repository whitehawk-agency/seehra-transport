"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Job } from "@/lib/jobs";

export default function RecruitmentPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    fetch("/api/jobs")
      .then(r => r.json())
      .then(data => {
        setJobs(data.filter((j: Job) => j.status === "active"));
        setLoading(false);
      });
  }, []);

  const types = ["All", ...Array.from(new Set(jobs.map(j => j.type)))];
  const filtered = jobs.filter(j => {
    const q = search.toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q);
    const matchType = filterType === "All" || j.type === filterType;
    return matchSearch && matchType;
  });

  const inp = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f7680b] transition-colors";

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-2">Join Our Team</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Become part of a<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage:"linear-gradient(135deg,#e62b1e,#f7a50b)" }}>
              professional driving team
            </span>
          </h1>
        </div>
      </section>

      {/* Why Drive With Us */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3 text-center">Why Drive With Us</p>
          <h2 className="text-3xl font-extrabold text-center mb-10">The benefits of joining Seehra Transport</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { title:"Competitive Pay", desc:"Industry-leading rates. Fuel paid on top of your day rate. Weekly payments, reliable every week." },
              { title:"Flexible Schedules", desc:"Full-time, part-time, and flexible options. Choose which days you want to work." },
              { title:"Modern Fleet", desc:"Well-maintained vehicles. Low-deposit rental vans available directly from us." },
              { title:"Full Support", desc:"Training fully paid. DBS check arranged and paid for. Drugs & alcohol test — we pay." },
            ].map(b => (
              <div key={b.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                <h3 className="font-bold mb-2 text-base">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
            <div>
              <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3">Requirements</p>
              <h2 className="text-3xl font-extrabold mb-7">What we're looking for</h2>
              <div className="flex flex-col gap-3">
                {[
                  { title:"Valid UK Driving Licence", desc:"Must be held over 1 year with no more than 6 penalty points." },
                  { title:"Smartphone", desc:"Required for our route app and real-time delivery management." },
                  { title:"DBS Check", desc:"Required. We help you obtain this and cover the cost." },
                  { title:"Drugs & Alcohol Test", desc:"Required before starting. We arrange and pay for this." },
                  { title:"East & West Midlands Routes", desc:"Currently recruiting for routes in both regions." },
                  { title:"Reliable & Customer-Focused", desc:"Punctual, hard-working and customer conscious." },
                ].map(r => (
                  <div key={r.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <div className="font-bold text-sm mb-0.5">{r.title}</div>
                      <div className="text-gray-500 text-sm">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0a0a0a] rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">What you get</h3>
              {[
                "Weekly payments — every week",
                "Training fully paid for",
                "Fuel paid on top of day rate",
                "Choose your working days",
                "DBS check — we help arrange & pay",
                "Drugs & alcohol test — we pay",
                "Bring your own van or rent from us",
                "Full support from our logistics team",
              ].map(i => (
                <div key={i} className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0">
                  <span className="text-[#f7680b] font-bold text-sm">✓</span>
                  <span className="text-white/60 text-sm">{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE JOB LISTINGS ── */}
      <section className="bg-gray-50 py-14 sm:py-20 px-4 sm:px-6" id="jobs">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3">Open Positions</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <h2 className="text-3xl font-extrabold">Current Vacancies</h2>
            <p className="text-gray-500 text-sm">
              {loading ? "Loading..." : `${filtered.length} position${filtered.length !== 1 ? "s" : ""} available`}
            </p>
          </div>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search by title or location..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#f7680b] transition-colors"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#f7680b] transition-colors cursor-pointer"
            >
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Job cards */}
          {loading ? (
            <div className="flex flex-col gap-3">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse h-32" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <h3 className="font-bold text-lg mb-2">No positions found</h3>
              <p className="text-gray-500 text-sm mb-4">Try adjusting your search or check back soon for new openings.</p>
              <Link href="/contact" className="inline-block bg-[#f7680b] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#e55a00] transition-colors">
                Send Speculative Application →
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map(job => (
                <Link
                  key={job.id}
                  href={`/recruitment-portal/${job.id}`}
                  className="group bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 hover:border-[#f7680b] hover:shadow-md transition-all block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-[#f7680b] transition-colors mb-1">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                          {job.type}
                        </span>
                        <span className="font-semibold text-[#f7680b]">{job.salary}</span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{job.description}</p>
                    </div>
                    <div className="hidden sm:block flex-shrink-0">
                      <span
                        className="text-white text-xs font-bold px-5 py-2.5 rounded-xl whitespace-nowrap"
                        style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}
                      >
                        Apply Now
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-3">Don't see the right role?</p>
            <Link href="/contact" className="inline-block border border-gray-200 hover:border-[#f7680b] text-gray-700 hover:text-[#f7680b] px-8 py-3 rounded-xl font-semibold text-sm transition-all">
              Send Speculative Application →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
