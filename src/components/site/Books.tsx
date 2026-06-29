import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { books } from "@/lib/content";
import { useT } from "@/lib/i18n";

const covers = [
  "from-amber-400 to-orange-600",
  "from-rose-400 to-red-600",
  "from-emerald-400 to-teal-600",
  "from-indigo-400 to-blue-700",
];

export function Books() {
  const { t, lang } = useT();
  const items = books[lang];
  return (
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            {t("nav.books")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-navy mt-4">{t("books.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("books.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {items.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[32px] bg-white/5 border border-white/10 p-6 shadow-[0_30px_90px_-45px_rgba(251,146,60,0.35)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_-30px_rgba(251,146,60,0.45)]">
                <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-r ${covers[i]} opacity-90`} />
                <div className="relative flex h-full flex-col justify-between gap-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-white/10 p-3 text-white shadow-sm">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                      {t("books.book")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-display leading-tight">{b.title}</h3>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">{b.desc}</p>
                  </div>
                  <div className="rounded-3xl bg-black/20 px-4 py-3 text-sm text-white/80 ring-1 ring-white/10">
                    {t("books.available")}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
