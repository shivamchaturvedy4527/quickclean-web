const DEFAULT_HERO = "/images/ppt/slide10_img01.png";

interface HeroVisualProps {
  image?: string;
}

export function HeroVisual({ image }: HeroVisualProps) {
  const heroImage = image || DEFAULT_HERO;

  return (
    <div className="relative w-full">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-accent-bright opacity-20 blur-xl transition-all duration-1000 group-hover:opacity-40"></div>
      <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl shadow-primary/20 ring-1 ring-gray-900/5">
        <img
          src={heroImage}
          alt="Commercial laundry equipment"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"></div>
      </div>
    </div>
  );
}
