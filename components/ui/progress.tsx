'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  showValue?: boolean
}

function Progress({ className, value = 0, showValue = true, ...props }: ProgressProps) {
  const roundedValue = Math.round(value)

  return (
    <div className="relative w-full">
      {/* Progress value on top, above the filled portion */}
      {showValue && (
        <span
          className="absolute -top-3 text-[10px] font-medium text-gray-700"
          style={{ left: `calc(${roundedValue}% - 0.75rem)` }} // adjust so the value centers over the bar
        >
          {roundedValue}%
        </span>
      )}

      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-primary h-full transition-all"
          style={{ transform: `translateX(-${100 - roundedValue}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

export { Progress }
