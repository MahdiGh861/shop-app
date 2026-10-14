import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border border-border/80 bg-background px-4 py-2.5 text-base transition-all duration-300 outline-none shadow-sm hover:border-border file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-bold file:text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary/60 focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:shadow-soft disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive/80 aria-invalid:ring-4 aria-invalid:ring-destructive/15 md:text-sm dark:bg-input/30 dark:hover:border-white/20 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/60 dark:aria-invalid:ring-destructive/30",
        className
      )}
      {...props}
    />
  )
}

export { Input }
