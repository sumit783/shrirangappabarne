"use client";
import { getMediaUrl } from "@/lib/utils";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, Loader2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import Link from "next/link";

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

interface CategoryItem {
  key: string;
  label: string;
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

export function NewsSection() {
  const { lang } = useT();
  const [activeTab, setActiveTab] = useState("all");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dynamic categories
  useEffect(() => {
    fetch(`${API_BASE}/api/news/categories?lang=${lang}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load categories");
        return res.json();
      })
      .then((data: { categories: CategoryItem[] | string[] }) => {
        const cats = data.categories || [];
        if (cats.length > 0 && typeof cats[0] === "string") {
          setCategories((cats as string[]).map((c) => ({ key: c, label: c })));
        } else {
          setCategories(cats as CategoryItem[]);
        }
      })
      .catch((err) => {
        console.error("Error loading news categories:", err);
      });
  }, [lang]);

  // Fetch news items
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL(`${API_BASE}/api/news/by-category`);
      url.searchParams.set("lang", lang);
      if (activeTab !== "all") {
        url.searchParams.set("category", activeTab);
      }

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to load news");
      const data: NewsItem[] = await res.json();
      setNewsList(data || []);
    } catch (err) {
      setError(lang === "mr" ? "माहिती लोड करण्यात अडचण आली." : "Failed to load news archive.");
    } finally {
      setLoading(false);
    }
  }, [activeTab, lang]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Tabs layout
  const allLabel = lang === "mr" ? "सर्व बातम्या" : "All News";
  const uniqueMap = new Map<string, CategoryItem>();
  categories.forEach((c) => {
    if (!uniqueMap.has(c.key)) uniqueMap.set(c.key, c);
  });
  const uniqueCategories = Array.from(uniqueMap.values()).slice(0, 4);
  const tabsList = [{ key: "all", label: allLabel }, ...uniqueCategories];

  return (
    <section id="news-section" className="py-16 md:py-24 container-x bg-gray-50/50">
      {/* Header bar with Section Title and Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b-2 border-saffron/80">
        {/* Left: Section Title */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black font-display text-navy tracking-tight uppercase">
            {lang === "mr" ? "बातम्या आणि घडामोडी" : "Latest News & Updates"}
          </h2>
          <div className="h-[4px] bg-saffron w-24 mt-2" />
        </div>

        {/* Right: Filters Tabs */}
        <div className="flex overflow-x-auto gap-2 md:gap-3 pb-2 md:pb-0 w-full md:w-auto md:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabsList.map((tab) => (
            <button
              suppressHydrationWarning
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap flex-shrink-0 px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border-2 ${
                activeTab === tab.key
                  ? "border-saffron text-saffron bg-transparent"
                  : "border-transparent text-muted-foreground hover:text-saffron bg-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 text-saffron animate-spin" />
          <p className="text-sm">{lang === "mr" ? "लोड होत आहे..." : "Loading archive..."}</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-20 text-muted-foreground">
          <p>{error}</p>
          <button
            onClick={fetchNews}
            className="mt-4 px-5 py-2 bg-saffron text-white rounded-full font-bold text-sm"
          >
            {lang === "mr" ? "पुन्हा प्रयत्न करा" : "Retry"}
          </button>
        </div>
      )}

      {/* Media Content Grid */}
      {!loading && !error && (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {newsList.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border hover:border-saffron hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                <Link href={`/news/${item.id}`} className="flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary/30">
                    {item.image ? (
                      item.image.match(/\.(mp4|webm|ogg|mov)$/i) || item.image.includes("video") ? (
                        <video
                          src={getMediaUrl(item.image)}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={getMediaUrl(item.image)}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/600x400/1a2754/f97316?text=News";
                          }}
                        />
                      )
                    ) : (
                      <div className="w-full h-full bg-navy/10 flex items-center justify-center text-navy font-display font-black text-xl">
                        {item.category.toUpperCase()}
                      </div>
                    )}
                    <span className="absolute top-4 left-4 bg-saffron text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3.5 w-3.5 text-saffron" />
                      {formatDate(item.news_date || item.created_at, lang)}
                    </div>

                    <h3 className="text-lg font-bold text-navy font-display leading-snug group-hover:text-saffron transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-grow">
                        {item.description}
                      </p>
                    )}

                    <div className="mt-6 flex items-center gap-1.5 text-saffron font-bold text-sm uppercase tracking-wider group-hover:gap-2.5 transition-all">
                      {lang === "mr" ? "सविस्तर वाचा" : "Read Article"}
                      <ArrowUpRight className="h-4 w-4 stroke-[2.5px]" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            {newsList.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">
                {lang === "mr"
                  ? "निवडलेल्या प्रकारात कोणतीही बातमी उपलब्ध नाही."
                  : "No news available for the selected category."}
              </div>
            )}
          </div>

          {/* View All Button */}
          <div className="text-center border-t pt-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-navy-soft text-white hover:text-saffron rounded-full font-bold text-sm shadow-md transition-all duration-300"
            >
              {lang === "mr" ? "सर्व बातम्या पहा" : "View All News"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
