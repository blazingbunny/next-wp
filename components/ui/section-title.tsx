import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionTitle({ 
  title, 
  subtitle, 
  className,
  align = "center" 
}: SectionTitleProps) {
  return (
    <div className={cn(
      "space-y-4",
      align === "center" ? "text-center" : "text-left",
      className
    )}>
      <h2 className="text-4xl font-bold md:text-5xl">{title}</h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground md:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}