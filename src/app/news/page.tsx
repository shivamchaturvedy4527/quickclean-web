import Link from "next/link";
import { SiteLayout } from "@/components/SiteLayout";
import { CmsImage } from "@/components/CmsImage";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "News & Media" };

export default async function NewsPage() {
  const cms = await getCMS();

  return (
    <SiteLayout>
      <section className="bg-[#06163a] py-12 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-semibold">{cms.home.newsTitle}</h1>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cms.blog.map((post) => (
              <Link key={post.id} href={`/${post.slug}`} className="block overflow-hidden rounded border border-slate-200 bg-white">
                <div className="relative aspect-video">
                  <CmsImage src={post.image} alt={post.title} fill />
                </div>
                <div className="p-4">
                  <span className="text-xs uppercase text-[#00b67a]">{post.category}</span>
                  <h2 className="mt-1 font-semibold text-[#06163a]">{post.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>
                  <time className="mt-2 block text-xs text-slate-400" dateTime={post.date}>{post.date}</time>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 max-w-md">
            <NewsletterForm title={cms.home.newsletterTitle} subtitle={cms.home.newsletterSubtitle} />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
