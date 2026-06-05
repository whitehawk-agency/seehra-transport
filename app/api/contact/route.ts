import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, enquiry, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send via Resend (set RESEND_API_KEY in Vercel env vars)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: "Seehra Transport <noreply@seehratransport.com>",
          to: ["info@seehratransport.com"],
          reply_to: email,
          subject: `New Contact Enquiry — ${enquiry || "General"} from ${firstName} ${lastName}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #eee">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee">${email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #eee">${phone || "Not provided"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Enquiry Type</td><td style="padding:8px;border:1px solid #eee">${enquiry || "Not specified"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #eee">${message}</td></tr>
            </table>
          `,
        }),
      });
    } else {
      // Log to console if no email service configured (dev mode)
      console.log("CONTACT FORM:", { firstName, lastName, email, phone, enquiry, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
