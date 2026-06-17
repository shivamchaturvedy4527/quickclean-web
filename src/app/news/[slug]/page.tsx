import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CmsImage } from "@/components/CmsImage";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cms = await getCMS();
  return cms.blog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getCMS();
  const post = cms.blog.find((p) => p.slug === slug);
  return {
    title: post?.title ?? "Article",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const cms = await getCMS();
  const post = cms.blog.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <SiteLayout>
      <article>
        <div className="relative h-72 overflow-hidden bg-primary sm:h-96">
          <CmsImage src={post.image} alt={post.title} fill className="object-cover opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
          <div className="absolute bottom-0 mx-auto w-full max-w-3xl px-6 pb-10 lg:px-8">
            <Link
              href="/blog"
              className="mb-4 inline-flex items-center gap-1 text-sm text-accent-bright hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to News
            </Link>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-bright">
              {post.category}
            </span>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
            <time className="mt-3 block text-sm text-slate-400" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="prose-legal max-w-none space-y-4">
                {post.content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-lg leading-relaxed text-slate-700">
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <NewsletterForm
              title={cms.home.newsletterTitle}
              subtitle={cms.home.newsletterSubtitle}
            />
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
