import StageProgress from "../components/StageProgress";
import StageCard from "../components/Stage";
import BadgeCard from "../components/Badge";
import Bootcamp from "../components/Bootcamp";
import LearningTracksCard from "../components/Domain";
import MilestoneCard from "../components/Milestone";
import RecommendedActions from "../components/RecommendedActions";
import { getProfile } from "@/lib/controllers/profileController"
import { getJourney } from "@/lib/controllers/journeyController"

{/** icons */ }
import { Rocket, Circle, CheckCircle, ArrowRight, Play } from "lucide-react";


export default async function DashboardOverview() {
  const profile = await getProfile();
  const currentProgress = profile?.userProgress?.find(x => x.status === "In-Progress");
  const userJourney = await getJourney(profile?.stage?.journeyId);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome back 👋</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        { /* <StageCard profile={profile} /> */}
        <MilestoneCard profile={profile} />
        <LearningTracksCard profile={profile} />
        <Bootcamp profile={profile}/>
        <BadgeCard profile={profile} />
        
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StageProgress profile={profile} journey={userJourney} />
        <RecommendedActions domain="engineering" />
      </div>
    </div>
  );
}
