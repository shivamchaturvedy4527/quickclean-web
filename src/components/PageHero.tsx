import { CmsImage } from "./CmsImage";
import { Container } from "./ui/Container";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  breadcrumb?: string;
}

export function PageHero({ title, subtitle, image, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden gradient-navy py-24 text-white sm:py-28">
      {image && (
        <>
          <CmsImage src={image} alt="" fill className="object-cover opacity-20" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/92 to-navy-light/85" />
        </>
      )}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <Container className="relative">
        {breadcrumb && (
          <p className="eyebrow-line text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
            {breadcrumb}
          </p>
        )}
        <h1 className="font-display mt-4 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
