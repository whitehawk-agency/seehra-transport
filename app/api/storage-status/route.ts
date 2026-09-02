import { NextResponse } from "next/server";
import { usingPersistentStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ persistent: usingPersistentStore() });
}
