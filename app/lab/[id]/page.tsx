import { getLabWithProgress, getLab} from "@/lib/controllers/labController";
import LabView from "../components/LabView";

export default async function LabPage(props: { params: Promise<{ id: string }> }) {
  
  const { id } = await props.params;
  const lab = await getLabWithProgress(id);
  //const lab = await getLab(labId);
  //const res = await fetch(`/api/lab/${labId}`, { method: "POST" });
  //const lab = await res.json();
  return <LabView labWithProgress={lab} />;
}
