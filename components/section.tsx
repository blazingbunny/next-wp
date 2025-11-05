import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Section({
  children,
  className,
  size = "md",
  ...props
}: SectionProps) {
  const sizeClasses = {
    sm: "py-12",
    md: "py-16 md:py-24",
    lg: "py-24 md:py-32",
  };

  return (
    <section
      className={cn(sizeClasses[size], "relative w-full", className)}
      {...props}
    >
      {children}
    </section>
  );
}