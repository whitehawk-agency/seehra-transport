import { NextRequest, NextResponse } from "next/server";
import { esc, isValidEmail } from "@/lib/sanitize";

export async function POST(req: NextRequest) {
    try {
          const body = await req.json();
          const { firstName, lastName, email, phone, enquiry, message } = body;

      if (!firstName || !email || !message) {
              return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
          if (!isValidEmail(email)) {
                  return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
          }

      // Send via Resend (set RESEND_API_KEY in Vercel env vars)
      const resendKey = process.env.RESEND_API_KEY;
          if (resendKey) {
                  await Promise.all([
                            // Notify admin
                                            fetch("https://api.resend.com/emails", {
                                                        method: "POST",
                                                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
                                                        body: JSON.stringify({
                                                                      from: "Seehra Transport <noreply@seehratransport.com>",
                                                                      to: ["admin@seehratransport.com"],
                                                                      reply_to: email,
                                                                      subject: `New Contact Enquiry — ${esc(enquiry || "General")} from ${esc(firstName)} ${esc(lastName)}`,
                                                                      html: `
                                                                                    <h2>New Contact Form Submission</h2>
                                                                                                  <table style="border-collapse:collapse;width:100%">
                                                                                                                  <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #eee">${esc(firstName)} ${esc(lastName)}</td></tr>
                                                                                                                                  <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee">${esc(email)}</td></tr>
                                                                                                                                                  <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #eee">${esc(phone || "Not provided")}</td></tr>
                                                                                                                                                                  <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Enquiry Type</td><td style="padding:8px;border:1px solid #eee">${esc(enquiry || "Not specified")}</td></tr>
                                                                                                                                                                                  <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #eee">${esc(message)}</td></tr>
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
                                                      subject: "Thanks for reaching out to Seehra Transport",
                                                      html: `
                                                                    <p>Hi ${esc(firstName)},</p>
                                                                                  <p>Thanks for getting in touch with Seehra Transport — we've received your message and someone from our team will get back to you shortly.</p>
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
                  // Log to console if no email service configured (dev mode)
            console.log("CONTACT FORM:", { firstName, lastName, email, phone, enquiry, message });
          }

      return NextResponse.json({ success: true });
    } catch (err) {
          console.error("Contact API error:", err);
          return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
