import { BlogPostDetail, generateBlogMetadata } from "@/components/BlogPostDetail";

const SLUG = "the-hidden-cost-of-outdated-laundry-systems";

export async function generateMetadata() {
  return generateBlogMetadata(SLUG);
}

export default function Page() {
  return <BlogPostDetail slug={SLUG} />;
}
