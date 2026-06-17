import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-xs font-bold uppercase tracking-[0.22em] text-accent",
            align === "center" ? "justify-center" : "",
            "eyebrow-line"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display text-3xl font-medium leading-tight tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
