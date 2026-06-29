"use client";
import { getMediaUrl } from "@/lib/utils";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  ArrowRight,
  Newspaper,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useT } from "@/lib/i18n";
import { useParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface NewsItem {
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

function NewsCard({ item, lang, index }: { item: NewsItem; lang: "mr" | "en"; index: number }) {
  const displayDate = formatDate(item.news_date || item.created_at, lang);
  const placeholder = `https://placehold.co/800x450/1a2754/f97316?text=${encodeURIComponent(item.title.substring(0, 20))}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group bg-card border rounded-3xl overflow-hidden hover:shadow-elegant hover:border-saffron transition-all duration-300 flex flex-col"
    >
      <div className="relative h-52 overflow-hidden bg-secondary/30">
        {item.image &&
        (item.image.match(/\.(mp4|webm|ogg|mov)$/i) || item.image.includes("video")) ? (
          <video
            src={getMediaUrl(item.image)}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={item.image ? getMediaUrl(item.image) : placeholder}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholder;
            }}
          />
        )}
        <span className="absolute top-4 left-4 bg-saffron text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {item.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Calendar className="h-3.5 w-3.5 text-saffron" />
          {displayDate}
        </div>

        <h2 className="text-lg md:text-xl font-bold text-navy font-display leading-snug group-hover:text-saffron transition line-clamp-2">
          {item.title}
        </h2>

        {item.description && (
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {item.description}
          </p>
        )}

        <Link
          href={`/news/${item.id}`}
          className="mt-5 inline-flex items-center gap-1.5 text-saffron font-semibold text-sm hover:gap-3 transition-all"
        >
          {lang === "mr" ? "सविस्तर वाचा" : "Read Full Article"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function CategoryNewsPage() {
  const { lang } = useT();
  const params = useParams();
  const rawCategory = params.category as string;
  const category = decodeURIComponent(rawCategory || "");

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryLabel, setCategoryLabel] = useState<string>(category);

  // Fetch category label
  useEffect(() => {
    if (!category) return;
    fetch(`${API_BASE}/api/news/categories?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        const cats = data.categories || [];
        const match = cats.find((c: { key: string; label: string } | string) =>
          typeof c === "object" ? c.key === category : c === category,
        );
        if (match) {
          setCategoryLabel(typeof match === "object" ? match.label : match);
        }
      })
      .catch(console.error);
  }, [lang, category]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 450);
    return () => clearTimeout(t);
  }, [search]);

  // Fetch news items
  const fetchNews = useCallback(async () => {
    if (!category) return;
    setLoading(true);
    setError(null);
    try {
      const url = new URL(`${API_BASE}/api/news/by-category`);
      url.searchParams.set("lang", lang);
      url.searchParams.set("page", "1");
      url.searchParams.set("limit", "1000"); // Fetch all news

      // We manually append category to ensure %20 is used instead of + for spaces,
      // as some backends fail to decode + properly in query strings.
      let urlString = url.toString() + `&category=${encodeURIComponent(category)}`;

      if (debouncedSearch) {
        urlString += `&search=${encodeURIComponent(debouncedSearch)}`;
      }

      const res = await fetch(urlString);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const responseData = await res.json();

      if (responseData && "data" in responseData) {
        setNewsList(responseData.data);
      } else {
        setNewsList(Array.isArray(responseData) ? responseData : []);
      }
    } catch (err) {
      setError(lang === "mr" ? "घडामोडी लोड करण्यात त्रुटी आली." : "Failed to load news articles.");
    } finally {
      setLoading(false);
    }
  }, [category, debouncedSearch, lang]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy via-navy/95 to-navy-soft text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40" />

        <div className="container-x relative z-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              {lang === "mr" ? "सर्व घडामोडींकडे परत" : "Back to All Categories"}
            </span>
          </Link>

          <div className="text-center mt-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-saffron/20 border border-saffron/30 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            >
              {lang === "mr" ? "प्रकार" : "CATEGORY"}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black font-display tracking-tight text-white"
            >
              {categoryLabel}
            </motion.h1>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 max-w-xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  suppressHydrationWarning
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    lang === "mr" ? "या प्रकारात शोधा..." : `Search in ${categoryLabel}...`
                  }
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-full py-3.5 pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid container */}
      <main className="flex-grow py-16">
        <div className="container-x">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="h-10 w-10 text-saffron animate-spin" />
              <p className="text-muted-foreground text-sm">
                {lang === "mr" ? "लोड होत आहे..." : "Loading articles..."}
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <p className="text-muted-foreground">{error}</p>
              <button
                onClick={fetchNews}
                className="px-6 py-2.5 bg-gradient-saffron text-white rounded-full font-semibold text-sm shadow-saffron hover:scale-105 transition"
              >
                {lang === "mr" ? "पुन्हा प्रयत्न करा" : "Try Again"}
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && newsList.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <Newspaper className="h-12 w-12 text-saffron/40" />
              <h3 className="text-xl font-bold text-navy">
                {lang === "mr" ? "कोणतीही बातमी सापडली नाही" : "No news articles found"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {debouncedSearch
                  ? lang === "mr"
                    ? `"${debouncedSearch}" साठी कोणतेही निकाल मिळाले नाहीत.`
                    : `No results matching "${debouncedSearch}".`
                  : lang === "mr"
                    ? "या प्रकारात अद्याप कोणतीही बातमी उपलब्ध नाही."
                    : "No updates published in this category yet."}
              </p>
            </div>
          )}

          {/* Results grid */}
          {!loading && !error && newsList.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={category + debouncedSearch}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {newsList.map((item, i) => (
                  <NewsCard key={item.id} item={item} lang={lang} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
