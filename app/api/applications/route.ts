import { NextRequest, NextResponse } from "next/server";
import { Application } from "@/lib/jobs";
import { readFileSync, writeFileSync, existsSync } from "fs";

const DB_PATH = "/tmp/seehra-applications.json";
function getApps(): Application[] {
  try { if (existsSync(DB_PATH)) return JSON.parse(readFileSync(DB_PATH,"utf-8")); } catch {}
  return [];
}
function saveApps(apps: Application[]) { writeFileSync(DB_PATH, JSON.stringify(apps)); }

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_KEY && process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  return NextResponse.json(getApps());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apps = getApps();
    const app: Application = {
      ...body,
      id: `app-${Date.now()}`,
      status: "new",
      createdAt: new Date().toISOString(),
      notes: "",
    };
    apps.push(app);
    saveApps(apps);

    // Email notification
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type":"application/json", Authorization:`Bearer ${resendKey}` },
        body: JSON.stringify({
          from: "Seehra Transport <noreply@seehratransport.com>",
          to: ["info@seehratransport.com"],
          reply_to: body.email,
          subject: `New Application — ${body.jobTitle} — ${body.firstName} ${body.lastName}`,
          html: `
            <h2>New Job Application Received</h2>
            <p><strong>Job:</strong> ${body.jobTitle}</p>
            <p><strong>Source:</strong> ${body.source}</p>
            <table style="border-collapse:collapse;width:100%;margin-top:16px">
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #eee">${body.firstName} ${body.lastName}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee">${body.email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #eee">${body.phone}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Licence</td><td style="padding:8px;border:1px solid #eee">${body.licenceType}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Experience</td><td style="padding:8px;border:1px solid #eee">${body.experience}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Availability</td><td style="padding:8px;border:1px solid #eee">${body.availability}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Cover Note</td><td style="padding:8px;border:1px solid #eee">${body.coverLetter || "None provided"}</td></tr>
            </table>
            <p style="margin-top:16px"><a href="https://seehratransport.com/admin/recruitment">View in Dashboard →</a></p>
          `,
        }),
      });
    }
    return NextResponse.json({ success: true, id: app.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_KEY && process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const { id, ...updates } = await req.json();
  const apps = getApps();
  const idx = apps.findIndex(a => a.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  apps[idx] = { ...apps[idx], ...updates };
  saveApps(apps);
  return NextResponse.json(apps[idx]);
}
