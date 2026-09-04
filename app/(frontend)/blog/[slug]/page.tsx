import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getBlogList } from "@/lib/dataService";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Tag,
  Share2,
  ArrowRight,
} from "lucide-react";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const allBlogs = await getBlogList();
  const relatedPosts = allBlogs.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-24 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-[#2d5026] transition py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Jurnal & Blog Desa</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#2d5026]/10 text-[#2d5026] text-xs font-bold uppercase tracking-wider">
              {post.kategoriLabel}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight leading-tight">
            {post.judul}
          </h1>

          {/* Author & Meta bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-500 pt-2 border-b border-stone-200 pb-6">
            <span className="flex items-center gap-1.5 text-stone-800 font-semibold">
              <User className="w-4 h-4 text-[#2d5026]" />
              {post.penulis}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-stone-400" />
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-stone-400" />
              {post.waktuBaca}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg bg-stone-100">
          <Image
            src={post.coverImage}
            alt={post.judul}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Excerpt Callout */}
        <div className="p-6 rounded-2xl bg-[#2d5026]/5 border-l-4 border-[#2d5026] text-stone-800 text-sm sm:text-base font-medium leading-relaxed italic">
          {post.ringkasan}
        </div>

        {/* Article Body Content */}
        <div className="prose prose-stone max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-stone-700 whitespace-pre-line font-sans">
          {post.konten}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-stone-400" />
            {post.tags.map((t, idx) => (
              <span
                key={idx}
                className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-full font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-stone-200 space-y-6">
            <h3 className="text-xl font-serif-title font-bold text-stone-900">
              Artikel Lainnya
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group space-y-3 bg-white p-4 rounded-2xl border border-stone-200 hover:border-stone-300 shadow-xs hover:shadow-md transition"
                >
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-100">
                    <Image
                      src={rel.coverImage}
                      alt={rel.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-sm font-serif-title font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors line-clamp-2">
                    {rel.judul}
                  </h4>
                  <p className="text-xs text-stone-500">{rel.publishedAt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
