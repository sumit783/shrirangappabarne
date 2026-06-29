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
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="space-y-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-12 rounded-full bg-saffron" />
                <span className="inline-block h-2 w-2 rounded-full bg-saffron" />
              </div>
              <h2 className="mt-6 text-3xl md:text-5xl font-bold text-navy leading-tight">
                {t("constituency.title")}
              </h2>
              <p className="mt-5 text-muted-foreground leading-8">
                {t("constituency.subtitle")}
              </p>
            </div>

            <div className="relative rounded-[2rem] border border-saffron/20 bg-navy p-8 shadow-elegant overflow-hidden">
              <div className="pointer-events-none absolute -left-10 top-10 h-28 w-28 rounded-full bg-saffron/20 blur-3xl" />
              <div className="pointer-events-none absolute -right-12 top-24 h-24 w-24 rounded-full bg-white/10 blur-3xl" />
              <div className="flex items-start gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-saffron text-white shadow-saffron">
                  <MapPin className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.24em] font-bold text-saffron">
                    {t("constituency.highlight") || t("nav.constituency")}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {t("constituency.focus") || "समावेशक विकास आणि विश्वासार्ह नेतृत्व"}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-200">
                {t("constituency.note") ||
                  "प्रत्येक मतदारसंघातील प्रकल्पांसाठी आम्ही सतत काम करतो आणि स्थानिक गरजा पूर्ण करण्यावर लक्ष केंद्रित करतो."}
              </p>
              <div className="mt-8 h-0.5 w-24 rounded-full bg-saffron/50" />
              <p className="mt-5 text-sm leading-7 text-slate-200">
                {t("constituency.summary") ||
                  "समावेशक विकास, स्थिर प्रकल्प आणि सर्व मतदारांसाठी नवीन संधी मिळून देण्यावर आमचा निर्धार आहे."}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((c, i) => (
              <motion.article
                key={c.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 shadow-elegant transition hover:border-saffron hover:shadow-saffron"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-saffron/10 opacity-90" />
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-3xl bg-saffron/10 text-saffron">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-navy">{c.name}</h3>
                      <span className="h-2 w-2 rounded-full bg-saffron" />
                    </div>
                    <div className="mt-3 h-0.5 w-16 rounded-full bg-saffron/40" />
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  {c.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
