import Link from "next/link";
import Image from "next/image";
import { getBlogList } from "@/lib/dataService";
import { BookOpen, Clock, User, ArrowRight, Sparkles, Tag } from "lucide-react";

interface BlogPageProps {
  searchParams: Promise<{ kategori?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { kategori } = await searchParams;
  const allBlogs = await getBlogList();

  const activeCategory = kategori || "all";
  const filtered =
    activeCategory === "all"
      ? allBlogs
      : allBlogs.filter((b) => b.kategori === activeCategory);

  const featuredBlog = allBlogs.find((b) => b.featured) || allBlogs[0];
  const regularBlogs = filtered.filter((b) => b.id !== (activeCategory === "all" ? featuredBlog.id : ""));

  const categoryOptions = [
    { label: "Semua Tulisan", value: "all" },
    { label: "Cerita & Feature", value: "cerita-feature" },
    { label: "Tips & Wisata", value: "tips-wisata" },
    { label: "Kegiatan & KKN", value: "kegiatan-pengumuman" },
  ];

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-24 px-4 sm:px-8 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section: Modern / Gen-Z Vibe */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2d5026]/10 text-[#2d5026] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Jurnal & Kabar Cijeruk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight leading-tight">
              Cerita Dari Kaki Salak: Wisata, Kopi & Kearifan Desa
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Jurnal perjalanan, kurasi spot sunrise tersembunyi, kisah inspiratif petani kopi, dan catatan pengabdian mahasiswa KKN bersama masyarakat Desa Cijeruk.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {categoryOptions.map((opt) => {
              const isActive = activeCategory === opt.value;
              return (
                <Link
                  key={opt.value}
                  href={opt.value === "all" ? "/blog" : `/blog?kategori=${opt.value}`}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#2d5026] text-white shadow-md shadow-[#2d5026]/20"
                      : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200"
                  }`}
                >
                  {opt.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Blog Highlight (Only show when on "all") */}
        {activeCategory === "all" && featuredBlog && (
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[320px] bg-stone-100">
                <Image
                  src={featuredBlog.coverImage}
                  alt={featuredBlog.judul}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-900 text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Artikel Utama</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-stone-400 font-medium">
                    <span className="text-[#2d5026] font-bold uppercase tracking-wider">
                      {featuredBlog.kategoriLabel}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredBlog.waktuBaca}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredBlog.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-900 hover:text-[#2d5026] transition-colors leading-tight">
                      {featuredBlog.judul}
                    </h2>
                  </Link>

                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {featuredBlog.ringkasan}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                    <User className="w-3.5 h-3.5 text-[#2d5026]" />
                    <span>{featuredBlog.penulis}</span>
                  </div>

                  <Link
                    href={`/blog/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d5026] hover:underline"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeCategory === "all" ? regularBlogs : filtered).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <Image
                  src={post.coverImage}
                  alt={post.judul}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[#2d5026] text-[10px] font-bold uppercase tracking-wider">
                    {post.kategoriLabel}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.waktuBaca}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif-title font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors line-clamp-2 leading-snug">
                    {post.judul}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {post.ringkasan}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-medium text-stone-700">{post.penulis}</span>
                  <span className="font-bold text-[#2d5026] flex items-center gap-1">
                    Baca
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
