import { NextResponse } from "next/server";
import { getLabWithProgress } from "@/lib/controllers/labController";

export async function GET(
  req: Request,
  context: { params: { id: string } } // Next.js may treat this as a Promise
) {
  // unwrap the params
  const params = await context.params; // <-- await the params
  const labId = params.id;
  const lab = await getLabWithProgress(Number(labId));
  return NextResponse.json(lab);
}
