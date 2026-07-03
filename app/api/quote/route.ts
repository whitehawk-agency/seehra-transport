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
                  await Promise.all([
                            fetch("https://api.resend.com/emails", {
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
                            }),
                            // Auto-reply sales email to customer, sent immediately
                            fetch("https://api.resend.com/emails", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
                                        body: JSON.stringify({
                                                      from: "Seehra Transport <noreply@seehratransport.com>",
                                                      to: [email],
                                                      subject: "Thanks for your quote request — Seehra Transport",
                                                      html: `
                                                                    <p>Hi ${esc(name)},</p>
                                                                                  <p>Thanks for requesting a quote from Seehra Transport — we've received your request for <strong>${esc(service)}</strong> from ${esc(collection)} to ${esc(delivery)}, and someone from our team will get back to you shortly with pricing.</p>
                                                                                                <p>In the meantime, here's a quick look at what we offer:</p>
                                                                                                              <ul>
                                                                                                                              <li><strong>Same-Day Courier</strong> — 4–6hr delivery, from £24.99</li>
                                                                                                                                              <li><strong>Next-Day Express</strong> — AM/PM/Evening slots, from £12.99</li>
                                                                                                                                                              <li><strong>Standard Delivery</strong> — 2–3 working days, from £4.99</li>
                                                                                                                                                                              <li><strong>Multi-Drop &amp; Last-Mile Logistics</strong> — for businesses needing multi-stop or recurring routes</li>
                                                                                                                                                                                            </ul>
                                                                                                                                                                                                          <p>All deliveries include full tracking and proof of delivery, with no hidden fees.</p>
                                                                                                                                                                                                                        <p>Need something sooner? Call us directly on <strong>07990 702743</strong>.</p>
                                                                                                                                                                                                                                      <p>Speak soon,<br>The Seehra Transport Team</p>
                                                                                                                                                                                                                                                  `,
                                        }),
                            }),
                          ]);
          } else {
                  console.log("QUOTE REQUEST:", body);
          }

      return NextResponse.json({ success: true });
    } catch (err) {
          console.error("Quote API error:", err);
          return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
