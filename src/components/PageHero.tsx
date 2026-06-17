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
          <div className="absolute inset-0">
            <CmsImage src={image} alt="" fill className="object-cover opacity-20" sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-primary/85" />
        </>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

      <Container className="relative">
        {breadcrumb && (
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-bright">
            {breadcrumb}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
