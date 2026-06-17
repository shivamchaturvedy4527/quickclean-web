import { getCMS } from "@/lib/cms-store";
import { SiteLayout } from "@/components/SiteLayout";
import { CmsImage } from "@/components/CmsImage";
import { Container } from "@/components/ui/Container";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateBlogMetadata(slug: string): Promise<Metadata> {
  const cms = await getCMS();
  const post = cms.blog.find((p) => p.slug === slug);
  return { title: post?.title ?? "News", description: post?.excerpt };
}

export async function BlogPostDetail({ slug }: { slug: string }) {
  const cms = await getCMS();
  const post = cms.blog.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <SiteLayout>
      <article>
        <div className="relative h-72 bg-primary sm:h-96">
          <CmsImage src={post.image} alt={post.title} fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
          <Container className="relative flex h-full flex-col justify-end pb-10">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              News
            </Link>
            <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {post.category}
            </span>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <time className="mt-4 text-sm text-gray-400" dateTime={post.date}>
              {post.date}
            </time>
          </Container>
        </div>
        <Container className="py-20">
          <div className="prose-legal mx-auto max-w-3xl space-y-5 text-base sm:text-lg">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Container>
      </article>
    </SiteLayout>
  );
}
