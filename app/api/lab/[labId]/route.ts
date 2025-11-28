import { NextResponse } from "next/server";
import { getLabWithProgress } from "@/lib/controllers/labController";


export async function POST(req: Request, { params }: { params: { labId: string } }) {
  const lab = await getLabWithProgress(Number(params.labId));
  return NextResponse.json(lab);
}

