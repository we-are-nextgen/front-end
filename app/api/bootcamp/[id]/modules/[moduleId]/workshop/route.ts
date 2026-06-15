import { NextResponse } from "next/server";
import { getModuleWorkshop } from "@/lib/controllers/workshopController";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string; moduleId: string }> }
) {
  const { id, moduleId } = await context.params;
  const workshop = await getModuleWorkshop(id, moduleId);

  if (!workshop?.workshopName) {
    return NextResponse.json(
      { error: "No Educates workshop configured for this module" },
      { status: 404 }
    );
  }

  return NextResponse.json(workshop);
}
