import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_JOBS, Job } from "@/lib/jobs";

// Simple file-based persistence using Vercel's /tmp
import { readFileSync, writeFileSync, existsSync } from "fs";

const DB_PATH = "/tmp/seehra-jobs.json";

function getJobs(): Job[] {
  try {
    if (existsSync(DB_PATH)) {
      return JSON.parse(readFileSync(DB_PATH, "utf-8"));
    }
  } catch {}
  // Seed with defaults
  writeFileSync(DB_PATH, JSON.stringify(DEFAULT_JOBS));
  return DEFAULT_JOBS;
}

function saveJobs(jobs: Job[]) {
  writeFileSync(DB_PATH, JSON.stringify(jobs));
}

export async function GET() {
  const jobs = getJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_KEY && process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const jobs = getJobs();
    const newJob: Job = {
      ...body,
      id: `job-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active",
    };
    jobs.push(newJob);
    saveJobs(jobs);
    return NextResponse.json(newJob);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
