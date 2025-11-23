"use client";

import { MiniPercentageBadge } from "./MiniRadialProgress";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import Link from "next/link";
import { SquareMousePointer } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StageCard({ profile = null }: { profile?: any }) {
  const stage = profile?.stage;

  // Temporary hardcoded values
  stage.othersCount = 130;
  stage.userTime = 270;
  stage.avgTime = 250;

  const completion = (stage.avgTime / stage.userTime) * 100;

  return (
    <div className="relative p-4 rounded-xl bg-white shadow-xl overflow-hidden">
      {/* ---- HEADER WITH MEDAL STYLE ---- */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center shadow-lg border-2 border-yellow-200">
            <DynamicIcon name={stage.icon} className="w-6 h-6 text-white drop-shadow" />
          </div>
        </div>

        <h2 className="font-bold text-lg text-gray-800">
          Current Stage
        </h2>
      </div>

      {/* ---- GRID ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* LEFT */}
        <div className="space-y-1">
          <div className="text-sm text-gray-700">
            {stage.name}
            <br />
            <span className="text-[10px] text-gray-500">{stage.description}</span>
          </div>

          <div className="items-center justify-between pt-2">
            <Link href={`/stage/${stage.id}`} className="no-underline">
              <Badge variant="default" className="text-[10px] flex gap-1 items-center">
                <SquareMousePointer size={10} /> {stage.othersCount} users
              </Badge>
            </Link>
            <div className="px-1.5 text-[10px] text-gray-500">@ this stage</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-xs text-gray-500 mb-1">You vs others [days]</div>

          <MiniPercentageBadge
            value={completion}
            size={60}
            className={cn(
              completion >= 100 && "drop-shadow-[0_0_10px_gold] animate-pulse"
            )}
          />

          <span className="text-xs text-gray-700 mt-1">Performance</span>
        </div>
      </div>      
    </div>
  );
}
