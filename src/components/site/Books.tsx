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
              className="group perspective"
            >
              <div
                className={`relative h-72 rounded-2xl bg-gradient-to-br ${covers[i]} p-6 flex flex-col justify-between text-white shadow-elegant overflow-hidden transition-transform group-hover:-rotate-2 group-hover:scale-105`}
              >
                <BookOpen className="h-8 w-8 opacity-70" />
                <div>
                  <h3 className="text-xl font-bold font-display leading-tight">{b.title}</h3>
                  <p className="mt-2 text-sm opacity-90">{b.desc}</p>
                </div>
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
