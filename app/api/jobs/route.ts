import { NextRequest, NextResponse } from "next/server";
import { isAuthorised } from "@/lib/adminAuth";
import { readData, writeData } from "@/lib/store";
import { Job } from "@/lib/jobs";

export const dynamic = "force-dynamic";

const KEY = "jobs";

export async function GET() {
  const jobs = await readData<Job[]>(KEY, []);
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const jobs = await readData<Job[]>(KEY, []);
    const newJob: Job = {
      ...body,
      id: `job-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active",
    };
    jobs.push(newJob);
    await writeData(KEY, jobs);
    return NextResponse.json(newJob);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
