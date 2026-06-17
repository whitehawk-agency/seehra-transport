"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Job } from "@/lib/jobs";

export default function RecruitmentPortalPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");

  useEffect(() => {
    fetch("/api/jobs")
      .then(r => r.json())
      .then(data => {
        setJobs(data.filter((j: Job) => j.status === "active"));
        setLoading(false);
      });
  }, []);

  const types = ["All", ...Array.from(new Set(jobs.map(j => j.type)))];
  const locations = ["All", ...Array.from(new Set(jobs.map(j => j.location)))];

  const filtered = jobs.filter(j => {
    const q = search.toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q) || j.description.toLowerCase().includes(q);
    const matchType = filterType === "All" || j.type === filterType;
    const matchLoc = filterLocation === "All" || j.location === filterLocation;
    return matchSearch && matchType && matchLoc;
  });

  const indeedCompanyUrl = "https://uk.indeed.com/cmp/Seehra-Transport/jobs";
  const linkedinCompanyUrl = "https://www.linkedin.com/company/seehra-transport/jobs";

  return (
    <div className="min-h-screen" style={{ background: "#f3f2ef" }}>



      {/* Hero banner */}
      <div style={{ background: "linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%)" }} className="py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3">Seehra Transport Careers</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Build your career<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#e62b1e,#f7a50b)" }}>
                in logistics
              </span>
            </h1>
            {/* Search bar in hero */}
            <div className="bg-white rounded-xl flex gap-2 p-1.5 mb-5 max-w-lg">
              <input
                type="text"
                placeholder="Search jobs or location..."
                className="flex-1 px-4 py-2 text-sm text-gray-900 focus:outline-none bg-transparent"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="bg-[#f7680b] text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-[#e55a00] transition-colors whitespace-nowrap">
                Search
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#jobs" className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors">
                View Open Roles
              </a>
              <Link href="/about" className="border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm hover:border-white/50 transition-colors">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Also on */}
      <div className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
          <span className="font-semibold text-gray-700">Also find our jobs on:</span>
          <a href={indeedCompanyUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#003A9B] text-white px-4 py-1.5 rounded-full font-bold hover:opacity-90 transition-opacity text-xs">
            <svg width="12" height="12" viewBox="0 0 32 32" fill="white"><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 6a4 4 0 110 8 4 4 0 010-8zm0 20c-4.418 0-8-1.79-8-4v-1c0-2.21 3.582-4 8-4s8 1.79 8 4v1c0 2.21-3.582 4-8 4z"/></svg>
            Indeed
          </a>
          <a href={linkedinCompanyUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#0A66C2] text-white px-4 py-1.5 rounded-full font-bold hover:opacity-90 transition-opacity text-xs">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* Jobs section */}
      <div id="jobs" className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">

          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-24">
              <h3 className="font-bold text-sm mb-4 text-gray-900">Filter Jobs</h3>

              <div className="mb-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Job Type</p>
                <div className="flex flex-col gap-1.5">
                  {types.map(t => (
                    <button key={t} onClick={() => setFilterType(t)}
                      className={`text-left px-3 py-2 rounded-xl text-sm transition-all font-medium ${filterType === t ? "text-white" : "text-gray-600 hover:bg-gray-50"}`}
                      style={filterType === t ? { background: "linear-gradient(135deg,#e62b1e,#f7680b)" } : {}}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location</p>
                <div className="flex flex-col gap-1.5">
                  {locations.map(l => (
                    <button key={l} onClick={() => setFilterLocation(l)}
                      className={`text-left px-3 py-2 rounded-xl text-sm transition-all font-medium ${filterLocation === l ? "text-white" : "text-gray-600 hover:bg-gray-50"}`}
                      style={filterLocation === l ? { background: "linear-gradient(135deg,#e62b1e,#f7680b)" } : {}}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {(filterType !== "All" || filterLocation !== "All" || search) && (
                <button onClick={() => { setFilterType("All"); setFilterLocation("All"); setSearch(""); }}
                  className="w-full text-center text-xs text-[#f7680b] font-semibold hover:underline mt-2">
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Job listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 font-medium">
                {loading ? "Loading jobs..." : `${filtered.length} job${filtered.length !== 1 ? "s" : ""} available`}
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col gap-3">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
                    <div className="h-5 bg-gray-100 rounded w-1/2 mb-3" />
                    <div className="h-3 bg-gray-100 rounded w-1/3 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">No jobs found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map(job => (
                  <Link key={job.id} href={`/recruitment-portal/${job.id}`}
                    className="group bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 hover:border-[#f7680b] hover:shadow-md transition-all block">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Company logo + name */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center bg-gray-50 flex-shrink-0 overflow-hidden">
                            <Image src="/logo-cropped.png" alt="ST" width={40} height={40}
                              className="object-contain p-1" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-500">Seehra Transport</p>
                            <p className="text-xs text-gray-400">{job.location}</p>
                          </div>
                        </div>

                        <h2 className="text-base sm:text-lg font-extrabold text-gray-900 group-hover:text-[#f7680b] transition-colors mb-1">{job.title}</h2>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">{job.type}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">{job.department}</span>
                          <span className="text-xs bg-orange-50 text-[#f7680b] px-3 py-1 rounded-full font-bold">{job.salary}</span>
                        </div>

                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{job.description}</p>
                      </div>

                      <div className="hidden sm:flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="text-white text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap"
                          style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}>
                          Apply Now
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(job.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Bottom CTA */}
            {!loading && (
              <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-7">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-extrabold text-gray-900 mb-1">Don't see the right role?</h3>
                    <p className="text-gray-500 text-sm">Send us your details and we'll reach out when the right opportunity comes up.</p>
                  </div>
                  <Link href="/contact"
                    className="text-white text-sm font-bold px-6 py-3 rounded-full whitespace-nowrap transition-all hover:opacity-90 flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}>
                    Get in Touch
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
