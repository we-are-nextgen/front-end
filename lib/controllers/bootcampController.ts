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

