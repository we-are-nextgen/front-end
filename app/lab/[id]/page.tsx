import { getLabWithProgress } from "@/lib/controllers/labController";
import { createWorkshopSession } from "@/lib/controllers/workshopController";
import LabView from "../components/LabView";

interface LabPageProps {
  params: Promise<{ id: string }>;
}

export default async function LabPage({ params }: LabPageProps) {
  const { id } = await params;
  const labWithProgress = await getLabWithProgress(id);
  if (!labWithProgress) return <div>No lab found</div>;

  const workshopName = labWithProgress?.lab?.educatesWorkshopName;
  let sessionActivationUrl: string | null = null;
  let educatesError: string | null = null;

  if (workshopName) {
    try {
      const session = await createWorkshopSession(workshopName, `/lab/${id}`);
      sessionActivationUrl = session.sessionActivationUrl;
    } catch (error) {
      educatesError =
        error instanceof Error
          ? error.message
          : "Failed to start Educates workshop session";
    }
  }

  return (
    <LabView
      labWithProgress={labWithProgress}
      sessionActivationUrl={sessionActivationUrl}
      educatesError={educatesError}
    />
  );
}
