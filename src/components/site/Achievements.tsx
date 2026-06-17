import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { achievements } from "@/lib/content";
import { useT } from "@/lib/i18n";

export function Achievements() {
  const { t, lang } = useT();
  const items = achievements[lang];
  return (
    <section className="py-24 md:py-32 container-x">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
          {t("achievements.title")}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-navy mt-4">{t("achievements.title")}</h2>
        <p className="mt-4 text-muted-foreground">{t("achievements.subtitle")}</p>
      </div>

      <div className="relative mt-16 max-w-4xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-saffron/30 -translate-x-1/2" />
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative mb-10 md:mb-14 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"} pl-12 md:pl-0`}
          >
            <div
              className="absolute left-4 md:left-auto md:right-0 top-4 -translate-x-1/2 md:translate-x-1/2 h-8 w-8 rounded-full bg-saffron text-white flex items-center justify-center shadow-saffron"
              style={i % 2 === 0 ? {} : { right: "auto", left: 0, transform: "translateX(-50%)" }}
            >
              <Award className="h-4 w-4" />
            </div>
            <div className="bg-card border rounded-2xl p-6 shadow-elegant hover:-translate-y-1 transition">
              <div className="text-saffron font-bold">{it.year}</div>
              <h3 className="text-xl font-bold text-navy mt-1">{it.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm">{it.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
