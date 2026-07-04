import { NextRequest } from "next/server";
import crypto from "crypto";

// Validates the opaque admin token (SHA-256 of secret + adminEmail) issued by /api/admin-auth.
// The raw admin password/key is never sent to or stored in the browser.
export function isAuthorised(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@seehratransport.com";
  if (!adminKey && !adminPassword) return false; // fail closed
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
