import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "surface";
  hoverable?: boolean;
}

export function Card({ 
  children, 
  className,
  size = "md",
  variant = "default",
  hoverable = false,
  ...props 
}: CardProps) {
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const variantClasses = {
    default: "bg-card border",
    outline: "border",
    surface: "bg-surface",
  };

  return (
    <div 
      className={cn(
        "rounded-xl",
        sizeClasses[size],
        variantClasses[variant],
        hoverable && "transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}