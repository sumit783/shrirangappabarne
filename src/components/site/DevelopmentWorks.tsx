"use client";

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

export function DevelopmentWorks() {
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
          setCategories((cats as string[]).map(c => ({ key: c, label: c })));
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
      setError(
        lang === "mr"
          ? "माहिती लोड करण्यात अडचण आली."
          : "Failed to load developments archive."
      );
    } finally {
      setLoading(false);
    }
  }, [activeTab, lang]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Tabs layout
  const allLabel = lang === "mr" ? "सर्व घडामोडी" : "All Updates";
  const uniqueMap = new Map<string, CategoryItem>();
  categories.forEach(c => {
    if (!uniqueMap.has(c.key)) uniqueMap.set(c.key, c);
  });
  const uniqueCategories = Array.from(uniqueMap.values());
  const tabsList = [{ key: "all", label: allLabel }, ...uniqueCategories];

  // Featured and regular split
  const featuredItem = newsList[0];
  const rightItems = newsList.slice(1, 4);

  return (
    <section id="works" className="py-16 md:py-24 container-x bg-white">
      {/* Header bar with Section Title and Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b-2 border-saffron/80">
        {/* Left: Section Title */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black font-display text-navy tracking-tight uppercase">
            {lang === "mr" ? "विकासाची कामे आणि घडामोडी" : "Development Works & Press"}
          </h2>
          <div className="h-[4px] bg-saffron w-24 mt-2" />
        </div>

        {/* Right: Filters Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {tabsList.map((tab) => (
            <button
              suppressHydrationWarning
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border-2 ${
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
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-12 xl:gap-16 mt-10">
            {/* Left Column: Featured Article */}
            {featuredItem ? (
              <motion.div
                key={featuredItem.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col h-full hover:shadow-md transition-all duration-300 p-2 rounded-2xl border border-transparent hover:border-gray-100"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-secondary/30 flex-shrink-0">
                  {featuredItem.image ? (
                    featuredItem.image.match(/\.(mp4|webm|ogg|mov)$/i) || featuredItem.image.includes("video") ? (
                      <video
                        src={`${API_BASE}${featuredItem.image}`}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={`${API_BASE}${featuredItem.image}`}
                        alt={featuredItem.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/800x500/1a2754/f97316?text=Shrirang+Appa+Barne";
                        }}
                      />
                    )
                  ) : (
                    <div className="w-full h-full bg-navy/10 flex items-center justify-center text-navy font-display font-black">
                      {featuredItem.category.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Meta tags & title */}
                <div className="mt-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-black text-saffron tracking-widest uppercase">
                    <span>{featuredItem.category}</span>
                    <span className="opacity-50">•</span>
                    <span className="text-muted-foreground font-semibold flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(featuredItem.news_date || featuredItem.created_at, lang)}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-navy mt-3 leading-snug font-display">
                    {featuredItem.title}
                  </h3>

                  {featuredItem.description && (
                    <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
                      {featuredItem.description}
                    </p>
                  )}

                  <div className="mt-auto pt-5">
                    <Link
                      href={`/news/${featuredItem.id}`}
                      className="inline-flex items-center gap-1.5 text-saffron font-black text-sm md:text-base hover:gap-2.5 transition-all uppercase tracking-wider"
                    >
                      {lang === "mr" ? "सविस्तर वाचा" : "Read Article"}
                      <ArrowUpRight className="h-4.5 w-4.5 stroke-[2.5px]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-muted-foreground py-12">
                {lang === "mr"
                  ? "निवडलेल्या प्रकारात कोणतीही माहिती उपलब्ध नाही."
                  : "No updates available for the selected category."}
              </div>
            )}

            {/* Right Column: Regular Stacked Articles */}
            <div className="flex flex-col gap-4 justify-between h-full">
              {rightItems.length > 0
                ? rightItems.map((m, i) => (
                    <Link key={m.id} href={`/news/${m.id}`} className="block flex-1">
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex gap-4 items-stretch hover:shadow-md transition-all duration-300 p-2 rounded-xl border border-transparent hover:border-gray-100 h-full"
                      >
                        {/* Small Image Container */}
                        <div className="relative overflow-hidden rounded-lg w-28 sm:w-44 bg-secondary/30 flex-shrink-0 min-h-[5rem]">
                          {m.image ? (
                            m.image.match(/\.(mp4|webm|ogg|mov)$/i) || m.image.includes("video") ? (
                              <video
                                src={`${API_BASE}${m.image}`}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                              />
                            ) : (
                              <img
                                src={`${API_BASE}${m.image}`}
                                alt={m.title}
                                loading="lazy"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://placehold.co/150x100/1a2754/f97316?text=News";
                                }}
                              />
                            )
                          ) : (
                            <div className="w-full h-full bg-navy/10 flex items-center justify-center text-[10px] text-navy font-bold">
                              {m.category}
                            </div>
                          )}
                        </div>

                        {/* Content info */}
                        <div className="flex-grow min-w-0 flex flex-col justify-center py-2">
                          <h4 className="text-sm font-bold text-navy leading-snug font-display line-clamp-2 hover:text-saffron transition">
                            {m.title}
                          </h4>
                          {m.description && (
                            <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                              {m.description}
                            </p>
                          )}
                          <p className="text-[11px] text-muted-foreground font-semibold mt-2 uppercase tracking-wider flex items-center gap-1">
                            <Calendar className="h-2.5 w-2.5" />
                            {formatDate(m.news_date || m.created_at, lang)}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))
                : featuredItem && (
                    <div className="text-muted-foreground text-sm py-4 border-t border-dashed">
                      {lang === "mr"
                        ? "इतर कोणतेही वृत्त उपलब्ध नाही."
                        : "No additional updates to show."}
                    </div>
                  )}
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center border-t pt-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-navy-soft text-white hover:text-saffron rounded-full font-bold text-sm shadow-md transition-all duration-300"
            >
              {lang === "mr" ? "सर्व घडामोडी पहा" : "View All Archive"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
