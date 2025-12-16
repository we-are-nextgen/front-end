import { NextResponse } from "next/server";
import { getUserBootcamps } from "@/lib/controllers/bootcampController";

export async function GET(req: Request) {
  const stats = await getUserBootcamps();
  return NextResponse.json(stats);
}
