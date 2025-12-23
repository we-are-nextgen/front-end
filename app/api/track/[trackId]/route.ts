// app/api/enroll/[trackId]/route.ts
import { NextResponse } from "next/server";
import { enrollInTrack } from "@/lib/controllers/trackController";

export async function POST(req: Request, { params }: { params: { trackId: string } }) {
  const userLabProgress = await enrollInTrack(params.trackId);
  return NextResponse.json(userLabProgress);
}
