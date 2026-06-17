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
            "eyebrow-line mb-4 text-xs font-bold uppercase tracking-wider text-accent",
            align === "center" ? "justify-center" : ""
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
