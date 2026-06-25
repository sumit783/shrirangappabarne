"use client";
import { getMediaUrl } from "@/lib/utils";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useT } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Loader2, AlertCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface DBImage {
  id: number;
  image: string;
  isHeroSelectionImage: number;
  title: string | null;
  created_at: string;
}

export default function GalleryPage() {
  const { t, lang } = useT();
  const [images, setImages] = useState<DBImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/images/`)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject("Failed to load gallery images");
        }
        return res.json();
      })
      .then((data: DBImage[]) => {
        setImages(data || []);
      })
      .catch(() => {
        setError(
          lang === "mr"
            ? "छायाचित्रे लोड करण्यात अडचण आली."
            : "Failed to load gallery images. Please try again.",
        );
      })
      .finally(() => setLoading(false));
  }, [lang]);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      {/* Subpage Header Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy via-navy/95 to-navy-soft text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[80px] pointer-events-none -ml-20 -mb-20" />

        <div className="container-x relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-saffron/20 border border-saffron/30 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
          >
            {lang === "mr" ? "छायाचित्रे आणि आठवणी" : "PHOTOS & MEMORIES"}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black font-display tracking-tight text-white"
          >
            {t("gallery.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light"
          >
            {t("gallery.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow py-16 md:py-24 bg-white">
        <div className="container-x">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 text-saffron animate-spin" />
              <p className="text-sm text-muted-foreground">
                {lang === "mr" ? "लोड होत आहे..." : "Loading gallery..."}
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center">
              <AlertCircle className="h-10 w-10 text-destructive mb-2" />
              <p>{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && images.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <Camera className="h-12 w-12 text-saffron/40" />
              <h3 className="text-xl font-bold text-navy">
                {lang === "mr" ? "कोणतीही छायाचित्रे आढळली नाहीत" : "No images found"}
              </h3>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && !error && images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  onClick={() => setLightbox(getMediaUrl(item.image))}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-elegant hover:border-saffron transition-all duration-300 cursor-zoom-in bg-secondary/20"
                >
                  <img
                    src={getMediaUrl(item.image)}
                    alt={item.title || "Gallery"}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/500x500/1a2754/f97316?text=Gallery";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    {item.title && (
                      <p className="text-white text-xs font-semibold font-display line-clamp-2">
                        {item.title}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

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

      <Footer />
    </div>
  );
}
