import { NextResponse } from "next/server";
import { createWorkshopSession } from "@/lib/controllers/workshopController";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { workshopName, returnPath } = body;

    if (!workshopName) {
      return NextResponse.json(
        { error: "workshopName is required" },
        { status: 400 }
      );
    }

    const session = await createWorkshopSession(workshopName, returnPath);
    return NextResponse.json(session);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create workshop session";
    const status = message.includes("capacity") ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
