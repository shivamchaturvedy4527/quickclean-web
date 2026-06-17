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
    <section className="relative overflow-hidden gradient-primary py-20 text-white sm:py-24">
      {image && (
        <>
          <CmsImage src={image} alt="" fill className="object-cover opacity-15" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary-light/90" />
        </>
      )}
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <Container className="relative">
        {breadcrumb && (
          <p className="eyebrow-line text-xs font-semibold uppercase tracking-wider text-accent-bright">
            {breadcrumb}
          </p>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
