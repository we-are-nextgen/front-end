"use server";

import { restClient } from "../services/restClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export interface WorkshopSessionResponse {
  sessionActivationUrl: string;
  sessionName?: string;
  workshopName?: string;
  environmentName?: string;
  userId?: string;
}

export interface WorkshopCatalogEntry {
  name: string;
  title?: string;
  description?: string;
  capacity?: number;
  available?: number;
  allocated?: number;
}

export interface ModuleWorkshop {
  moduleId: string;
  moduleName: string;
  workshopName?: string;
  labSlug?: string;
}

export async function listWorkshops(): Promise<WorkshopCatalogEntry[]> {
  return restClient<WorkshopCatalogEntry[]>("/workshops");
}

export async function createWorkshopSession(
  workshopName: string,
  returnPath?: string
): Promise<WorkshopSessionResponse> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    throw new Error("Authentication required");
  }

  const nameParts = session.user?.name?.split(" ") ?? [];
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;

  return restClient<WorkshopSessionResponse>(
    `/workshops/sessions?email=${encodeURIComponent(email)}`,
    {
      method: "POST",
      data: {
        workshopName,
        returnPath,
        firstName,
        lastName,
      },
    }
  );
}

export async function getModuleWorkshop(
  bootcampId: string,
  moduleId: string
): Promise<ModuleWorkshop | null> {
  try {
    return await restClient<ModuleWorkshop>(
      `/bootcamp/${bootcampId}/modules/${moduleId}/workshop`
    );
  } catch {
    return null;
  }
}
