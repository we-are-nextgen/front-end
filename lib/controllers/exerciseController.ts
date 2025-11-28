import { restClient } from "@/lib/services/restClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function gradeExercise(labId: number, exerciseId: number, answer: any) {
  const session = await getServerSession(authOptions);
  const payload = {
    labId: labId,
    userId: session?.user?.email,
    submissions: [
      { exerciseId: exerciseId, answer: answer }
    ],
  };
  return restClient(`labs/grade`, {
    method: "POST",
    data: payload,
  });
}


export async function gradeAllExercises( payload: any) {
  return restClient(`labs/grade`, {
    method: "POST",
    data: payload,
  });
}



