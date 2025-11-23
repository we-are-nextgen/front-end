"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MiniPercentageBadgeProps {
  value: number // 0-100
  size?: number // diameter in px
}

export function MiniPercentageBadge({ value, size = 32 }: MiniPercentageBadgeProps) {
  const rounded = Math.round(value)

  // Color rules
  const colorClass =
    rounded < 60
      ? "bg-red-600 text-white"
      : rounded < 85
        ? "bg-blue-600 text-white"
        : "bg-green-600 text-white"

  return (
    <Badge
      className={cn(
        "flex items-center justify-center rounded-ss-4xl rounded-ee-4xl rounded-se-4xl font-medium shadow-sm",
        "px-4 py-4 text-xs", // keep your small font & padding
        colorClass // dynamic color
      )}
      style={{ width: size, height: size, minWidth: size }}
    >
      {rounded}%
    </Badge>
  )
}
