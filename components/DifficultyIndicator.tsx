"use client";

import { cn } from "@/lib/utils";

export default function DifficultyIndicator({ level }: { level: string }) {
  const map = {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    ADVANCED: 3,
  };

  const active = map[level as keyof typeof map] || 0;

  const colors = ["bg-green-500", "bg-yellow-500", "bg-red-500"];

  return (
    <div className="flex gap-1 mt-1">
      {colors.map((color, idx) => (
        <div
          key={idx}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-200",
            idx < active ? color : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );
}
