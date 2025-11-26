import { NextResponse } from "next/server";
import { getLab } from "@/lib/controllers/labController";


export async function POST(req: Request, { params }: { params: { labId: string } }) {
  const lab = await getLab(Number(params.labId));
  return NextResponse.json(lab);
}

