import { DynamicIcon } from "@/components/ui/DynamicIcon";
import DifficultyIndicator from "@/components/DifficultyIndicator";
import { AlarmClock, AlarmClockCheck } from "lucide-react"


export default function LabCard({ lab, completedLab, trackEnrolled, current }) {
  const completed = trackEnrolled && completedLab;
  return (
    <div className="p-3 rounded-xl bg-white shadow border hover:shadow-md transition cursor-pointer">

      <div className="flex items-start gap-3">

        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50">
          <DynamicIcon name={lab.icon} className="text-indigo-600 w-5 h-5" />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            {current!=lab.id  && completed && <AlarmClockCheck />}
            {current==lab.id && <AlarmClock />}
            {lab.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2">
            {lab.description}
          </p>

          <div className="flex items-center gap-3 mt-1">
            <DifficultyIndicator level={lab.difficultyLevel} />
            <span className="text-[10px] text-gray-500">{lab.estimatedTimeMin} min</span>
            <span className="text-[10px] text-green-700"> {completed && " Earned " + completedLab.points + " pts"}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
