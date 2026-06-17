import { CmsImage } from "./CmsImage";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { SectionReveal } from "./SectionReveal";
import type { PressingMachinesContent } from "@/types/cms";

type PressingMachinesGridProps = {
  content: PressingMachinesContent;
  compact?: boolean;
};

export function PressingMachinesGrid({ content, compact }: PressingMachinesGridProps) {
  if (!content.items.length) return null;

  return (
    <section className={compact ? "mt-14" : "section-pad"}>
      <Container>
        {!compact && (
          <SectionReveal>
            <SectionHeading title={content.title} subtitle={content.subtitle} />
          </SectionReveal>
        )}
        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${compact ? "" : "mt-14"}`}>
          {content.items.map((item, i) => (
            <SectionReveal key={item.name} delay={i * 0.04}>
              <div className="card card-lift group overflow-hidden rounded-2xl p-0">
                <div className="relative aspect-square overflow-hidden bg-gray-50/50">
                  {item.image ? (
                    <CmsImage
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">No image</div>
                  )}
                </div>
                <div className="border-t border-gray-100 p-4">
                  <h3 className="text-sm font-semibold leading-snug text-primary">{item.name}</h3>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
