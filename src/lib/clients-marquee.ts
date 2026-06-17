import type { BrandLogo, Client } from "@/types/cms";
import { brandLogoUrlForIndex } from "@/lib/brand-logos";

/** Map CMS client names to logo marquee items (names unchanged, CDN logos for display). */
export function clientsToMarqueeBrands(clients: Client[]): BrandLogo[] {
  return clients.map((client, index) => ({
    id: client.id,
    name: client.name,
    image: brandLogoUrlForIndex(index),
  }));
}
