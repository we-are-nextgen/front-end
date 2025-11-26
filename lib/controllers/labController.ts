"use server";

import { restClient } from "../services/restClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

let profile: any | undefined;

export async function completeLab(labId: number) {
  const session = await getServerSession(authOptions);
  return restClient(
    `progress/lab/complete/${labId}?email=${session?.user?.email}`,
    { method: "POST" }
  );
}


export async function getLab(labId: number) {
  return restClient(
    `labs/${labId}`
  );
}
