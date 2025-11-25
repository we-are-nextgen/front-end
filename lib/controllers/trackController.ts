import { restClient } from "../services/restClient";
import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

let profile: any | undefined;

export async function getTrackById(trackId: number) {
  return await restClient(`/tracks/${trackId}`);
}


export async function getUserTrackProgress(trackId: number) {
  const session = await getServerSession(authOptions);
  return await restClient(`/progress/email?trackId=${trackId}&email=${session?.user?.email}`);
}
