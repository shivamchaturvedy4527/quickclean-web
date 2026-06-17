import { getCMS } from "@/lib/cms-store";
import { SiteLayout } from "@/components/SiteLayout";
import { CmsImage } from "@/components/CmsImage";
import { notFound } from "next/navigation";
import Link from "next/link";
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
        <div className="relative h-64 bg-[#06163a] sm:h-80">
          <CmsImage src={post.image} alt={post.title} fill className="object-cover opacity-40" />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#06163a] to-transparent p-6">
            <Link href="/news" className="text-sm text-[#00b67a]">← News</Link>
            <span className="mt-2 text-xs uppercase text-slate-400">{post.category}</span>
            <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">{post.title}</h1>
            <time className="mt-2 text-sm text-slate-400" dateTime={post.date}>{post.date}</time>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="prose-legal space-y-4">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
