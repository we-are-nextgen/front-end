import TrackHeader from "../components/TrackHeader";
import LabCard from "../components/LabCard";
import ProgressBar from "../components/ProgressBar";

import { getTrackById, getUserTrackProgress } from "@/lib/controllers/trackController";

export default async function TrackPage({ params }: { params: { id: number } }) {
  const trackId = Number(params.id);
  const track = await getTrackById(trackId);
  const labs = track.labs;
  const progress= await getUserTrackProgress(trackId);

  // Example structure: { enrolled: true, completedLabs: [1,2], progress: 40 }
  //const progress = await getUserTrackProgress(trackId);
  //const progress = { enrolled: true, completedLabs: [1], progress: 40 };
  //const progress = { enrolled: true, completedLabs: [1], progress: 40 };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <TrackHeader track={track} progress={progress} />

      <ProgressBar value={progress.enrolled?progress.progress:0} />

      <h2 className="text-xl font-bold text-gray-900 mt-4">Labs</h2>

      <div className="space-y-3">
        {labs.map(lab => (
          <LabCard
            key={lab.id}
            lab={lab}
            completed={progress.enrolled && progress.completedLabs?.includes(lab.id)}
          />
        ))}
      </div>

    </div>
  );
}
