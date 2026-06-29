"use client";
import { getMediaUrl } from "@/lib/utils";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, User, ArrowRight, BookOpen, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useT } from "@/lib/i18n";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  author: string;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
}

function formatDate(dateStr: string | null, lang: "mr" | "en"): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(lang === "mr" ? "mr-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogCard({ blog, lang, index }: { blog: Blog; lang: "mr" | "en"; index: number }) {
  const displayDate = formatDate(blog.published_at || blog.created_at, lang);
  const placeholder = `https://placehold.co/800x450/1a2754/f97316?text=${encodeURIComponent(blog.title.substring(0, 20))}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group bg-card border rounded-3xl overflow-hidden hover:shadow-elegant hover:border-saffron transition-all duration-300 flex flex-col"
    >
      {/* Blog cover image */}
      <div className="relative h-52 overflow-hidden bg-secondary/30">
        <img
          src={blog.image ? getMediaUrl(blog.image) : placeholder}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholder;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
      </div>

      {/* Blog content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-saffron" />
            {displayDate}
          </span>
          {blog.author && (
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-saffron" />
              {blog.author}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-lg md:text-xl font-bold text-navy font-display leading-snug group-hover:text-saffron transition line-clamp-2">
          {blog.title}
        </h2>

        {/* Excerpt */}
        {blog.meta_description && (
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {blog.meta_description}
          </p>
        )}

        {/* Read more link */}
        <Link
          href={`/blog/${blog.slug || blog.id}`}
          className="mt-5 inline-flex items-center gap-1.5 text-saffron font-semibold text-sm hover:gap-3 transition-all"
        >
          {lang === "mr" ? "संपूर्ण वाचा" : "Read Article"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const { lang } = useT();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      params.set("lang", lang);
      const res = await fetch(`${API_BASE}/api/blogs/public?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Blog[] = await res.json();
      setBlogs(data);
    } catch (err) {
      setError(
        lang === "mr" ? "ब्लॉग लोड करण्यात त्रुटी आली." : "Failed to load blogs. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, lang]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-[#0d0b0a] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[80px] pointer-events-none -ml-20 -mb-20" />

        <div className="container-x relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-saffron/20 border border-saffron/30 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
          >
            {lang === "mr" ? "ब्लॉग" : "BLOG"}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black font-display tracking-tight text-white"
          >
            {lang === "mr" ? "विचार आणि लेख" : "Thoughts & Articles"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light"
          >
            {lang === "mr"
              ? "खासदार श्री श्रीरंग आप्पा बारणे यांचे विचार, भूमिका आणि विकासाची दृष्टी"
              : "Perspectives, positions and development vision of MP Shri Shrirang Appa Barne"}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                suppressHydrationWarning
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === "mr" ? "ब्लॉग शोधा..." : "Search articles..."}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-full py-3.5 pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <main className="flex-grow py-16 md:py-24">
        <div className="container-x">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-32 text-muted-foreground gap-4">
              <Loader2 className="h-10 w-10 text-saffron animate-spin" />
              <p className="text-sm">{lang === "mr" ? "लोड होत आहे..." : "Loading articles..."}</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <p className="text-muted-foreground">{error}</p>
              <button
                onClick={fetchBlogs}
                className="px-6 py-2.5 bg-gradient-saffron text-white rounded-full font-semibold text-sm shadow-saffron hover:scale-105 transition"
              >
                {lang === "mr" ? "पुन्हा प्रयत्न करा" : "Try Again"}
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <BookOpen className="h-12 w-12 text-saffron/40" />
              <h3 className="text-xl font-bold text-navy">
                {lang === "mr" ? "कोणताही ब्लॉग सापडला नाही" : "No articles found"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {debouncedSearch
                  ? lang === "mr"
                    ? `"${debouncedSearch}" साठी कोणताही लेख उपलब्ध नाही.`
                    : `No results for "${debouncedSearch}".`
                  : lang === "mr"
                    ? "अद्याप कोणतेही ब्लॉग प्रकाशित नाहीत."
                    : "No blogs published yet."}
              </p>
              {debouncedSearch && (
                <button
                  onClick={() => setSearch("")}
                  className="text-saffron text-sm font-semibold hover:underline"
                >
                  {lang === "mr" ? "शोध साफ करा" : "Clear search"}
                </button>
              )}
            </div>
          )}

          {/* Blog Cards Grid */}
          {!loading && !error && blogs.length > 0 && (
            <>
              {/* Results count */}
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {lang === "mr"
                    ? `${blogs.length} लेख सापडले`
                    : `${blogs.length} article${blogs.length !== 1 ? "s" : ""} found`}
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={debouncedSearch}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {blogs.map((blog, i) => (
                    <BlogCard key={blog.id} blog={blog} lang={lang} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
