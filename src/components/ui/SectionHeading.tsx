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
        align === "center" && "mx-auto max-w-4xl text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow-line mb-4 text-xs font-bold uppercase tracking-widest text-accent",
            align === "center" ? "justify-center" : ""
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-primary sm:text-5xl lg:text-6xl"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className="mt-6 text-balance text-lg leading-relaxed text-gray-500 sm:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
