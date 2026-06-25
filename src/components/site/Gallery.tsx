"use client";
import { getMediaUrl } from "@/lib/utils";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface DBImage {
  id: number;
  image: string;
  isHeroSelectionImage: number;
  title: string | null;
  created_at: string;
}

// Helper to fill marquee rows for infinite scrolling
const fillMarquee = (arr: string[]) => {
  if (arr.length === 0) return [];
  let result = [...arr];
  // Ensure we have at least 12 items for seamless visual coverage
  while (result.length < 12) {
    result = [...result, ...arr];
  }
  // Duplicate the final set for the infinite loop translateX(-50%) animation
  return [...result, ...result];
};

export function Gallery() {
  const { t, lang } = useT();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/images/`)
      .then((res) => {
        if (!res.ok) {
          console.warn("Gallery API is unavailable");
          return [];
        }
        return res.json();
      })
      .then((data: DBImage[]) => {
        const urls = (data || [])
          .filter((item) => item.image)
          .map((item) => getMediaUrl(item.image));
        setImages(urls);
      })
      .catch((err) => {
        console.error("Error loading gallery images:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Split images into two alternating rows
  const set1 = images.filter((_, i) => i % 2 === 0);
  const set2 = images.filter((_, i) => i % 2 !== 0);

  const row1Items = fillMarquee(set1);
  const row2Items = fillMarquee(set2.length > 0 ? set2 : set1);

  return (
    <section id="gallery" className="bg-white overflow-hidden py-16 md:py-24">
      {/* Title */}
      <div className="container-x text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
          {t("nav.gallery")}
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-navy mt-4 font-display">
          {t("gallery.title")}
        </h2>
        <p className="mt-4 text-muted-foreground">{t("gallery.subtitle")}</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
          <Loader2 className="h-8 w-8 text-saffron animate-spin" />
          <p className="text-xs">{lang === "mr" ? "लोड होत आहे..." : "Loading gallery..."}</p>
        </div>
      )}

      {/* Slider Rows */}
      {!loading && images.length > 0 ? (
        <div className="flex flex-col gap-6 w-full select-none cursor-pointer">
          {/* Row 1: Scrolling Left */}
          <div className="relative overflow-hidden w-full flex">
            <div className="flex gap-6 animate-marquee w-max py-2 hover:[animation-play-state:paused]">
              {row1Items.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setLightbox(src)}
                  className="relative h-36 w-56 sm:h-44 sm:w-72 md:h-52 md:w-80 overflow-hidden rounded-2xl border border-gray-100 shadow-md group flex-shrink-0"
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/400x300/1a2754/f97316?text=Gallery";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="relative overflow-hidden w-full flex">
            <div className="flex gap-6 animate-marquee-reverse w-max py-2 hover:[animation-play-state:paused]">
              {row2Items.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setLightbox(src)}
                  className="relative h-36 w-56 sm:h-44 sm:w-72 md:h-52 md:w-80 overflow-hidden rounded-2xl border border-gray-100 shadow-md group flex-shrink-0"
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/400x300/1a2754/f97316?text=Gallery";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        !loading && (
          <div className="container-x text-center text-muted-foreground py-10">
            {lang === "mr" ? "सध्या चित्रे उपलब्ध नाहीत." : "No images available."}
          </div>
        )
      )}

      {/* View All Button */}
      <div className="container-x text-center mt-12">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-navy-soft text-white hover:text-saffron rounded-full font-bold text-sm shadow-md transition-all duration-300"
        >
          {lang === "mr" ? "सर्व छायाचित्रे पहा" : "View All Images"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 bg-black/95 z-[80] flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition">
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightbox}
              alt=""
              className="max-h-[90vh] max-w-[95vw] rounded-2xl shadow-2xl border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
