import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { stats } from "@/lib/content";
import { Counter } from "./Counter";

export function InfoCard() {
  const { t } = useT();
  return (
    <div className="container-x relative z-20 -mt-56 md:-mt-40">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-card rounded-3xl shadow-elegant border overflow-hidden grid grid-cols-[56px_1fr] sm:grid-cols-[80px_1fr] md:grid-cols-[140px_1fr]"
      >
        {/* Left Side: Vertical Text Banner */}
        <div className="relative bg-gradient-to-b from-saffron via-saffron/90 to-saffron flex items-center justify-center overflow-hidden">
          <span
            className="font-display font-black text-white/30 select-none tracking-widest"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              lineHeight: 1,
            }}
          >
            {t("about.label")}
          </span>
        </div>

        {/* Right Side: About Content */}
        <div className="p-5 sm:p-8 md:p-12">
          <h2 className="text-2xl md:text-4xl font-bold text-navy leading-tight">
            {t("hero.title")}
          </h2>
          <p className="text-saffron font-semibold mt-2">{t("hero.subtitle")}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">{t("hero.desc")}</p>
          <p className="mt-6 text-lg md:text-xl font-display italic text-navy border-l-4 border-saffron pl-4">
            "{t("hero.tagline")}"
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((s) => (
              <div key={s.key} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-saffron">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {t(s.key as Parameters<typeof t>[0])}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
