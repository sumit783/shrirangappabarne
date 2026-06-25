"use client";
import { getMediaUrl } from "@/lib/utils";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Loader2, AlertCircle, User } from "lucide-react";
import { useT } from "@/lib/i18n";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface BlogItem {
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

export function News() {
  const { lang } = useT();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/blogs/top?lang=${lang}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch top blogs");
        return res.json();
      })
      .then((data: BlogItem[]) => {
        setBlogs(data || []);
      })
      .catch(() => {
        setError(lang === "mr" ? "ब्लॉग लोड करता आले नाहीत." : "Failed to load blogs.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lang]);

  const featured = blogs[0];
  const rest = blogs.slice(1, 4);

  return (
    <section id="news" className="py-24 md:py-32 container-x bg-gray-50/50">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
          {lang === "mr" ? "ब्लॉग आणि विचार" : "BLOGS & THOUGHTS"}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-navy mt-4">
          {lang === "mr" ? "नवीनतम विचार आणि लेख" : "Latest Thoughts & Articles"}
        </h2>
        <p className="mt-4 text-muted-foreground">
          {lang === "mr"
            ? "खासदार श्री श्रीरंग आप्पा बारणे यांचे विचार, भूमिका आणि विकासाची दृष्टी"
            : "Perspectives, positions, and development vision of MP Shri Shrirang Appa Barne"}
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-8 w-8 text-saffron animate-spin" />
          <p className="text-sm text-muted-foreground">
            {lang === "mr" ? "लोड होत आहे..." : "Loading latest blogs..."}
          </p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center">
          <AlertCircle className="h-10 w-10 text-destructive mb-2" />
          <p>{error}</p>
        </div>
      )}

      {/* News/Blogs Grid */}
      {!loading && !error && blogs.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 mt-12">
          {/* Featured Article Card */}
          {featured && (
            <Link href={`/blog/${featured.slug || featured.id}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group rounded-3xl overflow-hidden shadow-elegant border bg-card h-full flex flex-col hover:border-saffron transition-all duration-300"
              >
                <div className="relative h-56 md:h-80 overflow-hidden bg-secondary/30">
                  {featured.image ? (
                    <img
                      src={getMediaUrl(featured.image)}
                      alt={featured.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/800x500/1a2754/f97316?text=Blog";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-navy/10 flex items-center justify-center text-navy font-display font-black text-2xl">
                      BLOG
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-saffron text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {lang === "mr" ? "वैशिष्ट्यपूर्ण" : "Featured"}
                  </span>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-saffron" />
                      {formatDate(featured.published_at || featured.created_at, lang)}
                    </span>
                    {featured.author && (
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-saffron" />
                        {featured.author}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-navy group-hover:text-saffron transition-colors duration-300 font-display">
                    {featured.title}
                  </h3>
                  {featured.meta_description && (
                    <p className="mt-3 text-muted-foreground line-clamp-3 leading-relaxed flex-grow">
                      {featured.meta_description}
                    </p>
                  )}
                  <div className="mt-5 inline-flex items-center gap-1.5 text-saffron font-semibold text-sm">
                    {lang === "mr" ? "सविस्तर वाचा" : "Read Article"}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.article>
            </Link>
          )}

          {/* Stacked articles list */}
          <div className="space-y-5 flex flex-col">
            <h3 className="text-lg font-bold text-navy">
              {lang === "mr" ? "ताज्या पोस्ट्स" : "Recent Posts"}
            </h3>

            {rest.length > 0 ? (
              rest.map((n, i) => (
                <Link key={n.id} href={`/blog/${n.slug || n.id}`}>
                  <motion.article
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 bg-card rounded-2xl p-3 border hover:border-saffron transition group hover:shadow-sm"
                  >
                    <div className="w-28 h-28 rounded-xl overflow-hidden bg-secondary/30 flex-shrink-0">
                      {n.image ? (
                        <img
                          src={getMediaUrl(n.image)}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/120x120/1a2754/f97316?text=Blog";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-navy/10 flex items-center justify-center text-xs text-navy font-bold">
                          BLOG
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-saffron" />
                        {formatDate(n.published_at || n.created_at, lang)}
                      </div>
                      <h4 className="font-semibold text-navy mt-1 group-hover:text-saffron transition line-clamp-2 font-display">
                        {n.title}
                      </h4>
                      {n.meta_description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-normal">
                          {n.meta_description}
                        </p>
                      )}
                    </div>
                  </motion.article>
                </Link>
              ))
            ) : (
              <div className="text-muted-foreground py-8 text-sm border-t border-dashed">
                {lang === "mr" ? "इतर कोणतेही लेख उपलब्ध नाहीत." : "No additional posts to show."}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
