import type { BrandLogo, Client } from "@/types/cms";

const BRAND_IMAGE_COUNT = 18;

/** Map CMS client names to cycling brand logo images for the marquee. */
export function clientsToMarqueeBrands(clients: Client[]): BrandLogo[] {
  return clients.map((client, index) => ({
    id: client.id,
    name: client.name,
    image: `/images/brands/${(index % BRAND_IMAGE_COUNT) + 1}.jpg`,
  }));
}
