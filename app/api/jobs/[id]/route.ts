import { NextRequest, NextResponse } from "next/server";
import { isAuthorised } from "@/lib/adminAuth";
import { Job } from "@/lib/jobs";
import { readFileSync, writeFileSync, existsSync } from "fs";

const DB_PATH = "/tmp/seehra-jobs.json";
function getJobs(): Job[] {
  try { if (existsSync(DB_PATH)) return JSON.parse(readFileSync(DB_PATH,"utf-8")); } catch {}
  return [];
}
function saveJobs(jobs: Job[]) { writeFileSync(DB_PATH, JSON.stringify(jobs)); }

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const body = await req.json();
  const jobs = getJobs();
  const idx = jobs.findIndex(j => j.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  jobs[idx] = { ...jobs[idx], ...body, updatedAt: new Date().toISOString() };
  saveJobs(jobs);
  return NextResponse.json(jobs[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const jobs = getJobs();
  const filtered = jobs.filter(j => j.id !== id);
  saveJobs(filtered);
  return NextResponse.json({ success: true });
}
