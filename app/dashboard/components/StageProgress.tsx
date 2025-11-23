"use client";

import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";



export default function StageProgress({ profile = null, journey = null}: { profile?: null; journey?: any; }) {
  const totalMilestones = journey?.stages.reduce(
                          (count, stage) => count + (stage.milestones?.length || 0),0);
  const progressCount = profile?.userProgress?.length || 0;
  const stages = journey?.stages;
  const currentStageSequence = profile?.stage?.sequence;
  // scale the progress on the progress bar
  const currentStage = (progressCount-1) * (journey?.stages?.length) / (totalMilestones);  
  const progress = (currentStage / stages.length) * 100;

  return (
    <div className="p-4 border-b-current rounded-lg bg-white shadow-lg">
      <h2 className="font-semibold text-lg mb-3">Journey Progress</h2>
      <p className="pb-2 text-sm text-gray-600 mb-2">
        Current Stage: <span className="font-medium text-primary">{profile?.stage?.name}</span>
      </p>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        {stages?.map((stage) => (
          <span key={stage.id} className={stage?.sequence === currentStage ? "text-primary font-medium" : ""}>
            {stage?.sequence}
          </span>
        ))}
      </div>


        <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-2 top-0 h-full w-[2px] bg-gray-300"></div>

        <ul className="space-y-6">
          {stages.map((s) => {
            const isCompleted = s.sequence < currentStageSequence;
            const isCurrent = s.sequence === currentStageSequence;
            
            const stageProgress = profile?.userProgress?.filter(
              (x) => x.milestone.stageId === s.id
            );
            

            return (
              <li key={s.id} className="relative flex items-start gap-3">
                {/* Icon */}
                <span className="mt-0.5">
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : isCurrent ? (
                    <Circle className="h-5 w-5 text-blue-600 fill-blue-600/10" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </span>

                <div>
                  <p
                    className={[
                      "font-medium", "left-1.5",
                      isCompleted && "text-green-700",
                      isCurrent && "text-blue-700",
                      !isCompleted && !isCurrent && "text-gray-600",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {s?.name} 
                  </p>
                  
                  {/** list milestones per stage  */}
                  { 
                  stageProgress.map((p) => {
                    const done = p?.status == "Completed";
                    return (
                      <p key={p.id}
                        className={[
                          "text-xs", "mt-1",
                          done && "text-green-600/70",
                          !done && "text-blue-600/70",
                        ]
                        .filter(Boolean)
                        .join(" ")}
                        >
                        {!done && (
                            <span> You’re here → </span>
                        )}
                        {p?.milestone?.name}
                      </p>
                    )
                    }
                  )
                  }
                </div>
              </li>
            );
          })}
        </ul>
      </div>





    </div>
  );
}
