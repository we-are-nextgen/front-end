"use client"

import { useState } from "react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { cn } from "@/lib/utils";

export default function GamingBadgeCard({ profile = null }: { profile?: any }) {
  const badges = profile?.badges || [];

  // Paging state
  const PAGE_SIZE = 3;
  const [page, setPage] = useState(0);

  // Slice badges for current page
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentBatch = badges.slice(start, end);

  const remainingCount = badges.length - end;
  const hasPrev = page > 0;
  const hasNext = remainingCount > 0;

  const rarityStyles: Record<string, string> = {
    common: "from-gray-700 to-gray-900 border-gray-600",
    rare: "from-blue-600 to-blue-800 border-blue-500",
    epic: "from-purple-600 to-purple-800 border-purple-500",
    legendary: "from-yellow-500 to-orange-600 border-yellow-400",
  };

  return (
    <div className="p-4 rounded-lg bg-[#0B0F19] shadow-xl border border-gray-800">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center shadow-lg border-2 border-yellow-200">
            <DynamicIcon name="Award" className="w-6 h-6 text-white drop-shadow" />
          </div>
        </div>

        <h2 className="font-bold text-lg text-white">
          Badges
        </h2>
      </div>
      
      <div className="grid grid-cols-4 gap-1">
        {/* Show current batch of 3 */}
        {currentBatch.map((b) => {
          const rarity = b.badge.rarity;

          return (
            <div key={b.id} className="flex justify-center flex-col">
              <div
                className={cn(
                  "relative w-22 p-1 rounded-xl border shadow-lg text-center text-white",
                  "bg-gradient-to-b hover:scale-105 hover:z-50 transition-transform duration-200",
                  rarityStyles[rarity]
                )}
              >
                <div className="absolute inset-0 rounded-xl blur-xl opacity-20 bg-white"></div>

                {/* Icon */}
                <div className="flex justify-center relative mb-1">
                  <div className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md">
                    <DynamicIcon
                      name={b.badge.icon}
                      className="h-5 w-5 text-white"
                    />
                  </div>
                </div>

                {/* Title */}
                <p className="text-[10px] font-semibold leading-tight">
                  {b.badge.name}
                </p>

                {/* XP */}
                {b.badge.xp && (
                  <p className="text-[9px] text-green-300 mt-1">+{b.badge.xp} XP</p>
                )}

                {/* Level */}
                {b.badge.levelUp && (
                  <p className="text-[9px] text-yellow-300 mt-1">
                    Level {b.badge.levelUp}
                  </p>
                )}

                {/* Date */}
                <p className="text-[9px] text-gray-300 mt-1">
                  {new Date(b.earnedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          );
        })}

        {/* NEXT button */}
        {hasNext && (
          <button
            onClick={() => setPage(page + 1)}
            className="
              w-16 flex flex-col items-center justify-center
              rounded-xl border border-indigo-500
              bg-indigo-700/30 text-white shadow-lg backdrop-blur-md
              hover:scale-105 transition font-semibold
            "
          >
            <span className="text-xs">+{remainingCount}</span>
            <span className="text-[10px] text-gray-300">More</span>
          </button>
        )}

        {/* PREV button */}
        {hasPrev && (
          <button
            onClick={() => setPage(page - 1)}
            className="
              w-16 flex flex-col items-center justify-center
              rounded-xl border border-gray-500
              bg-gray-700/30 text-white shadow-lg backdrop-blur-md
              hover:scale-105 transition font-semibold
            "
          >
            <span className="text-xs">← Back</span>
          </button>
        )}
      </div>
    </div>
  );
}








