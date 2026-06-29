"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { stats, social } from "@/lib/content";
import { Counter } from "./Counter";

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Award,
  Calendar,
  Trophy,
  MapPin,
  Play,
} from "lucide-react";

export function Hero() {
  const { t } = useT();

  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-[#0d0b0a] flex flex-col overflow-visible pt-20 pb-16"
    >
      {/* Background layer with crowd image texture */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/_DSC3998.JPG (1).webp"
          alt="Crowd Background"
          className="absolute inset-0 w-full h-full object-cover opacity-12 filter grayscale contrast-125 mix-blend-luminosity"
          fill
          priority
          sizes="100vw"
        />
        {/* Dark warm gradient overlays to create vignette & depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b0a] via-[#0d0b0a]/90 to-[#0d0b0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b0a] via-transparent to-[#0d0b0a]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0b0a]/20 to-[#0d0b0a]" />

        {/* Ambient background saffron glow behind the politician */}
        <div className="absolute right-[-10%] top-[10%] w-[60%] h-[60%] rounded-full bg-saffron/8 blur-[100px] pointer-events-none" />
      </div>

      {/* Social Media floating pill on the left */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4 bg-white/5 backdrop-blur-md px-3 py-6 rounded-full border border-white/10 shadow-lg">
        {social.map((s) => {
          let Icon = Globe;
          if (s.name.toLowerCase().includes("instagram")) Icon = Instagram;
          else if (s.name.toLowerCase().includes("facebook")) Icon = Facebook;
          else if (s.name.toLowerCase().includes("twitter") || s.name.toLowerCase().includes("x"))
            Icon = Twitter;
          else if (s.name.toLowerCase().includes("youtube")) Icon = Youtube;

          return (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-saffron hover:bg-white/10 hover:scale-110 transition-all duration-300"
              title={s.name}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </div>

      {/* Main Grid Content Area */}
      <div className="container-x relative z-20 flex-1 grid lg:grid-cols-12 gap-8 items-center py-12 lg:py-0">
        {/* Left Side: Headline & Text */}
        <div className="lg:col-span-7 flex flex-col justify-center text-white pl-0 md:pl-8 lg:pl-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-saffron text-sm md:text-base font-bold tracking-widest uppercase mb-4"
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="border-l-4 border-saffron pl-5 md:pl-7 flex flex-col gap-3"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight tracking-tight drop-shadow-md">
              {t("hero.title")}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 flex flex-col gap-4"
          >
            <p className="text-lg md:text-2xl text-white/95 max-w-2xl font-medium tracking-wide">
              {t("hero.subtitle")}
            </p>
            <p className="text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
              {t("hero.desc")}
            </p>
            {/* Signature styling name overlay */}
            <span
              className="text-gold text-2xl tracking-wide font-medium mt-2 select-none italic font-display"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              — {t("hero.title")}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button
              asChild
              className="rounded-full bg-saffron text-white px-8 py-6 text-base font-semibold shadow-saffron hover:scale-105 hover:bg-saffron/90 transition-all duration-300 cursor-pointer"
            >
              <a href="/contact">{t("nav.contact")}</a>
            </Button>

            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white px-8 py-3 text-base font-semibold hover:border-white hover:bg-white/5 transition-all duration-300 group cursor-pointer"
            >
              <span>{t("nav.about") || "About"}</span>
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 shrink-0">
                <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Portrait and SVGs */}
        <div className="lg:col-span-5 relative h-full min-h-[350px] md:min-h-[480px] lg:min-h-0 flex items-end justify-center z-10 overflow-visible">
          {/* Backdrop circles & brush paint stroke */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4 }}
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-visible"
          >
            <svg
              viewBox="0 0 500 500"
              className="w-[320px] h-[320px] md:w-[480px] md:h-[480px] lg:w-[520px] lg:h-[520px] overflow-visible"
            >
              <defs>
                <linearGradient id="brushGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="oklch(0.72 0.19 50)" />
                  <stop offset="50%" stopColor="oklch(0.65 0.22 45)" />
                  <stop offset="100%" stopColor="oklch(0.78 0.14 80)" />
                </linearGradient>
                <filter id="rough-paint">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.04"
                    numOctaves="4"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="22"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>

              {/* Concentric orange circles */}
              <circle
                cx="250"
                cy="250"
                r="185"
                fill="none"
                stroke="oklch(0.72 0.19 50 / 35%)"
                strokeWidth="2"
              />
              <circle
                cx="250"
                cy="250"
                r="165"
                fill="none"
                stroke="oklch(0.72 0.19 50 / 15%)"
                strokeWidth="1"
                strokeDasharray="6 6"
              />

              {/* Textured paint brush sweep */}
              <path
                d="M 90,310 C 70,170 190,70 330,100 C 440,120 450,270 370,370 C 310,430 210,420 170,370"
                fill="none"
                stroke="url(#brushGrad)"
                strokeWidth="45"
                strokeLinecap="round"
                filter="url(#rough-paint)"
                opacity="0.9"
              />

              {/* Secondary paint splatters */}
              <path
                d="M 120,135 C 170,85 260,95 300,120"
                fill="none"
                stroke="oklch(0.78 0.14 80)"
                strokeWidth="10"
                strokeLinecap="round"
                filter="url(#rough-paint)"
                opacity="0.75"
              />
            </svg>
          </motion.div>

          {/* Politician portrait cutout */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
            className="relative z-10 w-[280px] sm:w-[350px] md:w-[420px] lg:w-[460px] h-full flex items-end justify-center select-none"
          >
            <Image
              src="/images/heroImage2-phone.png"
              alt={t("hero.title")}
              className="object-contain w-full h-auto max-h-[450px] md:max-h-[550px] lg:max-h-[600px] drop-shadow-2xl translate-y-3"
              width={500}
              height={900}
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Statistics Card at the bottom of the section */}
      <div className="container-x relative z-30 mx-auto max-w-[1200px] w-full mt-6 pb-8 lg:pb-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: "easeOut" }}
          className="relative overflow-hidden w-full rounded-[32px] bg-[#fff1e0] border border-[#fb923c]/30 shadow-[0_18px_60px_-32px_rgba(245,124,0,0.35)] p-4 md:p-6"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fb923c]/12 to-transparent opacity-95" />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {stats.map((s, index) => {
              let Icon = Award;
              if (s.key === "stats.terms") Icon = Trophy;
              else if (s.key === "stats.years") Icon = Calendar;
              else if (s.key === "stats.awards") Icon = Award;
              else if (s.key === "stats.constituency") Icon = MapPin;

              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.85 + index * 0.06, ease: "easeOut" }}
                  whileHover={{ y: -3, scale: 1.01 }}
                    className="flex flex-col items-center gap-2 rounded-3xl border border-[#fb923c]/20 bg-[#ffecdd] p-4 text-center shadow-sm min-h-[150px]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#fbbf24]/15 flex items-center justify-center text-[#c2410b] shadow-md shadow-[#fb923c]/25">
                    <Icon className="w-5 h-5" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.95 + index * 0.06, ease: "easeOut" }}
                    className="text-2xl md:text-3xl font-bold text-[#c2410b] leading-none"
                  >
                    <Counter to={s.value} suffix={s.suffix} duration={1400} />
                  </motion.div>
                  <div className="text-[10px] md:text-xs text-[#92400e] font-semibold uppercase tracking-[0.08em] leading-tight">
                    {t(s.key as Parameters<typeof t>[0])}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
