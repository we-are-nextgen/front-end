//"use server";

import "server-only";

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
  const email = session?.user?.email;
  return restClient(`bootcamp/${bootcampStartId}/enroll?email=${email}`, {
    method: "POST"
  });
}

/**
 * get user bootcamps
 * @returns 
 */
export async function getUserBootcamps() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  return restClient(`bootcamp/user?email=${email}`);
}

/**
 * get bootcamps starting in weeks
 * @param weeks 
 * @returns 
 */
export async function getStartingSoonBootcamps(weeks: number) {
  return restClient(`bootcamp/starting/${weeks}`);
}


/**
 * get bootcamp by id 
 * @param id 
 * @returns 
 */
export async function getBootcamp(id: number) {
  return restClient(`bootcamp/${id}`);
}

/**
 * check if the bootcamp is ready for enrollment 
 * @param id 
 * @returns 
 */
export async function isBootcampReadyForEnrollment(id: number){
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  return restClient(`bootcamp/${id}/ready?email=${email}`);
}