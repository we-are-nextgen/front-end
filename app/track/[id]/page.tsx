import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import TrackHeader from "../components/TrackHeader";
import LabCard from "../components/LabCard";
import ProgressBar from "../components/ProgressBar";

import { getTrackById, getUserTrackProgress } from "@/lib/controllers/trackController";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function TrackPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const trackId =  Number(id);
  const track = await getTrackById(trackId);
  const labs = track?.labs;
  const progress= await getUserTrackProgress(trackId); 

  // Example structure: { enrolled: true, completedLabs: [1,2], progress: 40 }
  //const progress = { enrolled: true, completedLabs: [1], progress: 40 };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pl-2 pr-2">
      <Header />
      <Link href="/dashboard/it-professional">
          <Button variant="ghost" className="mb-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      <TrackHeader track={track} progress={progress} />
      <ProgressBar value={progress.enrolled?progress.progress:0} />
      <h2 className="text-xl font-bold text-white-900 mt-4">Labs</h2>
      <div className="space-y-3" >
        {labs.map(lab => (
          <LabCard
            key={lab.id}
            lab={lab}
            completedLab={progress.completedLabs.find(findLab => findLab.labId === lab.id)}
            trackEnrolled={progress.enrolled}
            current={progress.currentLabId}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
