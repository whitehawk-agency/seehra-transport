"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Job } from "@/lib/jobs";

export default function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", phone:"", address:"", licenceType:"", experience:"", availability:"", coverLetter:"", source:"website" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  useEffect(() => {
    fetch("/api/jobs").then(r => r.json()).then((jobs: Job[]) => {
      setJob(jobs.find(j => j.id === slug) || null);
      setLoading(false);
    });
  }, [slug]);

  async function apply(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const fd = new FormData();
      Object.entries({ ...form, jobId: job?.id || "", jobTitle: job?.title || "" }).forEach(([k,v]) => fd.append(k, String(v)));
      if (cvFile) fd.append("cv", cvFile);
      const res = await fetch("/api/applications", { method: "POST", body: fd });
      setStatus(res.ok ? "sent" : "error");
    } catch { setStatus("error"); }
  }

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f7680b] transition-colors bg-white";

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f3f2ef" }}>
      <div className="text-gray-400 text-sm">Loading...</div>
    </div>
  );

  if (!job) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "#f3f2ef" }}>
      <h2 className="text-2xl font-bold">Job not found</h2>
      <Link href="/careers" className="text-[#f7680b] font-semibold hover:underline">Back to all jobs</Link>
    </div>
  );

  const indeedSearchUrl = "https://uk.indeed.com/cmp/Seehra-Transport-Limited";
  const linkedinSearchUrl = "https://www.linkedin.com/seehratransport";

  return (
    <div className="min-h-screen" style={{ background: "#f3f2ef" }}>
      {/* Breadcrumb - sits under main site header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-11 flex items-center justify-between">
          <Link href="/careers" className="flex items-center gap-1.5 text-gray-500 hover:text-[#f7680b] text-sm font-medium transition-colors">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            All Jobs
          </Link>
          <button onClick={() => setShowForm(true)}
            className="text-white text-xs font-bold px-5 py-2 rounded-full hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}>
            Apply Now
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Job header card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image src="/logo-cropped.png" alt="Seehra Transport" width={56} height={56} className="object-contain p-1.5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-0.5">{job.title}</h1>
                  <p className="text-[#f7680b] font-bold text-sm">Seehra Transport</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6 text-sm text-gray-600">
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                  {job.type}
                </span>
                <span className="flex items-center gap-1.5 bg-orange-50 text-[#f7680b] px-3 py-1.5 rounded-full font-semibold">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  {job.salary}
                </span>
              </div>

              <button onClick={() => setShowForm(true)}
                className="w-full sm:w-auto text-white font-bold px-10 py-4 rounded-xl hover:opacity-90 transition-all text-base"
                style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}>
                Apply for this role
              </button>
            </div>

            {/* Job content */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h2 className="text-lg font-extrabold mb-4">About this role</h2>
              <p className="text-gray-600 leading-relaxed text-sm mb-7">{job.description}</p>

              {job.responsibilities.length > 0 && (
                <div className="mb-7">
                  <h3 className="font-extrabold text-base mb-3">Your Responsibilities</h3>
                  <ul className="flex flex-col gap-2">
                    {job.responsibilities.map(r => (
                      <li key={r} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#f7680b" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.requirements.length > 0 && (
                <div className="mb-7">
                  <h3 className="font-extrabold text-base mb-3">Requirements</h3>
                  <ul className="flex flex-col gap-2">
                    {job.requirements.map(r => (
                      <li key={r} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits.length > 0 && (
                <div>
                  <h3 className="font-extrabold text-base mb-3">What We Offer</h3>
                  <ul className="flex flex-col gap-2">
                    {job.benefits.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Apply card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-24">
              <h3 className="font-extrabold text-base mb-4">Apply for this role</h3>
              <button onClick={() => setShowForm(true)}
                className="w-full text-white py-3.5 rounded-xl font-bold text-sm mb-3 hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}>
                Apply on Seehra Transport
              </button>
              <p className="text-xs text-gray-400 text-center mb-5">Goes directly to our hiring team</p>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Also apply via</p>
                <div className="flex flex-col gap-2">
                  <a href={job.indeedUrl || indeedSearchUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#003A9B] hover:text-[#003A9B] transition-colors">
                    <div className="w-6 h-6 bg-[#003A9B] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 32 32" fill="white"><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 6a4 4 0 110 8 4 4 0 010-8zm0 20c-4.418 0-8-1.79-8-4v-1c0-2.21 3.582-4 8-4s8 1.79 8 4v1c0 2.21-3.582 4-8 4z"/></svg>
                    </div>
                    View on Indeed
                  </a>
                  <a href={job.linkedinUrl || linkedinSearchUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">
                    <div className="w-6 h-6 bg-[#0A66C2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </div>
                    View on LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Company info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <Image src="/logo-cropped.png" alt="Seehra Transport" width={80} height={31} className="object-contain" style={{ height: "28px", width: "auto" }} />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">UK-based logistics specialists. 15,000+ parcels delivered weekly across the UK from our Oldbury, West Midlands HQ.</p>
              <div className="flex flex-col gap-1 text-xs text-gray-400 mb-3">
                <span>West Midlands, UK</span>
                <span>Logistics & Transport</span>
                <span>10+ years in operation</span>
              </div>
              <Link href="/about" className="text-[#f7680b] text-xs font-semibold hover:underline">Learn more about us →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Application modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-lg">Apply for {job.title}</h2>
                <p className="text-gray-400 text-xs">Seehra Transport · {job.location}</p>
              </div>
              <button onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-500 transition-colors">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="p-6">
              {status === "sent" ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3 className="text-xl font-extrabold mb-2">Application Submitted!</h3>
                  <p className="text-gray-500 text-sm mb-6">Thank you for applying to Seehra Transport. Our team will review your application and be in touch shortly.</p>
                  <button onClick={() => { setShowForm(false); setStatus("idle"); }}
                    className="text-[#f7680b] font-semibold text-sm border border-orange-200 px-6 py-2.5 rounded-xl hover:bg-orange-50 transition-colors">
                    Back to job listing
                  </button>
                </div>
              ) : (
                <form onSubmit={apply} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">First Name *</label><input required className={inp} placeholder="John" value={form.firstName} onChange={e=>setForm(p=>({...p,firstName:e.target.value}))} /></div>
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Last Name *</label><input required className={inp} placeholder="Smith" value={form.lastName} onChange={e=>setForm(p=>({...p,lastName:e.target.value}))} /></div>
                  </div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address *</label><input required type="email" className={inp} placeholder="john@email.com" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Phone Number *</label><input required className={inp} placeholder="07700 000000" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Address</label><input className={inp} placeholder="Your address" value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Driving Licence</label>
                    <select className={inp} value={form.licenceType} onChange={e=>setForm(p=>({...p,licenceType:e.target.value}))}>
                      <option value="">Select licence type...</option>
                      <option>Category B (Car / Small Van)</option>
                      <option>Category C1 (Medium Goods)</option>
                      <option>Category C (Large Goods)</option>
                      <option>Not applicable</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Experience</label>
                      <select className={inp} value={form.experience} onChange={e=>setForm(p=>({...p,experience:e.target.value}))}>
                        <option value="">Select...</option>
                        <option>No experience</option><option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>5+ years</option>
                      </select>
                    </div>
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Availability</label>
                      <select className={inp} value={form.availability} onChange={e=>setForm(p=>({...p,availability:e.target.value}))}>
                        <option value="">Select...</option>
                        <option>Full-time</option><option>Part-time</option><option>Flexible</option>
                      </select>
                    </div>
                  </div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Cover Note</label>
                    <textarea rows={3} placeholder="Tell us why you'd be a great fit for this role..." className={inp + " resize-none"} value={form.coverLetter} onChange={e=>setForm(p=>({...p,coverLetter:e.target.value}))} />
                  </div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Where did you hear about us?</label>
                    <select className={inp} value={form.source} onChange={e=>setForm(p=>({...p,source:e.target.value}))}>
                      <option value="website">Seehra Transport Website</option>
                      <option value="indeed">Indeed</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      Upload CV <span className="text-gray-300 font-normal normal-case">(PDF, Word or image — optional)</span>
                    </label>
                    <label className={`flex items-center gap-3 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition-colors ${cvFile ? "border-[#f7680b] bg-orange-50" : "border-gray-200 hover:border-[#f7680b] hover:bg-orange-50"}`}>
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#f7680b" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        {cvFile ? (
                          <p className="text-sm font-semibold text-[#f7680b] truncate">{cvFile.name}</p>
                        ) : (
                          <p className="text-sm text-gray-400">Click to upload your CV</p>
                        )}
                        <p className="text-xs text-gray-300">PDF, DOC, DOCX up to 5MB</p>
                      </div>
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={e => setCvFile(e.target.files?.[0] || null)} />
                    </label>
                    {cvFile && (
                      <button type="button" onClick={() => setCvFile(null)} className="mt-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors">
                        Remove file
                      </button>
                    )}
                  </div>
                  <button type="submit" disabled={status === "sending"}
                    className="w-full py-4 rounded-xl font-bold text-white text-sm uppercase tracking-wide transition-all hover:opacity-90 disabled:opacity-50 mt-1"
                    style={{ background: "linear-gradient(135deg,#e62b1e,#f7680b)" }}>
                    {status === "sending" ? "Submitting..." : "Submit Application →"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-500 text-xs text-center">Something went wrong. Please email recruitment@seehratransport.com directly.</p>
                  )}
                  <p className="text-gray-400 text-xs text-center">Your application goes directly to our hiring team</p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
