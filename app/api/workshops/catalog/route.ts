import { NextResponse } from "next/server";
import { listWorkshops } from "@/lib/controllers/workshopController";

export async function GET() {
  try {
    const workshops = await listWorkshops();
    return NextResponse.json(workshops);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list workshops";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
