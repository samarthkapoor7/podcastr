"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, max = 100, ...props }, ref) => {
  // Ensure `max` is always greater than 0
  const safeMax = max > 0 ? max : 100;

  // Ensure `value` is a valid positive number and within range, otherwise default to `null` for indeterminate progress
  const safeValue =
    typeof value === "number" && value >= 0 && value <= safeMax ? value : null;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-black-5",
        className
      )}
      max={safeMax}
      value={safeValue}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="size-full flex-1 bg-white-1 transition-all"
        style={
          safeValue !== null
            ? { transform: `translateX(-${100 - (safeValue / safeMax) * 100}%)` }
            : undefined
        }
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
