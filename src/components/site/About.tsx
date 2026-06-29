import Image from "next/image";
import { motion } from "framer-motion";
import { portraitImg } from "@/lib/content";
import { useT } from "@/lib/i18n";

const timeline = {
  mr: [
    { y: "२०१९", t: "१७ व्या लोकसभेसाठी पुन्हा निवडून आले" },
    { y: "२०२०", t: "‘संसद महारत्न’ पुरस्काराने सन्मानित" },
    { y: "२०२४", t: "सलग तिसऱ्यांदा १८व्या लोकसभेसाठी खासदार म्हणून निवड" },
    { y: "२०२५", t: "विशेष संसदरत्न पुरस्काराने सन्मानित" },
  ],
  en: [
    { y: "2019", t: "Re-elected to the 17th Lok Sabha" },
    { y: "2020", t: "Honoured with the Sansad Maharatna Award" },
    {
      y: "2024",
      t: "Elected as a Member of Parliament to the 18th Lok Sabha for a third consecutive term",
    },
    { y: "2025", t: "Honoured with the Special Sansad Ratna Award" },
  ],
};

export function About() {
  const { t, lang } = useT();
  const items = timeline[lang];
  return (
    <section id="about" className="py-24 md:py-32 container-x">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-sm mx-auto lg:max-w-none lg:mx-0"
        >
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-[2.5rem] bg-[#fb923c]/20 blur-3xl" />
          <div className="absolute right-0 top-16 h-48 w-48 rounded-[2rem] border border-[#fb923c]/20 bg-[#fb923c]/10 blur-xl" />
          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[#0f0a05] shadow-[0_40px_120px_-50px_rgba(251,146,60,0.45)]">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fb923c] via-[#fb923c]/40 to-transparent opacity-90" />
            <Image
              src="/images/strip photo.webp"
              alt={t("hero.title")}
              loading="lazy"
              width={1024}
              height={1280}
              className="relative rounded-[38px] object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b0a]/70 via-transparent to-[#0d0b0a]/90" />
          </div>
          <div className="absolute left-8 bottom-[-16px] rounded-[28px] bg-[#0d0b0a] border border-[#fb923c]/15 px-5 py-4 shadow-xl shadow-[#fb923c]/20">
            <p className="text-sm uppercase tracking-[0.25em] text-[#fb923c]">माझा प्रवास</p>
            <p className="mt-2 text-xs text-white/70">2010 • 2014 • 2019 • 2024</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            {t("nav.about")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-navy mt-4">{t("about.title")}</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">{t("about.p1")}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.p2")}</p>

          <h3 className="mt-10 text-xl font-semibold text-navy">{t("about.journey")}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {items.map((it, i) => (
              <motion.div
                key={it.y}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-[#fb923c]/15 bg-[#fff7ef]/80 p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fb923c] text-sm font-semibold text-white shadow-sm">
                    {it.y}
                  </span>
                  <p className="text-sm text-[#1f2937]">{it.t}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
