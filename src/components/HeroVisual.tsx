import { CmsImage } from "./CmsImage";
import { Droplets, Settings, Shield } from "lucide-react";

interface HeroVisualProps {
  image?: string;
}

export function HeroVisual({ image }: HeroVisualProps) {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Abstract geometric backdrop */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/10 via-indigo-50 to-slate-100" />
      <div className="absolute -right-6 top-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
      <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-indigo-200/40 blur-xl" />

      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-slate-50 shadow-xl shadow-slate-900/8">
        {image ? (
          <div className="relative aspect-[4/3] bg-slate-100">
            <CmsImage
              src={image}
              alt="Industrial laundry equipment"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/50 p-12">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-md ring-1 ring-gray-200">
                <Droplets className="h-9 w-9 text-accent" />
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary shadow-md">
                <Settings className="h-9 w-9 text-white" />
              </div>
              <div className="col-span-2 flex h-20 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20">
                <Shield className="h-9 w-9 text-accent" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating accent cards */}
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
