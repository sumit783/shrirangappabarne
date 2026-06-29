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
  FolderOpen,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useT } from "@/lib/i18n";

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

interface CategoryCardData {
  category: string;
  label: string;
  newsItem: NewsItem | null;
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

function CategoryCard({
  data,
  lang,
  index,
}: {
  data: CategoryCardData;
  lang: "mr" | "en";
  index: number;
}) {
  const { category, label, newsItem } = data;
  const placeholder = `https://placehold.co/800x450/1a2754/f97316?text=${encodeURIComponent(label)}`;

  return (
    <Link href={`/news/category/${encodeURIComponent(category)}`}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.45, delay: index * 0.05 }}
        className="group bg-card border rounded-3xl overflow-hidden hover:shadow-elegant hover:border-saffron transition-all duration-300 flex flex-col h-full cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden bg-secondary/30">
          {newsItem?.image &&
          (newsItem.image.match(/\.(mp4|webm|ogg|mov)$/i) || newsItem.image.includes("video")) ? (
            <video
              src={getMediaUrl(newsItem.image)}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={newsItem?.image ? getMediaUrl(newsItem.image) : placeholder}
              alt={label}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = placeholder;
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <h2 className="text-xl font-bold text-white font-display uppercase tracking-wide group-hover:text-saffron transition-colors">
              {label}
            </h2>
            <div className="bg-saffron text-white rounded-full p-2 group-hover:scale-110 transition-transform">
              <FolderOpen className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5 bg-card">
          {newsItem ? (
            <>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="font-semibold text-saffron uppercase tracking-wider text-[10px]">
                  {lang === "mr" ? "ताज्या घडामोडी" : "Latest Update"}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(newsItem.news_date || newsItem.created_at, lang)}
              </div>
              <p className="text-sm font-semibold text-navy leading-snug line-clamp-2 mb-2 group-hover:text-saffron transition-colors">
                {newsItem.title}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground italic flex-1">
              {lang === "mr"
                ? "या प्रकारात कोणतीही बातमी उपलब्ध नाही."
                : "No news available in this category."}
            </p>
          )}

          <div className="mt-auto pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-saffron transition-colors">
            <span>{lang === "mr" ? "सर्व बातम्या पहा" : "View All News"}</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
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
      className="group bg-card border rounded-3xl overflow-hidden hover:shadow-elegant hover:border-saffron transition-all duration-300 flex flex-col h-full"
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

export default function NewsPage() {
  const { lang } = useT();
  const [categoryCards, setCategoryCards] = useState<CategoryCardData[]>([]);
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 450);
    return () => clearTimeout(t);
  }, [search]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // Fetch either categories or search results
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        if (debouncedSearch) {
          // If searching, fetch matching news articles across all categories
          const url = new URL(`${API_BASE}/api/news/by-category`);
          url.searchParams.set("lang", lang);
          url.searchParams.set("page", page.toString());
          url.searchParams.set("limit", "9");
          url.searchParams.set("search", debouncedSearch);

          const res = await fetch(url.toString());
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const responseData = await res.json();

          if (responseData && "data" in responseData) {
            setSearchResults(responseData.data);
            setTotalPages(responseData.totalPages || 1);
          } else {
            setSearchResults(Array.isArray(responseData) ? responseData : []);
            setTotalPages(1);
          }
        } else {
          // If not searching, fetch categories and their latest news
          const res = await fetch(`${API_BASE}/api/news/categories?lang=${lang}`);
          if (!res.ok) throw new Error("Failed to fetch categories");
          const data = await res.json();
          const cats = data.categories || [];

          // Generate { key, label } format
          const catList: { key: string; label: string }[] =
            cats.length > 0 && typeof cats[0] === "string"
              ? cats.map((c: string) => ({ key: c, label: c }))
              : cats;

          // Fetch the latest news for each category
          const cards = await Promise.all(
            catList.map(async (catObj) => {
              const cat = catObj.key;
              const label = catObj.label || cat;
              const url = new URL(`${API_BASE}/api/news/by-category`);
              url.searchParams.set("lang", lang);
              url.searchParams.set("limit", "1"); // Only need the latest one

              const urlString = url.toString() + `&category=${encodeURIComponent(cat)}`;

              try {
                const nRes = await fetch(urlString);
                const nResData = await nRes.json();
                const items = nResData.data || nResData;
                return {
                  category: cat,
                  label,
                  newsItem: Array.isArray(items) && items.length > 0 ? items[0] : null,
                };
              } catch {
                return { category: cat, label, newsItem: null };
              }
            }),
          );

          setCategoryCards(cards);
          setTotalPages(1); // No pagination for categories view
        }
      } catch (err) {
        console.error(err);
        setError(lang === "mr" ? "घडामोडी लोड करण्यात त्रुटी आली." : "Failed to load content.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [debouncedSearch, lang, page]);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy via-navy/95 to-navy-soft text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40" />

        <div className="container-x relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-saffron/20 border border-saffron/30 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
          >
            {lang === "mr" ? "घडामोडी" : "NEWS & ARCHIVE"}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black font-display tracking-tight text-white"
          >
            {lang === "mr" ? "बातम्या आणि घडामोडी" : "Development Works & Press"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light"
          >
            {lang === "mr"
              ? "मतदारसंघातील विविध विकासकामे, बैठका आणि जनसंपर्काची ताजी माहिती"
              : "Latest reports, announcements, and developmental works from the constituency"}
          </motion.p>

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
                placeholder={lang === "mr" ? "बातम्या शोधा..." : "Search news..."}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-full py-3.5 pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition"
              />
            </div>
          </motion.div>
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
                {lang === "mr" ? "लोड होत आहे..." : "Loading content..."}
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <p className="text-muted-foreground">{error}</p>
              <button
                onClick={() => setPage(1)}
                className="px-6 py-2.5 bg-gradient-saffron text-white rounded-full font-semibold text-sm shadow-saffron hover:scale-105 transition"
              >
                {lang === "mr" ? "पुन्हा प्रयत्न करा" : "Try Again"}
              </button>
            </div>
          )}

          {/* Empty Search Results */}
          {!loading && !error && debouncedSearch && searchResults.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <Newspaper className="h-12 w-12 text-saffron/40" />
              <h3 className="text-xl font-bold text-navy">
                {lang === "mr" ? "कोणतीही बातमी सापडली नाही" : "No news articles found"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {lang === "mr"
                  ? `"${debouncedSearch}" साठी कोणतेही निकाल मिळाले नाहीत.`
                  : `No results matching "${debouncedSearch}".`}
              </p>
            </div>
          )}

          {/* Content Grid */}
          {!loading && !error && (
            <AnimatePresence mode="wait">
              {debouncedSearch ? (
                // Display search results as regular news cards
                <motion.div
                  key={"search" + debouncedSearch + page}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {searchResults.map((item, i) => (
                    <NewsCard key={item.id} item={item} lang={lang} index={i} />
                  ))}
                </motion.div>
              ) : (
                // Display category cards when not searching
                <motion.div key="categories" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryCards.map((card, i) => (
                    <CategoryCard key={card.category} data={card} lang={lang} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Pagination (only for search results) */}
          {!loading && !error && debouncedSearch && totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-full border border-border bg-card text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
              >
                {lang === "mr" ? "मागे" : "Previous"}
              </button>
              <span className="text-sm font-medium text-muted-foreground">
                {lang === "mr"
                  ? `पृष्ठ ${page} पैकी ${totalPages}`
                  : `Page ${page} of ${totalPages}`}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-full border border-border bg-card text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
              >
                {lang === "mr" ? "पुढे" : "Next"}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
