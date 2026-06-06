"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Job } from "@/lib/jobs";

const DEPT_COLORS: Record<string, string> = {
  Operations: "bg-blue-50 text-blue-700",
  Management: "bg-purple-50 text-purple-700",
  Admin: "bg-green-50 text-green-700",
};

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");

  useEffect(() => {
    fetch("/api/jobs").then(r => r.json()).then(data => {
      setJobs(data.filter((j: Job) => j.status === "active"));
      setLoading(false);
    });
  }, []);

  const types = ["All", ...Array.from(new Set(jobs.map(j => j.type)))];
  const locations = ["All", ...Array.from(new Set(jobs.map(j => j.location)))];

  const filtered = jobs.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.description.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || j.type === filterType;
    const matchLoc = filterLocation === "All" || j.location === filterLocation;
    return matchSearch && matchType && matchLoc;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#e62b1e 0%,#f7680b 100%)" }} className="py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Image src="/logo-footer-cropped.png" alt="Seehra Transport" width={300} height={117} className="object-contain" style={{ height:"70px", width:"auto" }} />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">Join Our Team</h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Build your career with one of the UK's fastest-growing logistics companies. We're hiring across the Midlands.
          </p>
          {/* Search bar */}
          <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto shadow-xl">
            <input
              type="text"
              placeholder="Search jobs, locations..."
              className="flex-1 px-4 py-3 text-sm text-gray-900 focus:outline-none rounded-xl"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="bg-[#f7680b] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#e55a00] transition-colors">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Also on */}
      <div className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
          <span className="font-semibold">Also find us on:</span>
          <a href="https://www.indeed.co.uk/cmp/Seehra-Transport" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#003A9B] text-white px-4 py-1.5 rounded-full font-bold hover:opacity-90 transition-opacity">
            <svg width="14" height="14" viewBox="0 0 32 32" fill="white"><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 6a4 4 0 110 8 4 4 0 010-8zm0 20c-4.418 0-8-1.79-8-4v-1c0-2.21 3.582-4 8-4s8 1.79 8 4v1c0 2.21-3.582 4-8 4z"/></svg>
            Indeed
          </a>
          <a href="https://www.linkedin.com/company/seehra-transport" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#0A66C2] text-white px-4 py-1.5 rounded-full font-bold hover:opacity-90 transition-opacity">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div>
            <select value={filterType} onChange={e => setFilterType(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#f7680b] cursor-pointer">
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <select value={filterLocation} onChange={e => setFilterLocation(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#f7680b] cursor-pointer">
              {locations.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          {(filterType !== "All" || filterLocation !== "All" || search) && (
            <button onClick={() => { setFilterType("All"); setFilterLocation("All"); setSearch(""); }}
              className="text-[#f7680b] text-sm font-semibold hover:underline px-2">
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-gray-500 text-sm mb-4">
          {loading ? "Loading..." : `${filtered.length} job${filtered.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Job cards — Indeed style */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse h-40" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
            <h3 className="font-bold text-lg mb-2">No jobs found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(job => (
              <Link key={job.id} href={`/careers/${job.id}`}
                className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:border-orange-200 hover:shadow-md transition-all group block">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#f7680b] transition-colors">{job.title}</h2>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${DEPT_COLORS[job.department] || "bg-gray-100 text-gray-600"}`}>
                        {job.department}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Seehra Transport</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"> {job.location}</span>
                      <span className="flex items-center gap-1"> {job.type}</span>
                      <span className="flex items-center gap-1"> {job.salary}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{job.description}</p>
                  </div>
                  <div className="hidden sm:flex flex-col gap-2 flex-shrink-0">
                    <span className="bg-[#f7680b] text-white text-xs font-bold px-4 py-2 rounded-xl whitespace-nowrap">
                      Apply Now
                    </span>
                    <span className="text-xs text-gray-400 text-center">
                      {new Date(job.createdAt).toLocaleDateString("en-GB", { day:"numeric", month:"short" })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-7 text-center">
          <h3 className="font-bold text-lg mb-2">Don't see the right role?</h3>
          <p className="text-gray-500 text-sm mb-4">Send us your CV and we'll keep you in mind for future opportunities.</p>
          <Link href="/contact" className="inline-block bg-[#f7680b] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#e55a00] transition-colors">
            Send Speculative Application →
          </Link>
        </div>
      </div>
    </div>
  );
}
