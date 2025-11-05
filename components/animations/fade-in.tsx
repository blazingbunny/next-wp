import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeIn({ 
  children, 
  className,
  delay = 0,
  direction = "up" 
}: FadeInProps) {
  return (
    <div 
      className={cn(
        "animate-fade-up",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: 0 // Start invisible
      }}
    >
      {children}
    </div>
  );
}