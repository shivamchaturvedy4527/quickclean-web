const DEFAULT_HERO = "/images/ppt/slide10_img01.png";

interface HeroVisualProps {
  image?: string;
}

export function HeroVisual({ image }: HeroVisualProps) {
  const heroImage = image || DEFAULT_HERO;

  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl shadow-primary/10 ring-1 ring-gray-200/80">
        <img
          src={heroImage}
          alt="Commercial laundry equipment"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
