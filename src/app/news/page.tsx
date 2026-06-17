import Link from "next/link";
import { SiteLayout } from "@/components/SiteLayout";
import { CmsImage } from "@/components/CmsImage";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "News & Media" };

export default async function NewsPage() {
  const cms = await getCMS();

  return (
    <SiteLayout>
      <PageHero title={cms.home.newsTitle} subtitle={cms.home.newsSubtitle} />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cms.blog.map((post) => (
              <Link
                key={post.id}
                href={`/${post.slug}`}
                className="card card-lift group block overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <CmsImage
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {post.category}
                  </span>
                  <h2 className="mt-2 font-semibold text-navy transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>
                  <time className="mt-3 block text-xs text-slate-400" dateTime={post.date}>
                    {post.date}
                  </time>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-14 max-w-md">
            <NewsletterForm title={cms.home.newsletterTitle} subtitle={cms.home.newsletterSubtitle} />
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
