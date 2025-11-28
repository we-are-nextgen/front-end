import { restClient } from "@/lib/services/restClient";


export async function gradeExercise(labId: number, exerciseId: number, answer: any) {
  const payload = {
    labId: labId,
    submissions: [
      { exerciseId: exerciseId, answer: answer }
    ],
  };
  return restClient(`labs/grade`, {
    method: "POST",
    data: payload,
  });
}



export async function gradeExercise1(labId: number, exerciseId: number, answer: any) {
  const payload = {
    labId: labId,
    submissions: [
      { exerciseId: exerciseId, answer: answer }
    ],
  };

  

  return restClient(`labs/grade`, {
    method: "POST",
    data: JSON.stringify({
      labId,
      exerciseId,
      answer
    }),
  });
}
