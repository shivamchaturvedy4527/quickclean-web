import { CmsImage } from "./CmsImage";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  breadcrumb?: string;
}

export function PageHero({ title, subtitle, image, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#071525] py-20 text-white">
      {image && (
        <>
          <CmsImage src={image} alt="" fill className="object-cover opacity-20" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071525] to-[#071525]/80" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumb && (
          <p className="text-sm font-medium text-teal-400">{breadcrumb}</p>
        )}
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
