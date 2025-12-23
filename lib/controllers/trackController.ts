//"use server";
import "server-only";

import { restClient } from "../services/restClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

let profile: any | undefined;import "server-only";

export async function getTrackById(trackId: string) {
  return await restClient(`/tracks/${trackId}`);
}


export async function getUserTrackProgress(trackId: string) {
  const session = await getServerSession(authOptions);
  return await restClient(`/progress/email?trackId=${trackId}&email=${session?.user?.email}`);
}


export async function enrollInTrack(trackId: string) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  return await restClient(`/progress/${trackId}/enroll?email=${email}`, {
    method: "POST",
  });
}