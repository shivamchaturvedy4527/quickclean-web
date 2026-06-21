import Link from "next/link";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CmsImage } from "@/components/CmsImage";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionReveal } from "@/components/SectionReveal";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCMS();
  return { title: cms.labels.meta.blog };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const cms = await getCMS();
  const posts = category
    ? cms.blog.filter((p) => p.category === category)
    : cms.blog;

  return (
    <SiteLayout>
      <PageHero
        title={cms.home.newsTitle}
        subtitle={cms.home.newsSubtitle}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                !category
                  ? "bg-[primary] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All
            </Link>
            {cms.blogCategories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-[primary] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="grid gap-6 sm:grid-cols-2">
                {posts.map((post, i) => (
                  <SectionReveal key={post.id} delay={i * 0.05}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <CmsImage
                          src={post.image}
                          alt={post.title}
                          fill
                          className="transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-semibold uppercase tracking-wider text-accent">
                            {post.category}
                          </span>
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <h2 className="mt-2 font-semibold text-primary group-hover:text-accent-hover">
                          {post.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>
                      </div>
                    </Link>
                  </SectionReveal>
                ))}
              </div>
              {posts.length === 0 && (
                <p className="text-slate-500">No posts in this category yet.</p>
              )}
            </div>
            <NewsletterForm
              title={cms.home.newsletterTitle}
              subtitle={cms.home.newsletterSubtitle}
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
