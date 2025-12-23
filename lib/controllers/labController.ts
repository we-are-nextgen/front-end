"use server";

import { restClient } from "../services/restClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

let profile: any | undefined;

export async function completeLab(labId: string, trackId: number) {
  const session = await getServerSession(authOptions);
  return restClient(
    `progress/lab/complete/${labId}?email=${session?.user?.email}&trackId=${trackId}`,
    { method: "POST" }
  );
}


export async function getLab(labId: string) {
  return restClient(
    `labs/${labId}`
  );
}

export async function getLabWithProgress(labId: string) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  return restClient(
    `labs/progress/${labId}?email=${email}`
  );
}
