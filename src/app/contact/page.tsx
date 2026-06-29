"use client";

import { Navbar } from "@/components/site/Navbar";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { useT } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function ContactPage() {
  const { t, lang } = useT();

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      {/* Subpage Header Banner */}
      <section className="relative pt-32 pb-16 bg-[#0d0b0a] text-white overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[80px] pointer-events-none -ml-20 -mb-20" />

        <div className="container-x relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-saffron/20 border border-saffron/30 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
          >
            {lang === "mr" ? "कनेक्ट व्हा" : "GET IN TOUCH"}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black font-display tracking-tight text-white"
          >
            {t("contact.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light"
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>
      </section>

      <main className="flex-grow">
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
