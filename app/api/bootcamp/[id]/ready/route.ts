import { NextResponse } from "next/server";
import { isBootcampReadyForEnrollment } from "@/lib/controllers/bootcampController";

export async function GET(
  req: Request,
  context: { params: { id: string } } 
) {
  const params = await context.params; 
  const id = params.id;
  const bootcamp = await isBootcampReadyForEnrollment(id);
  return NextResponse.json(bootcamp);
}
