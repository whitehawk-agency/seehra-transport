"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Job } from "@/lib/jobs";
import { use } from "react";

export default function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", phone:"", address:"", licenceType:"", experience:"", availability:"", coverLetter:"", source:"website" });
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
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, jobId: job?.id, jobTitle: job?.title }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch { setStatus("error"); }
  }

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f7680b] transition-colors bg-white";

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-400">Loading...</div></div>;
  if (!job) return <div className="min-h-screen bg-gray-50 flex items-center justify-center flex-col gap-4"><h2 className="text-2xl font-bold">Job not found</h2><Link href="/careers" className="text-[#f7680b] underline">Back to all jobs</Link></div>;

  const indeedSearchUrl = `https://uk.indeed.com/jobs?q=${encodeURIComponent(job.title)}&l=${encodeURIComponent(job.location)}`;
  const linkedinSearchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title)}&location=${encodeURIComponent(job.location)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }} className="py-4 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/careers" className="text-white/80 text-sm hover:text-white flex items-center gap-2">
            ← Back to all jobs
          </Link>
          <Image src="/logo-footer-cropped.png" alt="Seehra Transport" width={160} height={62} className="object-contain" style={{ height:"40px", width:"auto" }} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Job header */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-1">{job.title}</h1>
              <p className="text-[#f7680b] font-bold mb-4">Seehra Transport</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1.5"> {job.location}</span>
                <span className="flex items-center gap-1.5"> {job.type}</span>
                <span className="flex items-center gap-1.5"> {job.salary}</span>
                <span className="flex items-center gap-1.5"> {job.department}</span>
              </div>
              <button onClick={() => setShowForm(true)}
                className="w-full sm:w-auto bg-[#f7680b] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#e55a00] transition-colors text-base">
                Apply Now →
              </button>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <h2 className="text-lg font-bold mb-4">About this role</h2>
              <p className="text-gray-600 leading-relaxed text-sm mb-6">{job.description}</p>

              {job.responsibilities.length > 0 && (
                <>
                  <h3 className="font-bold mb-3 text-base">Responsibilities</h3>
                  <ul className="flex flex-col gap-2 mb-6">
                    {job.responsibilities.map(r => (
                      <li key={r} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-[#f7680b] font-bold flex-shrink-0 mt-0.5">→</span>{r}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {job.requirements.length > 0 && (
                <>
                  <h3 className="font-bold mb-3 text-base">Requirements</h3>
                  <ul className="flex flex-col gap-2 mb-6">
                    {job.requirements.map(r => (
                      <li key={r} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-[#f7680b] font-bold flex-shrink-0 mt-0.5"></span>{r}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {job.benefits.length > 0 && (
                <>
                  <h3 className="font-bold mb-3 text-base">What we offer</h3>
                  <ul className="flex flex-col gap-2">
                    {job.benefits.map(b => (
                      <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 font-bold flex-shrink-0 mt-0.5"></span>{b}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Apply card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-6">
              <h3 className="font-bold mb-4">Apply for this role</h3>
              <button onClick={() => setShowForm(true)}
                className="w-full bg-[#f7680b] text-white py-3.5 rounded-xl font-bold hover:bg-[#e55a00] transition-colors mb-3 text-sm">
                Apply on Seehra Transport →
              </button>
              <p className="text-xs text-gray-400 text-center mb-5">Applications go directly to our team</p>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">Also apply via</p>
                <div className="flex flex-col gap-2">
                  <a href={job.indeedUrl || indeedSearchUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#003A9B] hover:text-[#003A9B] transition-colors">
                    <div className="w-5 h-5 bg-[#003A9B] rounded flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 32 32" fill="white"><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 6a4 4 0 110 8 4 4 0 010-8zm0 20c-4.418 0-8-1.79-8-4v-1c0-2.21 3.582-4 8-4s8 1.79 8 4v1c0 2.21-3.582 4-8 4z"/></svg>
                    </div>
                    View on Indeed
                  </a>
                  <a href={job.linkedinUrl || linkedinSearchUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">
                    <div className="w-5 h-5 bg-[#0A66C2] rounded flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </div>
                    View on LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Company card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold mb-3 text-sm">About Seehra Transport</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">West Midlands-based logistics specialists delivering 15,000+ parcels per week across the UK.</p>
              <Link href="/about" className="text-[#f7680b] text-xs font-semibold hover:underline">Learn more →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Application modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={e => { if(e.target === e.currentTarget) setShowForm(false); }}>
          <div className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-lg">Apply for {job.title}</h2>
                <p className="text-gray-500 text-xs">Seehra Transport · {job.location}</p>
              </div>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 font-bold text-lg">×</button>
            </div>

            <div className="p-6">
              {status === "sent" ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4"></div>
                  <h3 className="text-xl font-extrabold mb-2">Application Submitted!</h3>
                  <p className="text-gray-500 text-sm mb-4">Thank you for applying. Our team will review your application and be in touch shortly.</p>
                  <button onClick={() => { setShowForm(false); setStatus("idle"); }} className="text-[#f7680b] font-semibold text-sm underline">Back to job listing</button>
                </div>
              ) : (
                <form onSubmit={apply} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">First Name *</label><input required className={inp} value={form.firstName} onChange={e=>setForm(p=>({...p,firstName:e.target.value}))} /></div>
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Last Name *</label><input required className={inp} value={form.lastName} onChange={e=>setForm(p=>({...p,lastName:e.target.value}))} /></div>
                  </div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email *</label><input required type="email" className={inp} value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone *</label><input required className={inp} value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Address</label><input className={inp} value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Driving Licence</label>
                    <select className={inp} value={form.licenceType} onChange={e=>setForm(p=>({...p,licenceType:e.target.value}))}>
                      <option value="">Select...</option>
                      <option>Category B (Car / Small Van)</option>
                      <option>Category C1 (Medium Goods)</option>
                      <option>Category C (Large Goods)</option>
                      <option>Not applicable</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Experience</label>
                      <select className={inp} value={form.experience} onChange={e=>setForm(p=>({...p,experience:e.target.value}))}>
                        <option value="">Select...</option>
                        <option>No experience</option><option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>5+ years</option>
                      </select>
                    </div>
                    <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Availability</label>
                      <select className={inp} value={form.availability} onChange={e=>setForm(p=>({...p,availability:e.target.value}))}>
                        <option value="">Select...</option>
                        <option>Full-time</option><option>Part-time</option><option>Flexible</option>
                      </select>
                    </div>
                  </div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Cover Note</label>
                    <textarea rows={3} placeholder="Tell us why you'd be a great fit..." className={inp + " resize-none"} value={form.coverLetter} onChange={e=>setForm(p=>({...p,coverLetter:e.target.value}))} />
                  </div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Where did you hear about us?</label>
                    <select className={inp} value={form.source} onChange={e=>setForm(p=>({...p,source:e.target.value}))}>
                      <option value="website">Seehra Transport Website</option>
                      <option value="indeed">Indeed</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button type="submit" disabled={status==="sending"}
                    className="w-full py-4 rounded-xl font-bold text-white text-sm uppercase tracking-wide transition-all hover:opacity-90 disabled:opacity-50 mt-1"
                    style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>
                    {status === "sending" ? "Submitting..." : "Submit Application →"}
                  </button>
                  {status === "error" && <p className="text-red-500 text-xs text-center">Something went wrong. Please email info@seehratransport.com</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
