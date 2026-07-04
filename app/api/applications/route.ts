import { NextRequest, NextResponse } from "next/server";
import { Application } from "@/lib/jobs";
import { readFileSync, writeFileSync, existsSync } from "fs";
import crypto from "crypto";

// The opaque admin token = SHA-256(secret + adminEmail), matching /api/admin-auth.
// This means the raw admin password/key is never sent to or stored in the browser.
function isAuthorised(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@seehratransport.com";
  // If nothing is configured, deny by default (fail closed)
  if (!adminKey && !adminPassword) return false;
  const secret = adminPassword || adminKey || "";
  const expected = crypto.createHash("sha256").update(secret + adminEmail).digest("hex");
  const provided = req.headers.get("x-admin-key") || "";
  if (provided.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  } catch {
    return false;
  }
}

const DB_PATH = "/tmp/seehra-applications.json";
function getApps(): Application[] {
  try { if (existsSync(DB_PATH)) return JSON.parse(readFileSync(DB_PATH,"utf-8")); } catch {}
  return [];
}
function saveApps(apps: Application[]) { writeFileSync(DB_PATH, JSON.stringify(apps)); }

export async function GET(req: NextRequest) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  return NextResponse.json(getApps());
}

export async function POST(req: NextRequest) {
  try {
    // Handle multipart form (with CV upload) or JSON
    const contentType = req.headers.get("content-type") || "";
    let body: Record<string, string> = {};
    let cvBase64 = "";
    let cvFilename = "";
    let cvMimeType = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        if (key === "cv" && value instanceof File && value.size > 0) {
          const buffer = await value.arrayBuffer();
          cvBase64 = Buffer.from(buffer).toString("base64");
          cvFilename = value.name;
          cvMimeType = value.type;
        } else {
          body[key] = value.toString();
        }
      }
    } else {
      body = await req.json();
    }

    const apps = getApps();
    const app: Application = {
      ...body,
      id: `app-${Date.now()}`,
      jobId: body.jobId || "",
      jobTitle: body.jobTitle || "",
      firstName: body.firstName || "",
      lastName: body.lastName || "",
      email: body.email || "",
      phone: body.phone || "",
      address: body.address || "",
      licenceType: body.licenceType || "",
      experience: body.experience || "",
      availability: body.availability || "",
      coverLetter: body.coverLetter || "",
      source: (body.source as any) || "website",
      status: "new",
      createdAt: new Date().toISOString(),
      notes: "",
      cvFilename: cvFilename || "",
      cvBase64: cvBase64 || "",
      cvMimeType: cvMimeType || "",
    };
    apps.push(app);
    saveApps(apps);

    // Email notification to recruitment team
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const emailPayload: Record<string, unknown> = {
        from: "Seehra Transport Recruitment <noreply@seehratransport.com>",
        to: ["admin@seehratransport.com"],
        reply_to: body.email,
        subject: `New Application — ${body.jobTitle} — ${body.firstName} ${body.lastName}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:linear-gradient(135deg,#e62b1e,#f7680b);padding:24px;border-radius:12px 12px 0 0">
              <h2 style="color:white;margin:0;font-size:20px">New Job Application</h2>
              <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px">${body.jobTitle}</p>
            </div>
            <div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px;border:1px solid #eee;border-top:none">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:140px;font-size:13px">Name</td><td style="padding:8px;border-bottom:1px solid #eee;font-size:13px">${body.firstName} ${body.lastName}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;font-size:13px">Email</td><td style="padding:8px;border-bottom:1px solid #eee;font-size:13px">${body.email}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;font-size:13px">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;font-size:13px">${body.phone}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;font-size:13px">Address</td><td style="padding:8px;border-bottom:1px solid #eee;font-size:13px">${body.address || "Not provided"}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;font-size:13px">Licence</td><td style="padding:8px;border-bottom:1px solid #eee;font-size:13px">${body.licenceType || "Not specified"}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;font-size:13px">Experience</td><td style="padding:8px;border-bottom:1px solid #eee;font-size:13px">${body.experience || "Not specified"}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;font-size:13px">Availability</td><td style="padding:8px;border-bottom:1px solid #eee;font-size:13px">${body.availability || "Not specified"}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;font-size:13px">Source</td><td style="padding:8px;border-bottom:1px solid #eee;font-size:13px">${body.source || "Website"}</td></tr>
                ${body.coverLetter ? `<tr><td style="padding:8px;font-weight:bold;font-size:13px;vertical-align:top">Cover Note</td><td style="padding:8px;font-size:13px">${body.coverLetter}</td></tr>` : ""}
              </table>
              ${cvFilename ? `<p style="margin-top:16px;font-size:13px;color:#666">CV attached: <strong>${cvFilename}</strong></p>` : "<p style='margin-top:16px;font-size:13px;color:#999'>No CV uploaded</p>"}
              <div style="margin-top:20px">
                <a href="https://seehratransport.com/careers-admin" style="background:linear-gradient(135deg,#e62b1e,#f7680b);color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:13px">View in Dashboard →</a>
              </div>
            </div>
          </div>
        `,
        attachments: cvBase64 ? [{
          filename: cvFilename,
          content: cvBase64,
          type: cvMimeType,
        }] : undefined,
      };

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify(emailPayload),
      });
    }

    return NextResponse.json({ success: true, id: app.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const body = await req.json();
  const { id, ...updates } = body;
  const apps = getApps();
  const idx = apps.findIndex(a => a.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const oldStatus = apps[idx].status;
  apps[idx] = { ...apps[idx], ...updates };
  saveApps(apps);

  // If moved to interview — email candidate requesting CV (if they haven't uploaded one)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && updates.status === "interview" && oldStatus !== "interview") {
    const app = apps[idx];
    const hasCV = !!(app as any).cvFilename;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: "Seehra Transport Recruitment <recruitment@seehratransport.com>",
        to: [app.email],
        subject: `Interview Invitation — ${app.jobTitle} at Seehra Transport`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:linear-gradient(135deg,#e62b1e,#f7680b);padding:24px;border-radius:12px 12px 0 0">
              <h2 style="color:white;margin:0;font-size:20px">You've been selected for interview!</h2>
              <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px">Seehra Transport — ${app.jobTitle}</p>
            </div>
            <div style="background:#fff;padding:28px;border-radius:0 0 12px 12px;border:1px solid #eee;border-top:none">
              <p style="font-size:15px;color:#333">Dear ${app.firstName},</p>
              <p style="font-size:14px;color:#555;line-height:1.7">Thank you for applying for the <strong>${app.jobTitle}</strong> position at Seehra Transport. We've reviewed your application and would like to invite you to interview.</p>
              <p style="font-size:14px;color:#555;line-height:1.7">Our recruitment team will be in touch shortly to confirm the date, time, and format of your interview.</p>
              ${!hasCV ? `
              <div style="background:#fff8f0;border:1px solid #fde8d0;border-radius:8px;padding:16px;margin:20px 0">
                <p style="font-size:14px;color:#c05500;font-weight:bold;margin:0 0 6px">Action Required: Please send your CV</p>
                <p style="font-size:13px;color:#555;margin:0">To complete your application, please reply to this email with your CV attached. This will help us prepare for your interview.</p>
              </div>
              ` : ""}
              <p style="font-size:14px;color:#555;line-height:1.7">If you have any questions in the meantime, please don't hesitate to reply to this email or contact us at <a href="mailto:recruitment@seehratransport.com" style="color:#f7680b">recruitment@seehratransport.com</a>.</p>
              <p style="font-size:14px;color:#555;margin-top:20px">We look forward to meeting you.</p>
              <p style="font-size:14px;color:#333;font-weight:bold;margin-top:4px">The Seehra Transport Recruitment Team</p>
              <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
              <p style="font-size:12px;color:#999">Seehra Transport Limited · 11 Union Road, Oldbury, England, B69 3EX</p>
            </div>
          </div>
        `,
      }),
    });
  }

  return NextResponse.json(apps[idx]);
}
