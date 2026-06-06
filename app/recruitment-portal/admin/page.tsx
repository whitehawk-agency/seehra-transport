"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Job, Application, ApplicationStatus } from "@/lib/jobs";

const STATUS_STYLES: Record<ApplicationStatus, { bg: string; text: string; label: string }> = {
  new:       { bg: "bg-blue-100",   text: "text-blue-700",   label: "New" },
  reviewing: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Reviewing" },
  interview: { bg: "bg-purple-100", text: "text-purple-700", label: "Interview" },
  offered:   { bg: "bg-orange-100", text: "text-orange-700", label: "Offered" },
  hired:     { bg: "bg-green-100",  text: "text-green-700",  label: "Hired" },
  rejected:  { bg: "bg-red-100",    text: "text-red-700",    label: "Rejected" },
};

const ALL_STATUSES: ApplicationStatus[] = ["new","reviewing","interview","offered","hired","rejected"];

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"applications"|"jobs"|"post">("applications");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);
  const [filterJob, setFilterJob] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [jobForm, setJobForm] = useState({ title:"", department:"Operations", location:"", type:"Self-employed" as const, salary:"", description:"", requirements:"", responsibilities:"", benefits:"" });
  const [postStatus, setPostStatus] = useState<"idle"|"saving"|"saved">("idle");

  async function login() {
    if (!adminKey.trim()) return;
    setLoading(true); setAuthError(false);
    try {
      const [jRes, aRes] = await Promise.all([
        fetch("/api/jobs"),
        fetch("/api/applications", { headers: { "x-admin-key": adminKey } }),
      ]);
      if (aRes.ok) {
        setJobs(await jRes.json());
        setApplications(await aRes.json());
        setAuthed(true);
      } else { setAuthError(true); }
    } catch { setAuthError(true); }
    setLoading(false);
  }

  async function updateAppStatus(id: string, status: ApplicationStatus) {
    await fetch("/api/applications", {
      method: "PATCH",
      headers: { "Content-Type":"application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ id, status }),
    });
    setApplications(p => p.map(a => a.id === id ? { ...a, status } : a));
    setSelected(p => p?.id === id ? { ...p, status } : p);
  }

  async function toggleJob(id: string, current: string) {
    const status = current === "active" ? "paused" : "active";
    await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type":"application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ status }),
    });
    setJobs(p => p.map(j => j.id === id ? { ...j, status: status as any } : j));
  }

  async function postJob(e: React.FormEvent) {
    e.preventDefault(); setPostStatus("saving");
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type":"application/json", "x-admin-key": adminKey },
      body: JSON.stringify({
        ...jobForm,
        requirements: jobForm.requirements.split("\n").filter(Boolean),
        responsibilities: jobForm.responsibilities.split("\n").filter(Boolean),
        benefits: jobForm.benefits.split("\n").filter(Boolean),
      }),
    });
    if (res.ok) {
      const newJob = await res.json(); setJobs(p => [...p, newJob]);
      setJobForm({ title:"", department:"Operations", location:"", type:"Self-employed", salary:"", description:"", requirements:"", responsibilities:"", benefits:"" });
      setPostStatus("saved");
      setTimeout(() => { setPostStatus("idle"); setTab("jobs"); }, 1500);
    }
  }

  const filtered = applications.filter(a =>
    (filterJob === "All" || a.jobTitle === filterJob) &&
    (filterStatus === "All" || a.status === filterStatus)
  );

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#f7680b] transition-colors bg-white";

  // Login screen
  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background:"linear-gradient(135deg,#0a0a0a,#1a1a1a)" }}>
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="flex justify-center mb-6">
          <Image src="/logo-cropped.png" alt="Seehra Transport" width={160} height={62} className="object-contain" style={{ height:"44px", width:"auto" }} />
        </div>
        <h1 className="text-xl font-extrabold text-center mb-1">Recruitment Portal</h1>
        <p className="text-gray-400 text-sm text-center mb-6">Admin access only</p>
        <input type="password" placeholder="Enter admin key"
          className={`${inp} mb-3 text-center`}
          value={adminKey} onChange={e => setAdminKey(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()} />
        {authError && <p className="text-red-500 text-xs text-center mb-3">Invalid key. Please try again.</p>}
        <button onClick={login} disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 disabled:opacity-50 transition-all"
          style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>
          {loading ? "Signing in..." : "Sign In →"}
        </button>
        <p className="text-gray-400 text-xs text-center mt-4">Set <code className="bg-gray-100 px-1 rounded">ADMIN_KEY</code> in Vercel env vars</p>
      </div>
    </div>
  );

  const statsData = [
    { label: "Total Applications", value: applications.length, color: "text-gray-900" },
    { label: "New", value: applications.filter(a => a.status === "new").length, color: "text-blue-600" },
    { label: "In Progress", value: applications.filter(a => ["reviewing","interview","offered"].includes(a.status)).length, color: "text-orange-500" },
    { label: "Hired", value: applications.filter(a => a.status === "hired").length, color: "text-green-600" },
    { label: "Active Jobs", value: jobs.filter(j => j.status === "active").length, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo-cropped.png" alt="Seehra Transport" width={140} height={54} className="object-contain" style={{ height:"32px", width:"auto" }} />
            <span className="hidden sm:block text-gray-300">|</span>
            <span className="hidden sm:block text-sm font-bold text-gray-600">Recruitment Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/recruitment-portal" target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-[#f7680b] font-semibold hover:underline">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Public Portal
            </Link>
            <button onClick={() => setAuthed(false)}
              className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg font-medium">
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {statsData.map(s => (
              <div key={s.label} className="text-center">
                <div className={`text-2xl sm:text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {([
            { key:"applications", label:`Applications (${applications.length})` },
            { key:"jobs", label:`Jobs (${jobs.filter(j=>j.status==="active").length} active)` },
            { key:"post", label:"+ Post New Job" },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${tab===t.key ? "text-white" : "bg-white text-gray-500 border border-gray-200 hover:text-gray-700"}`}
              style={tab===t.key ? { background:"linear-gradient(135deg,#e62b1e,#f7680b)" } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── APPLICATIONS TAB ── */}
        {tab === "applications" && (
          <div className="grid lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                <select value={filterJob} onChange={e => setFilterJob(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#f7680b] cursor-pointer">
                  <option value="All">All Jobs</option>
                  {Array.from(new Set(applications.map(a => a.jobTitle))).map(t => <option key={t}>{t}</option>)}
                </select>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#f7680b] cursor-pointer">
                  <option value="All">All Statuses</option>
                  {ALL_STATUSES.map(s => <option key={s} className="capitalize">{s}</option>)}
                </select>
              </div>

              {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                  </div>
                  <h3 className="font-bold text-gray-700 mb-1">No applications yet</h3>
                  <p className="text-gray-400 text-sm">Applications submitted via the portal will appear here</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filtered.map(app => {
                    const s = STATUS_STYLES[app.status];
                    return (
                      <div key={app.id} onClick={() => setSelected(app)}
                        className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-sm ${selected?.id === app.id ? "border-[#f7680b] shadow-sm" : "border-gray-100 hover:border-gray-200"}`}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-bold text-sm text-gray-900">{app.firstName} {app.lastName}</span>
                              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-0.5 truncate">{app.jobTitle}</p>
                            <p className="text-xs text-gray-400">{app.email}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs text-gray-400">{new Date(app.createdAt).toLocaleDateString("en-GB", { day:"numeric", month:"short" })}</p>
                            <p className="text-xs text-gray-300 capitalize">{app.source}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-extrabold text-base">{selected.firstName} {selected.lastName}</h3>
                      <p className="text-[#f7680b] text-xs font-semibold">{selected.jobTitle}</p>
                    </div>
                    <button onClick={() => setSelected(null)}
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 mb-5">
                    <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#f7680b] transition-colors">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      {selected.email}
                    </a>
                    <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#f7680b] transition-colors">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012.08 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.22 7.66a16 16 0 006.07 6.07l1.02-1.03a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                      {selected.phone}
                    </a>
                    {selected.address && <p className="flex items-center gap-2 text-xs text-gray-500"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>{selected.address}</p>}
                    {selected.licenceType && <p className="text-xs text-gray-500 pl-4">Licence: {selected.licenceType}</p>}
                    {selected.experience && <p className="text-xs text-gray-500 pl-4">Experience: {selected.experience}</p>}
                    {selected.availability && <p className="text-xs text-gray-500 pl-4">Availability: {selected.availability}</p>}
                    <p className="text-xs text-gray-400 pl-4">Applied: {new Date(selected.createdAt).toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" })}</p>
                  </div>

                  {selected.coverLetter && (
                    <div className="mb-5">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cover Note</p>
                      <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3 border border-gray-100">{selected.coverLetter}</p>
                    </div>
                  )}

                  {/* CV download */}
                  {(selected as any).cvFilename && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">CV Attached</p>
                      <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl p-3">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#f7680b" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                        <span className="text-xs font-semibold text-[#f7680b] flex-1 truncate">{(selected as any).cvFilename}</span>
                        {(selected as any).cvBase64 && (
                          <a
                            href={`data:${(selected as any).cvMimeType};base64,${(selected as any).cvBase64}`}
                            download={(selected as any).cvFilename}
                            className="text-xs font-bold text-white bg-[#f7680b] px-3 py-1 rounded-lg hover:bg-[#e55a00] transition-colors flex-shrink-0"
                          >
                            Download
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  {!(selected as any).cvFilename && (
                    <div className="mb-4 bg-yellow-50 border border-yellow-100 rounded-xl p-3">
                      <p className="text-xs text-yellow-700 font-semibold">No CV uploaded</p>
                      <p className="text-xs text-yellow-600 mt-0.5">Moving to "Interview" will automatically email the candidate requesting their CV.</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Update Status</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {ALL_STATUSES.map(s => {
                        const style = STATUS_STYLES[s];
                        const isActive = selected.status === s;
                        return (
                          <button key={s} onClick={() => updateAppStatus(selected.id, s)}
                            title={s === "interview" ? "Automatically emails candidate with interview invitation" : ""}
                            className={`py-2 rounded-xl text-xs font-bold transition-all relative ${isActive ? `${style.bg} ${style.text}` : "border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"}`}>
                            {style.label}
                            {s === "interview" && <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#f7680b] rounded-full" title="Sends email to candidate" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </div>
                  <p className="text-sm text-gray-400">Select an application<br />to view details</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── JOBS TAB ── */}
        {tab === "jobs" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map(job => (
              <div key={job.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 mb-0.5 truncate">{job.title}</h3>
                    <p className="text-xs text-gray-500">{job.location} · {job.type}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${job.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {job.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-4 line-clamp-2">{job.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    {applications.filter(a => a.jobId === job.id).length} applicants
                  </span>
                  <div className="flex gap-2">
                    <Link href={`/recruitment-portal/${job.id}`} target="_blank"
                      className="text-xs border border-orange-200 text-[#f7680b] px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
                      View
                    </Link>
                    <button onClick={() => toggleJob(job.id, job.status)}
                      className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                      {job.status === "active" ? "Pause" : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── POST JOB TAB ── */}
        {tab === "post" && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-extrabold mb-5">Post a New Job</h2>
            <form onSubmit={postJob} className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4">
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Job Title *</label><input required className={inp} placeholder="e.g. Multi-Drop Delivery Driver" value={jobForm.title} onChange={e=>setJobForm(p=>({...p,title:e.target.value}))} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Department</label>
                  <select className={inp} value={jobForm.department} onChange={e=>setJobForm(p=>({...p,department:e.target.value}))}>
                    <option>Operations</option><option>Management</option><option>Admin</option><option>Logistics</option>
                  </select>
                </div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Job Type</label>
                  <select className={inp} value={jobForm.type} onChange={e=>setJobForm(p=>({...p,type:e.target.value as any}))}>
                    <option>Self-employed</option><option>Full-time</option><option>Part-time</option><option>Contract</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Location *</label><input required className={inp} placeholder="e.g. West Midlands" value={jobForm.location} onChange={e=>setJobForm(p=>({...p,location:e.target.value}))} /></div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Salary / Pay</label><input className={inp} placeholder="e.g. Competitive + fuel" value={jobForm.salary} onChange={e=>setJobForm(p=>({...p,salary:e.target.value}))} /></div>
              </div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Job Description *</label><textarea required rows={4} className={inp+" resize-none"} placeholder="Describe the role..." value={jobForm.description} onChange={e=>setJobForm(p=>({...p,description:e.target.value}))} /></div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Requirements (one per line)</label><textarea rows={4} className={inp+" resize-none"} placeholder={"Valid UK driving licence\nSmartphone required\nDBS check required"} value={jobForm.requirements} onChange={e=>setJobForm(p=>({...p,requirements:e.target.value}))} /></div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Responsibilities (one per line)</label><textarea rows={4} className={inp+" resize-none"} value={jobForm.responsibilities} onChange={e=>setJobForm(p=>({...p,responsibilities:e.target.value}))} /></div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Benefits (one per line)</label><textarea rows={4} className={inp+" resize-none"} placeholder={"Weekly pay\nFuel paid on top of day rate\nTraining provided"} value={jobForm.benefits} onChange={e=>setJobForm(p=>({...p,benefits:e.target.value}))} /></div>
              <button type="submit" disabled={postStatus==="saving"}
                className="w-full py-4 rounded-xl font-bold text-white text-sm hover:opacity-90 disabled:opacity-50 transition-all"
                style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>
                {postStatus==="saving" ? "Posting..." : postStatus==="saved" ? "Job Posted!" : "Post Job →"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
