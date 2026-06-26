"use client";
import { getMediaUrl } from "@/lib/utils";
import Image from "next/image";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { useT } from "@/lib/i18n";


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface DBImage {
  id: number;
  image: string;
  isHeroSelectionImage: number;
  title: string | null;
  created_at: string;
}

export function Hero() {
  const { t } = useT();
  const [slides, setSlides] = useState<string[]>([]);

  useEffect(() => {
    // Static images from the frontend
    const staticSlides = ["/images/_DSC3998.JPG (1).webp", "/images/_DSC4007.JPG.webp","/images/hero-image-1-1280.webp"];

    // Fetch dynamic hero images
    fetch(`${API_BASE}/api/images/hero`)
      .then((res) => {
        if (!res.ok) {
          console.warn("Hero API is unavailable, using static fallback images");
          return [];
        }
        return res.json();
      })
      .then((data: DBImage[]) => {
        const dbSlides = (data || [])
          .filter((item) => item.image)
          .map((item) => getMediaUrl(item.image));

        // Combine static frontend slides first, then dynamic ones
        setSlides([...staticSlides, ...dbSlides]);
      })
      .catch((err) => {
        console.error("Error fetching dynamic hero images:", err);
        // Fallback to static slides if API fails
        setSlides(staticSlides);
      });
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {slides.length > 0 && (
        <Swiper
          modules={[Autoplay, EffectCreative, Pagination]}
          effect="creative"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-20%", 0, -1],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {slides.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={src}
                  alt="Hero slide"
                  className="object-cover hero-zoom-img"
                  fill
                  priority={i === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-hero" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* <div className="absolute inset-0 flex items-end pb-32 md:pb-40 pointer-events-none z-10">
        <div className="container-x text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-saffron text-sm md:text-base font-semibold tracking-widest uppercase mb-3"
          >
            {t("hero.tagline")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl drop-shadow-lg"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 text-lg md:text-2xl opacity-95 max-w-2xl"
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </div> */}
    </section>
  );
}
