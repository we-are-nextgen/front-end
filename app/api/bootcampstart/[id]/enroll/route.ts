import { NextResponse } from "next/server";
import { enrollUser } from "@/lib/controllers/bootcampController";

export async function POST(
  req: Request,
  context: { params: { id: number } }
) {
  const params = await context.params; // <-- await the params
  const bootcampStartId = params.id;
  console.log(bootcampStartId);
  const userBootcamp = await enrollUser(bootcampStartId);
  console.log(userBootcamp);
  return NextResponse.json(userBootcamp);
}
