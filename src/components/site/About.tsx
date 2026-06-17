import { motion } from "framer-motion";
import { portraitImg } from "@/lib/content";
import { useT } from "@/lib/i18n";

const timeline = {
  mr: [
    { y: "2009", t: "नगरसेवक, पिंपरी-चिंचवड" },
    { y: "2014", t: "पहिल्यांदा खासदार म्हणून निवड" },
    { y: "2019", t: "दुसऱ्यांदा खासदार म्हणून निवड" },
    { y: "2024", t: "तिसऱ्यांदा खासदार म्हणून निवड" },
  ],
  en: [
    { y: "2009", t: "Corporator, Pimpri-Chinchwad" },
    { y: "2014", t: "Elected MP for the first time" },
    { y: "2019", t: "Elected MP for the second term" },
    { y: "2024", t: "Elected MP for the third term" },
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
          <div className="absolute -inset-4 bg-gradient-saffron rounded-3xl rotate-3" />
          <img
            src={portraitImg.src}
            alt={t("hero.title")}
            loading="lazy"
            width={1024}
            height={1280}
            className="relative rounded-3xl shadow-elegant w-full object-cover"
          />
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
          <ol className="mt-6 relative border-l-2 border-saffron/30 space-y-6 pl-6">
            {items.map((it, i) => (
              <motion.li
                key={it.y}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[34px] top-1 h-4 w-4 rounded-full bg-saffron ring-4 ring-saffron/20" />
                <div className="text-saffron font-bold">{it.y}</div>
                <div className="text-foreground">{it.t}</div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
