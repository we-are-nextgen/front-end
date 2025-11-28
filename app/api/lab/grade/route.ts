import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { restClient } from "@/lib/services/restClient";
import { gradeAllExercises } from "@/lib/controllers/exerciseController";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const payload = await req.json();
  payload.userId = session?.user?.email;
  const response = await gradeAllExercises( payload);
  /*const response = await restClient("labs/grade", {
    method: "POST",
    data: payload,
  });*/
  return NextResponse.json(response);
}
