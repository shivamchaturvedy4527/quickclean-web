import { BlogPostDetail, generateBlogMetadata } from "@/components/BlogPostDetail";

const SLUG = "why-linen-management-directly-impacts-hotel-revenue";

export async function generateMetadata() {
  return generateBlogMetadata(SLUG);
}

export default function Page() {
  return <BlogPostDetail slug={SLUG} />;
}
