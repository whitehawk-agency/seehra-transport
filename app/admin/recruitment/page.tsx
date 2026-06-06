"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Job, Application, ApplicationStatus } from "@/lib/jobs";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  reviewing: "bg-yellow-100 text-yellow-700",
  interview: "bg-purple-100 text-purple-700",
  offered: "bg-orange-100 text-orange-700",
  hired: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const STATUS_OPTIONS: ApplicationStatus[] = ["new","reviewing","interview","offered","hired","rejected"];

export default function AdminRecruitmentPage() {
  const [adminKey, setAdminKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"applications"|"jobs">("applications");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterJob, setFilterJob] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState<Application | null>(null);
  const [newJob, setNewJob] = useState({ title:"", department:"Operations", location:"", type:"Self-employed", salary:"", description:"", requirements:"", responsibilities:"", benefits:"" });
  const [jobStatus, setJobStatus] = useState<"idle"|"saving"|"saved">("idle");

  async function login() {
    setLoading(true);
    const [jRes, aRes] = await Promise.all([
      fetch("/api/jobs"),
      fetch("/api/applications", { headers: { "x-admin-key": adminKey } }),
    ]);
    if (aRes.ok) {
      setJobs(await jRes.json());
      setApplications(await aRes.json());
      setAuthed(true);
    } else {
      alert("Invalid admin key");
    }
    setLoading(false);
  }

  async function updateStatus(appId: string, status: ApplicationStatus) {
    await fetch("/api/applications", {
      method: "PATCH",
      headers: { "Content-Type":"application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ id: appId, status }),
    });
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    if (selected?.id === appId) setSelected(prev => prev ? { ...prev, status } : null);
  }

  async function toggleJobStatus(jobId: string, current: string) {
    const newStatus = current === "active" ? "paused" : "active";
    await fetch(`/api/jobs/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type":"application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ status: newStatus }),
    });
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus as any } : j));
  }

  async function postJob(e: React.FormEvent) {
    e.preventDefault();
    setJobStatus("saving");
    const payload = {
      ...newJob,
      requirements: newJob.requirements.split("\n").filter(Boolean),
      responsibilities: newJob.responsibilities.split("\n").filter(Boolean),
      benefits: newJob.benefits.split("\n").filter(Boolean),
    };
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type":"application/json", "x-admin-key": adminKey },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const job = await res.json();
      setJobs(prev => [...prev, job]);
      setNewJob({ title:"", department:"Operations", location:"", type:"Self-employed", salary:"", description:"", requirements:"", responsibilities:"", benefits:"" });
      setJobStatus("saved");
      setTimeout(() => setJobStatus("idle"), 2000);
    }
  }

  const filtered = applications.filter(a => {
    const matchJob = filterJob === "All" || a.jobTitle === filterJob;
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    return matchJob && matchStatus;
  });

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f7680b] transition-colors";

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full max-w-sm text-center">
          <Image src="/logo-cropped.png" alt="Seehra Transport" width={200} height={77} className="object-contain mx-auto mb-6" style={{ height:"50px", width:"auto" }} />
          <h1 className="text-xl font-extrabold mb-1">Recruitment Dashboard</h1>
          <p className="text-gray-500 text-sm mb-6">Admin access only</p>
          <input
            type="password"
            placeholder="Admin Key"
            className={inp + " mb-3 text-center"}
            value={adminKey}
            onChange={e => setAdminKey(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
          />
          <button onClick={login} disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>
            {loading ? "Checking..." : "Sign In →"}
          </button>
          <p className="text-gray-400 text-xs mt-4">Set ADMIN_KEY in your Vercel environment variables</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logo-cropped.png" alt="Seehra Transport" width={160} height={62} className="object-contain" style={{ height:"36px", width:"auto" }} />
            <span className="text-gray-300 hidden sm:block">|</span>
            <span className="text-sm font-bold text-gray-700 hidden sm:block">Recruitment Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/careers" target="_blank" className="text-[#f7680b] text-xs font-semibold hover:underline hidden sm:block">
              View Public Portal →
            </Link>
            <button onClick={() => setAuthed(false)} className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg">Sign out</button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label:"Total Applications", value: applications.length, color:"text-gray-900" },
            { label:"New", value: applications.filter(a=>a.status==="new").length, color:"text-blue-600" },
            { label:"In Progress", value: applications.filter(a=>["reviewing","interview","offered"].includes(a.status)).length, color:"text-orange-600" },
            { label:"Hired", value: applications.filter(a=>a.status==="hired").length, color:"text-green-600" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["applications","jobs"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${tab===t ? "text-white" : "bg-white text-gray-500 border border-gray-200 hover:text-gray-700"}`}
              style={tab===t ? { background:"linear-gradient(135deg,#e62b1e,#f7680b)" } : {}}>
              {t === "applications" ? `Applications (${applications.length})` : `Jobs (${jobs.filter(j=>j.status==="active").length} active)`}
            </button>
          ))}
        </div>

        {tab === "applications" && (
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Application list */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-4">
                <select value={filterJob} onChange={e=>setFilterJob(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none focus:border-[#f7680b]">
                  <option value="All">All Jobs</option>
                  {Array.from(new Set(applications.map(a=>a.jobTitle))).map(t=><option key={t}>{t}</option>)}
                </select>
                <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none focus:border-[#f7680b]">
                  <option value="All">All Statuses</option>
                  {STATUS_OPTIONS.map(s=><option key={s} className="capitalize">{s}</option>)}
                </select>
              </div>

              {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <h3 className="font-bold mb-1">No applications yet</h3>
                  <p className="text-gray-500 text-sm">Applications from your careers portal will appear here</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filtered.map(app => (
                    <div key={app.id}
                      onClick={() => setSelected(app)}
                      className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-md ${selected?.id===app.id ? "border-[#f7680b]" : "border-gray-100"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-bold text-sm">{app.firstName} {app.lastName}</span>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${STATUS_COLORS[app.status]}`}>{app.status}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-0.5">{app.jobTitle}</p>
                          <p className="text-xs text-gray-400">{app.email} · {app.phone}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-gray-400">{new Date(app.createdAt).toLocaleDateString("en-GB")}</p>
                          <p className="text-xs text-gray-400">{app.source}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-1">
              {selected ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-extrabold">{selected.firstName} {selected.lastName}</h3>
                    <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg font-bold">×</button>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-0.5">Applied for</p>
                    <p className="font-semibold text-sm">{selected.jobTitle}</p>
                  </div>
                  <div className="flex flex-col gap-2 mb-5 text-sm">
                    <a href={`mailto:${selected.email}`} className="text-[#f7680b] hover:underline text-xs"> {selected.email}</a>
                    <a href={`tel:${selected.phone}`} className="text-gray-600 text-xs"> {selected.phone}</a>
                    {selected.address && <p className="text-gray-500 text-xs"> {selected.address}</p>}
                    {selected.licenceType && <p className="text-gray-500 text-xs"> {selected.licenceType}</p>}
                    {selected.experience && <p className="text-gray-500 text-xs"> {selected.experience}</p>}
                    {selected.availability && <p className="text-gray-500 text-xs"> {selected.availability}</p>}
                  </div>
                  {selected.coverLetter && (
                    <div className="mb-5">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cover Note</p>
                      <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3">{selected.coverLetter}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Update Status</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {STATUS_OPTIONS.map(s => (
                        <button key={s} onClick={()=>updateStatus(selected.id, s)}
                          className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${selected.status===s ? "text-white" : "border border-gray-200 text-gray-500 hover:border-gray-400"}`}
                          style={selected.status===s ? { background:"linear-gradient(135deg,#e62b1e,#f7680b)" } : {}}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400">
                  <div className="text-3xl mb-2"></div>
                  <p className="text-sm">Select an application to view details</p>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "jobs" && (
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Current jobs */}
            <div>
              <h2 className="font-extrabold text-lg mb-4">Active Job Listings</h2>
              <div className="flex flex-col gap-3">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-sm">{job.title}</h3>
                        <p className="text-xs text-gray-500">{job.location} · {job.type}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${job.status==="active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {applications.filter(a=>a.jobId===job.id).length} applications
                      </span>
                      <div className="flex gap-2">
                        <Link href={`/careers/${job.id}`} target="_blank"
                          className="text-xs text-[#f7680b] border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
                          View →
                        </Link>
                        <button onClick={()=>toggleJobStatus(job.id, job.status)}
                          className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 font-semibold">
                          {job.status==="active" ? "Pause" : "Activate"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post new job */}
            <div>
              <h2 className="font-extrabold text-lg mb-4">Post a New Job</h2>
              <form onSubmit={postJob} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Job Title *</label><input required className={inp} placeholder="e.g. Multi-Drop Delivery Driver" value={newJob.title} onChange={e=>setNewJob(p=>({...p,title:e.target.value}))} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Department</label>
                    <select className={inp} value={newJob.department} onChange={e=>setNewJob(p=>({...p,department:e.target.value}))}>
                      <option>Operations</option><option>Management</option><option>Admin</option><option>Logistics</option>
                    </select>
                  </div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Type</label>
                    <select className={inp} value={newJob.type} onChange={e=>setNewJob(p=>({...p,type:e.target.value}))}>
                      <option>Self-employed</option><option>Full-time</option><option>Part-time</option><option>Contract</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Location *</label><input required className={inp} placeholder="e.g. West Midlands" value={newJob.location} onChange={e=>setNewJob(p=>({...p,location:e.target.value}))} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Salary</label><input className={inp} placeholder="e.g. Competitive + fuel" value={newJob.salary} onChange={e=>setNewJob(p=>({...p,salary:e.target.value}))} /></div>
                </div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Description *</label><textarea required rows={3} className={inp+" resize-none"} value={newJob.description} onChange={e=>setNewJob(p=>({...p,description:e.target.value}))} /></div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Requirements (one per line)</label><textarea rows={3} className={inp+" resize-none"} placeholder="Valid UK driving licence&#10;Smartphone&#10;DBS check required" value={newJob.requirements} onChange={e=>setNewJob(p=>({...p,requirements:e.target.value}))} /></div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Responsibilities (one per line)</label><textarea rows={3} className={inp+" resize-none"} value={newJob.responsibilities} onChange={e=>setNewJob(p=>({...p,responsibilities:e.target.value}))} /></div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Benefits (one per line)</label><textarea rows={3} className={inp+" resize-none"} value={newJob.benefits} onChange={e=>setNewJob(p=>({...p,benefits:e.target.value}))} /></div>
                <button type="submit" disabled={jobStatus==="saving"}
                  className="w-full py-4 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background:"linear-gradient(135deg,#e62b1e,#f7680b)" }}>
                  {jobStatus==="saving" ? "Posting..." : jobStatus==="saved" ? " Job Posted!" : "Post Job →"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
