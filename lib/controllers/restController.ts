// lib/postsService.ts
import { restClient } from "../services/restClient";

export type Profile = {
  id: number,
  name: string,
  description: string,
  skills: string,
};


export type Domain = {
  id: number,
  name: string,
  description: string,
  community: string,
  icon: string,
  profiles: Profile[],
};

export async function getDomains(): Promise<Domain[]> {
  return restClient<Domain[]>("/domains");
}
