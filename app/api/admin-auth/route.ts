import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@seehratransport.com";
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminKey = process.env.ADMIN_KEY;

    if (!adminPassword && !adminKey) {
      return NextResponse.json({ error: "Admin credentials not configured on server" }, { status: 401 });
    }

    const emailMatch = email?.toLowerCase() === adminEmail?.toLowerCase();
    const passwordMatch = adminPassword ? password === adminPassword : password === adminKey;

    if (emailMatch && passwordMatch) {
      const token = adminKey || `${adminEmail}:${adminPassword}`;
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
