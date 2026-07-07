"use client";
import Link from "next/link";

export default function CareersPage() {
  const indeedCompanyUrl = "https://uk.indeed.com/cmp/Seehra-Transport-Limited";
  const linkedinCompanyUrl = "https://www.linkedin.com/company/seehratransport/";

  return (
    <div className="min-h-screen" style={{ background: "#f3f2ef" }}>

      {/* Hero banner */}
      <div className="relative py-14 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/cv-handover.jpg')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(20,20,20,0.72) 100%)" }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#f7680b] text-xs font-bold tracking-widest uppercase mb-3">Seehra Transport Careers</p>
            <h1 className="text-[2.5rem] leading-[1.1] sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Build your career<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#e62b1e,#f7a50b)" }}>
                in logistics
              </span>
            </h1>
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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* Coming soon */}
      <div id="jobs" className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-14 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Our vacancies are coming soon</h2>
          <p className="text-gray-500 leading-relaxed mb-8 max-w-md mx-auto">
            We're updating our careers page. In the meantime, you can view and apply for all our current vacancies directly on Indeed and LinkedIn.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a href={indeedCompanyUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white text-sm font-bold px-7 py-3.5 rounded-full transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}>
              View jobs on Indeed →
            </a>
            <a href={linkedinCompanyUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-bold px-7 py-3.5 rounded-full hover:border-[#f7680b] hover:text-[#f7680b] transition-colors">
              View jobs on LinkedIn →
            </a>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <p className="text-gray-500 text-sm mb-3">Prefer to get in touch directly?</p>
            <Link href="/contact" className="text-[#f7680b] font-bold text-sm hover:underline">Contact our team →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
