import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Constant-time string comparison to prevent timing attacks
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still run a comparison to keep timing constant
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@seehratransport.com";
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminKey = process.env.ADMIN_KEY;

    if (!adminPassword && !adminKey) {
      return NextResponse.json({ error: "Admin access is not configured." }, { status: 401 });
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Small fixed delay to slow down brute-force attempts
    await new Promise((r) => setTimeout(r, 400));

    const expectedPassword = adminPassword || adminKey || "";
    const emailMatch = safeEqual(email.toLowerCase().trim(), adminEmail.toLowerCase().trim());
    const passwordMatch = safeEqual(password, expectedPassword);

    if (emailMatch && passwordMatch) {
      // Return an opaque token (SHA-256 of the secret) — never the password itself
      const token = crypto.createHash("sha256").update(expectedPassword + adminEmail).digest("hex");
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
