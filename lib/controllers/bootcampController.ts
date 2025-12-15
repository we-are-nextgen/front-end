"use server";

import { restClient } from "../services/restClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

let profile: any | undefined;

export async function getBootcampStats() {
  return restClient(
    `/bootcamp/status/count`
  );
}

/**
 * entroll current user to a bootcamp, thorugh bootcamp start instance
 * @param bootcampStartId 
 * @returns 
 */
export async function enrollUser(bootcampStartId: number) {
  const session = await getServerSession(authOptions);
  const payload = {
    userId: session?.user?.email
  };
  return restClient(`bootcamp/${bootcampStartId}/enroll`, {
    method: "POST",
    data: payload,
  });
}
