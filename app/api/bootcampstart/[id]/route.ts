import { NextResponse } from "next/server";
import { getBootcampStats } from "@/lib/controllers/bootcampController";

export async function GET(req: Request) {
  const stats = await getBootcampStats();
  return NextResponse.json(stats);
}
