import { BlogPostDetail, generateBlogMetadata } from "@/components/BlogPostDetail";

const SLUG = "the-silent-killer-in-hospital-linen";

export async function generateMetadata() {
  return generateBlogMetadata(SLUG);
}

export default function Page() {
  return <BlogPostDetail slug={SLUG} />;
}
