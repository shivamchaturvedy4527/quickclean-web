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
    <section className="relative overflow-hidden gradient-navy py-20 text-white sm:py-24">
      {image && (
        <>
          <CmsImage src={image} alt="" fill className="object-cover opacity-25" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />
        </>
      )}
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      <Container className="relative">
        {breadcrumb && (
          <p className="text-sm font-medium tracking-wide text-accent-bright">{breadcrumb}</p>
        )}
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight sm:text-5xl lg:text-[3.25rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
