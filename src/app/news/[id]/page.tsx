"use client";
import { getMediaUrl } from "@/lib/utils";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Link2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useT } from "@/lib/i18n";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface NewsDetail {
  id: number;
  category: string;
  title: string;
  description: string | null;
  image: string | null;
  news_date: string | null;
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

function ShareButtons({ title }: { title: string }) {
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

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useT();
  const [newsItem, setNewsItem] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/news/${id}?lang=${lang}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: NewsDetail[]) => {
        // News GET /api/news/:id endpoint returns an array in the backend
        if (data && data.length > 0) {
          setNewsItem(data[0]);
        } else {
          setNewsItem(null);
        }
      })
      .catch(() =>
        setError(
          lang === "mr"
            ? "माहिती लोड करण्यात त्रुटी आली."
            : "Failed to load news article. Please try again.",
        ),
      )
      .finally(() => setLoading(false));
  }, [id, lang]);

  const displayDate = newsItem ? formatDate(newsItem.news_date || newsItem.created_at, lang) : "";
  const coverImage = newsItem?.image ? getMediaUrl(newsItem.image) : null;

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
              href="/news"
              className="inline-flex items-center gap-2 text-saffron font-semibold hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {lang === "mr" ? "सर्व घडामोडी पाहा" : "Back to all updates"}
            </Link>
          </div>
        </main>
      )}

      {/* Content */}
      {!loading && !error && newsItem && (
        <>
          {/* Hero Header */}
          <section className="relative pt-24 md:pt-32 pb-0 bg-gradient-to-b from-navy to-navy/90 text-white overflow-hidden">
            <div className="container-x relative z-10 max-w-4xl mx-auto">
              {/* Back link */}
              <div className="mb-6">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-saffron transition text-sm font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {lang === "mr" ? "सर्व घडामोडी" : "All Archive"}
                </Link>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 mb-4">
                <span className="bg-saffron/20 border border-saffron/30 text-saffron px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                  {newsItem.category}
                </span>
                {displayDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-saffron" />
                    {displayDate}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black font-display text-white leading-tight">
                {newsItem.title}
              </h1>

              {/* Cover image */}
              {coverImage && (
                <div className="mt-8 rounded-t-3xl overflow-hidden shadow-2xl max-h-[480px]">
                  <img
                    src={coverImage}
                    alt={newsItem.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Description body */}
          <main className="flex-grow py-12 md:py-16">
            <div className="container-x max-w-4xl mx-auto">
              {newsItem.description && (
                <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-p:text-foreground prose-p:leading-relaxed prose-p:text-base prose-strong:text-navy">
                  <p className="whitespace-pre-wrap">{newsItem.description}</p>
                </div>
              )}

              {/* Share & Back */}
              <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-saffron transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {lang === "mr" ? "सर्व घडामोडी पाहा" : "Back to all updates"}
                </Link>
                <ShareButtons title={newsItem.title} />
              </div>
            </div>
          </main>
        </>
      )}

      {/* Empty / Not found */}
      {!loading && !error && !newsItem && (
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <Newspaper className="h-14 w-14 text-saffron/40 mx-auto" />
            <h2 className="text-2xl font-bold text-navy">
              {lang === "mr" ? "माहिती आढळली नाही" : "Article not found"}
            </h2>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-saffron font-semibold hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {lang === "mr" ? "सर्व घडामोडी पाहा" : "Back to all updates"}
            </Link>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
