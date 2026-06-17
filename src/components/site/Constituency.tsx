import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { constituencies } from "@/lib/content";
import { useT } from "@/lib/i18n";

export function Constituency() {
  const { t, lang } = useT();
  const items = constituencies[lang];
  return (
    <section id="constituency" className="py-24 md:py-32 bg-secondary/40">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            {t("nav.constituency")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-navy mt-4">
            {t("constituency.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("constituency.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {items.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative bg-card rounded-2xl p-7 border hover:border-saffron hover:shadow-saffron transition overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-saffron rounded-full opacity-10 group-hover:opacity-20 transition" />
              <MapPin className="h-9 w-9 text-saffron" />
              <h3 className="mt-4 text-2xl font-bold text-navy">{c.name}</h3>
              <p className="mt-2 text-muted-foreground">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
