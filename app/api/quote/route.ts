import { NextRequest, NextResponse } from "next/server";
import { esc, isValidEmail } from "@/lib/sanitize";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, collection, delivery, service, weight, details } = body;

    if (!name || !email || !collection || !delivery || !service) {
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
          to: ["admin@seehratransport.com"],
          reply_to: email,
          subject: `New Quote Request — ${esc(service)} from ${esc(collection)} to ${esc(delivery)}`,
          html: `
            <h2>New Quote Request</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #eee">${esc(name)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee">${esc(email)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #eee">${esc(phone || "Not provided")}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Collection Postcode</td><td style="padding:8px;border:1px solid #eee">${esc(collection)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Delivery Postcode</td><td style="padding:8px;border:1px solid #eee">${esc(delivery)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Service</td><td style="padding:8px;border:1px solid #eee">${esc(service)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Weight</td><td style="padding:8px;border:1px solid #eee">${esc(weight || "Not specified")}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Details</td><td style="padding:8px;border:1px solid #eee">${esc(details || "None")}</td></tr>
            </table>
          `,
        }),
      });
    } else {
      console.log("QUOTE REQUEST:", body);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
