import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

export function Grid({ 
  children, 
  className,
  cols = 3,
  gap = "md",
  ...props 
}: GridProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <div 
      className={cn(
        "grid",
        colClasses[cols],
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}