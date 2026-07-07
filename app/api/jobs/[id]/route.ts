import { NextRequest, NextResponse } from "next/server";
import { isAuthorised } from "@/lib/adminAuth";
import { readData, writeData } from "@/lib/store";
import { Job } from "@/lib/jobs";

export const dynamic = "force-dynamic";

const KEY = "jobs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const body = await req.json();
  const jobs = await readData<Job[]>(KEY, []);
  const idx = jobs.findIndex(j => j.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  jobs[idx] = { ...jobs[idx], ...body, updatedAt: new Date().toISOString() };
  await writeData(KEY, jobs);
  return NextResponse.json(jobs[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const jobs = await readData<Job[]>(KEY, []);
  const filtered = jobs.filter(j => j.id !== id);
  await writeData(KEY, filtered);
  return NextResponse.json({ success: true });
}
