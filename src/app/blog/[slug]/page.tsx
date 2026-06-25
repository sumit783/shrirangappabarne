"use client";
import { getMediaUrl } from "@/lib/utils";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Link2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useT } from "@/lib/i18n";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface BlogDetail {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  author: string | null;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  blog_points: string[] | { heading?: string; text?: string }[] | null;
  published_at: string | null;
  created_at: string;
  status: string;
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

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
        <Share2 className="h-3.5 w-3.5" />
        Share
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-secondary hover:bg-[#1877f2] hover:text-white transition group"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-secondary hover:bg-[#1da1f2] hover:text-white transition"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <button
        onClick={handleCopy}
        className="p-2 rounded-full bg-secondary hover:bg-saffron hover:text-white transition flex items-center gap-1.5 text-xs"
        aria-label="Copy link"
      >
        {copied ? <CheckCircle2 className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

function BlogPoints({ points }: { points: string[] | { heading?: string; text?: string }[] }) {
  if (!points || points.length === 0) return null;

  const isStringArray = typeof points[0] === "string";

  return (
    <div className="my-8 bg-saffron/5 border-l-4 border-saffron rounded-r-2xl p-6">
      <h3 className="font-bold text-navy text-base mb-4 font-display">Key Points</h3>
      <ul className="space-y-3">
        {isStringArray
          ? (points as string[]).map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground leading-relaxed">
                <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-saffron" />
                {point}
              </li>
            ))
          : (points as { heading?: string; text?: string }[]).map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground leading-relaxed">
                <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-saffron" />
                <span>
                  {point.heading && <strong className="text-navy">{point.heading}: </strong>}
                  {point.text}
                </span>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useT();
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/blogs/${slug}?lang=${lang}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: BlogDetail) => {
        // Parse blog_points if returned as string
        if (data.blog_points && typeof data.blog_points === "string") {
          try {
            data.blog_points = JSON.parse(data.blog_points as unknown as string);
          } catch (e) {
            // ignore
          }
        }
        setBlog(data);
      })
      .catch(() =>
        setError(
          lang === "mr"
            ? "लेख लोड करण्यात त्रुटी आली."
            : "Failed to load article. Please try again.",
        ),
      )
      .finally(() => setLoading(false));
  }, [slug, lang]);

  const displayDate = blog ? formatDate(blog.published_at || blog.created_at, lang) : "";
  const coverImage = blog?.image ? getMediaUrl(blog.image) : null;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      {/* Loading */}
      {loading && (
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-10 w-10 text-saffron animate-spin" />
            <p className="text-sm">{lang === "mr" ? "लोड होत आहे..." : "Loading article..."}</p>
          </div>
        </main>
      )}

      {/* Error */}
      {!loading && error && (
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <AlertCircle className="h-14 w-14 text-destructive mx-auto" />
            <p className="text-muted-foreground">{error}</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-saffron font-semibold hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {lang === "mr" ? "सर्व लेख पाहा" : "Back to all articles"}
            </Link>
          </div>
        </main>
      )}

      {/* Blog Content */}
      {!loading && !error && blog && (
        <>
          {/* Hero */}
          <section className="relative pt-24 md:pt-32 pb-0 bg-gradient-to-b from-navy to-navy/90 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 via-transparent to-gold/5 pointer-events-none" />

            <div className="container-x relative z-10 max-w-4xl mx-auto">
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-saffron transition text-sm font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {lang === "mr" ? "सर्व लेख" : "All Articles"}
                </Link>
              </motion.div>

              {/* Meta */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="flex flex-wrap items-center gap-4 text-xs text-white/60 mb-4"
              >
                {displayDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-saffron" />
                    {displayDate}
                  </span>
                )}
                {blog.author && (
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-saffron" />
                    {blog.author}
                  </span>
                )}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white leading-tight"
              >
                {blog.title}
              </motion.h1>

              {/* Meta description */}
              {blog.meta_description && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-base md:text-lg text-white/75 leading-relaxed max-w-2xl"
                >
                  {blog.meta_description}
                </motion.p>
              )}

              {/* Cover image */}
              {coverImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 rounded-t-3xl overflow-hidden shadow-2xl max-h-[480px]"
                >
                  <img
                    src={coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </motion.div>
              )}
            </div>
          </section>

          {/* Article body */}
          <main className="flex-grow py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="container-x max-w-4xl mx-auto"
            >
              {/* Blog points */}
              {blog.blog_points &&
                Array.isArray(blog.blog_points) &&
                blog.blog_points.length > 0 && <BlogPoints points={blog.blog_points} />}

              {/* Main content */}
              {blog.content && (
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-display prose-headings:text-navy
                    prose-h2:text-2xl prose-h3:text-xl
                    prose-p:text-foreground prose-p:leading-relaxed prose-p:text-base
                    prose-a:text-saffron prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-navy
                    prose-ul:list-disc prose-ol:list-decimal
                    prose-li:text-foreground prose-li:leading-relaxed
                    prose-blockquote:border-saffron prose-blockquote:bg-saffron/5 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:not-italic
                    prose-img:rounded-2xl prose-img:shadow-lg
                  "
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              )}

              {/* Divider + Share */}
              <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-saffron transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {lang === "mr" ? "सर्व लेख पाहा" : "Back to all articles"}
                </Link>
                <ShareButtons title={blog.title} slug={blog.slug || String(blog.id)} />
              </div>
            </motion.div>
          </main>
        </>
      )}

      {/* Not found */}
      {!loading && !error && !blog && (
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <BookOpen className="h-14 w-14 text-saffron/40 mx-auto" />
            <h2 className="text-2xl font-bold text-navy">
              {lang === "mr" ? "लेख सापडला नाही" : "Article not found"}
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-saffron font-semibold hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {lang === "mr" ? "सर्व लेख पाहा" : "Back to all articles"}
            </Link>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
