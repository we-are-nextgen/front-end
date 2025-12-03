"use client";

import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";



export default function StageProgress({ profile = null, journey = null}: { profile?: null; journey?: any; }) {
  // to get number of milestones
  const totalMilestones = journey?.stages.reduce(
                          (count, stage) => count + (stage.milestones?.length || 0),0);
  // number of user progress records
  const progressCount = profile?.userProgress?.length || 0; 
  // journey stages as per the journey setup
  const stages = journey?.stages;
  // the sequence of the current stage
  const currentStageSequence = profile?.stage?.sequence;
  // scale the progress on the progress bar
  const progress = (progressCount-1) / totalMilestones * 100;  
  // get current stage
  const currentStage = (progressCount-1) * (journey?.stages?.length) / (totalMilestones);  

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
            
            const stageProgress = profile?.userProgress?
              .filter(p => p.milestone.stageId === s.id)
              .sort((a, b) => a.id - b.id);

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
                    const completed = p?.status == "Completed";
                    const inprogress = p?.status == "In-Progress";
                    const skippable = p?.milestone?.skippable
                    return (
                      <p
                        key={p.id}
                        className={[
                          "flex items-center gap-2 text-xs mt-1",
                          completed && "text-green-600/80",
                          inprogress && "text-blue-600/80",
                          !completed && !inprogress && "text-gray-600/80"
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {/* Status icon */}
                        <span className="flex items-center">
                          {completed && (
                            <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                          )}

                          {inprogress && (
                            <Circle className="h-3.5 w-3.5 text-blue-600 fill-blue-600/20 animate-pulse" />
                          )}

                          {!completed && !inprogress && (
                            <Circle className="h-3.5 w-3.5 text-gray-400" />
                          )}
                        </span>

                        {/* Main label */}
                        <span className="flex items-center gap-2">
                          {p?.milestone?.name}

                          {/* Skippable tag */}
                          {skippable && (
                            <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded bg-orange-100 text-orange-600 border border-orange-300">
                              Skippable
                            </span>
                          )}
                        </span>
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
