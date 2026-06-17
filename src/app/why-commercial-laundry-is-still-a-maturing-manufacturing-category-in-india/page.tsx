import { BlogPostDetail, generateBlogMetadata } from "@/components/BlogPostDetail";

const SLUG = "why-commercial-laundry-is-still-a-maturing-manufacturing-category-in-india";

export async function generateMetadata() {
  return generateBlogMetadata(SLUG);
}

export default function Page() {
  return <BlogPostDetail slug={SLUG} />;
}
