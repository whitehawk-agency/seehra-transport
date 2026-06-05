import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, collection, delivery, service, weight, details } = body;

    if (!name || !email || !collection || !delivery || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: "Seehra Transport <noreply@seehratransport.com>",
          to: ["info@seehratransport.com"],
          reply_to: email,
          subject: `New Quote Request — ${service} from ${collection} to ${delivery}`,
          html: `
            <h2>New Quote Request</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #eee">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee">${email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #eee">${phone || "Not provided"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Collection Postcode</td><td style="padding:8px;border:1px solid #eee">${collection}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Delivery Postcode</td><td style="padding:8px;border:1px solid #eee">${delivery}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Service</td><td style="padding:8px;border:1px solid #eee">${service}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Weight</td><td style="padding:8px;border:1px solid #eee">${weight || "Not specified"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Details</td><td style="padding:8px;border:1px solid #eee">${details || "None"}</td></tr>
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
