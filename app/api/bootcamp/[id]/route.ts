import { NextResponse } from "next/server";
import { getBootcamp } from "@/lib/controllers/bootcampController";

export async function GET(
  req: Request,
  context: { params: { id: number } } 
) {
  const params = await context.params; 
  const id = params.id;
  const bootcamp = await getBootcamp(id);
  return NextResponse.json(bootcamp);
}
