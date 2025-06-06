import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ProductFilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

export function ProductFilterButton({
  active = false,
  className,
  children,
  ...props
}: ProductFilterButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-full font-medium text-sm transition-colors duration-300",
        active 
          ? "bg-[hsl(142,43%,35%)] text-white" 
          : "bg-[hsl(195,47%,92%)] text-[hsl(120,10%,10%)] hover:bg-[hsl(195,47%,85%)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
