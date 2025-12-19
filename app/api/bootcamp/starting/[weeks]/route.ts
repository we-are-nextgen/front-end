import { NextResponse } from "next/server";
import { getStartingSoonBootcamps } from "@/lib/controllers/bootcampController";

export async function GET(
  req: Request,
  context: { params: { weeks: string } } // Next.js may treat this as a Promise
) {
  // unwrap the params
  const params = await context.params; // <-- await the params
  const weeks = params.weeks;
  const lab = await getStartingSoonBootcamps(Number(weeks));
  return NextResponse.json(lab);
}
