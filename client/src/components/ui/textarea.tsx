import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, onFocus, ...props }, ref) => {
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    // Clear placeholder on focus
    e.currentTarget.setAttribute('data-placeholder', e.currentTarget.placeholder);
    e.currentTarget.placeholder = '';
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    // Restore placeholder on blur if no value
    const originalPlaceholder = e.currentTarget.getAttribute('data-placeholder');
    if (!e.currentTarget.value && originalPlaceholder) {
      e.currentTarget.placeholder = originalPlaceholder;
    }
  };

  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
