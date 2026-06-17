import { Droplets } from "lucide-react";

const DEFAULT_HERO = "/images/ppt/slide10_img01.png";

interface HeroVisualProps {
  image?: string;
}

export function HeroVisual({ image }: HeroVisualProps) {
  const heroImage = image || DEFAULT_HERO;

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
        <img
          src={heroImage}
          alt="Industrial laundry equipment"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute -bottom-6 -left-6 hidden rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg sm:block">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <Droplets className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900">Industrial Grade</p>
            <p className="text-xs text-gray-500">Pan-India Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}
