import { NextRequest, NextResponse } from "next/server";
import { esc, isValidEmail } from "@/lib/sanitize";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, address, licence, years, experience, availability, info } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: "Seehra Transport <noreply@seehratransport.com>",
          to: ["recruitment@seehratransport.com"],
          reply_to: email,
          subject: `New Driver Application — ${esc(name)} · ${esc(licence || "Licence not specified")}`,
          html: `
            <h2>New Driver Application</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #eee">${esc(name)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee">${esc(email)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #eee">${esc(phone)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Address</td><td style="padding:8px;border:1px solid #eee">${esc(address || "Not provided")}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Licence Type</td><td style="padding:8px;border:1px solid #eee">${esc(licence || "Not specified")}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Years Holding Licence</td><td style="padding:8px;border:1px solid #eee">${esc(years || "Not specified")}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Driving Experience</td><td style="padding:8px;border:1px solid #eee">${esc(experience || "Not specified")}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Availability</td><td style="padding:8px;border:1px solid #eee">${esc(availability || "Not specified")}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Additional Info</td><td style="padding:8px;border:1px solid #eee">${esc(info || "None")}</td></tr>
            </table>
          `,
        }),
      });
    } else {
      console.log("DRIVER APPLICATION:", body);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Recruit API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
