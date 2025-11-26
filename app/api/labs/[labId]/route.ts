// app/api/labs/[labId]/route.ts
import { NextResponse } from "next/server";
import { getLab } from "@/lib/controllers/labController";

//export async function GET(req, { params }) {
export async function POST(req: Request, { params }: { params: { labId: string } }) {    
  const lab = await getLab(params.labId);
  return NextResponse.json(lab);
}
