"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, max = 100, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-black-5",
      className
    )}
    max={max} // Set the max value here
    value={value ?? 0} // Provide a fallback value for `value` in case it's `null`
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="size-full flex-1 bg-white-1 transition-all"
      style={{ transform: `translateX(-${100 - ((value ?? 0) / max) * 100}%)` }} // Ensure safe handling of `value`
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
