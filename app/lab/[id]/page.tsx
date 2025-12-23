import { getLabWithProgress } from "@/lib/controllers/labController";
import LabView from "../components/LabView";


interface LabPageProps {
  params: Promise<{ id: string }>; 
}

export default async function LabPage({ params }: LabPageProps) {
  const { id } = await params; // unwrap the Promise
  const lab = await getLabWithProgress(id);
  if (!lab) return <div>No lab found</div>;
  return <LabView labWithProgress={lab}/>;
}
