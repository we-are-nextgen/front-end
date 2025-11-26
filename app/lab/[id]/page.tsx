import { getLab } from "@/lib/controllers/labController";
import LabView from "../components/LabView";

export default async function LabPage({ params }) {
  const labId = Number(params.id);
  const lab = await getLab(labId);
  //const res = await fetch(`/api/lab/${labId}`, { method: "POST" });
  //const lab = await res.json();
  return <LabView initialLab={lab} />;
}
