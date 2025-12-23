// lib/postsService.ts
import { Console } from "console";
import { restClient } from "../services/restClient";
import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

let profile: any | undefined;

export async function getProfile(): Promise<any> {
    //if (profile) return profile;
    const session = await getServerSession(authOptions);
    profile = await restClient<any>(`/profile/userid/${session?.user?.email}`);
    //console.log(profile);
    return profile;
}
 

