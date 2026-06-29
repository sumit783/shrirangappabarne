"use client";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useT } from "@/lib/i18n";
import { portraitImg, stats } from "@/lib/content";
import { Counter } from "@/components/site/Counter";
import { motion } from "framer-motion";
import { Landmark, Calendar, Award, Users, Target } from "lucide-react";

const timeline = {
  mr: [
    {
      y: "१९९७",
      t: "पिंपरी-चिंचवड महापालिकेत नगरसेवक म्हणून निवड",
      desc: "पिंपरी-चिंचवड महापालिकेच्या निवडणुकीत प्रथमच नगरसेवक म्हणून निवडून येत सक्रिय राजकीय कारकिर्दीची सुरुवात केली.",
    },
    {
      y: "१९९९",
      t: "स्थायी समितीच्या अध्यक्षपदी निवड",
      desc: "पिंपरी-चिंचवड महानगरपालिकेच्या स्थायी समितीचे अध्यक्ष म्हणून काम करत अनेक विकासकामांना गती दिली.",
    },
    {
      y: "२००२",
      t: "पुन्हा नगरसेवक म्हणून निवड",
      desc: "जनतेचा विश्वास कायम राखत दुसऱ्यांदा नगरसेवक म्हणून निवडून आले.",
    },
    {
      y: "२००२–०५",
      t: "विरोधी पक्षनेते व जिल्हा नियोजन समिती सदस्य",
      desc: "पिंपरी-चिंचवड महापालिकेत विरोधी पक्षनेते म्हणून प्रभावी भूमिका बजावत पुणे जिल्हा नियोजन समितीवरही सदस्य म्हणून कार्य केले.",
    },
    {
      y: "२००७",
      t: "तिसऱ्यांदा नगरसेवक म्हणून निवड",
      desc: "पुन्हा नगरसेवक म्हणून निवडून येत स्थानिक विकास आणि नागरिकांच्या प्रश्नांसाठी सातत्याने कार्य केले.",
    },
    {
      y: "२०१२",
      t: "नगरसेवक व शिवसेना गटनेते",
      desc: "नगरसेवक म्हणून निवडून येत शिवसेना गटनेतेपदाची जबाबदारी स्वीकारली.",
    },
    {
      y: "२०१४",
      t: "१६व्या लोकसभेसाठी खासदार म्हणून निवड",
      desc: "मावळ लोकसभा मतदारसंघातून प्रथमच खासदार म्हणून निवडून येत राष्ट्रीय राजकारणात प्रवेश केला.",
    },
    {
      y: "२०१५",
      t: "‘संसद रत्न’ पुरस्कार",
      desc: "संसदेतील उल्लेखनीय आणि सक्रिय कामगिरीबद्दल 'संसद रत्न' पुरस्काराने गौरविण्यात आले.",
    },
    {
      y: "२०१६",
      t: "पुन्हा ‘संसद रत्न’ पुरस्कार",
      desc: "सलग दुसऱ्या वर्षी उत्कृष्ट संसदीय कामगिरीबद्दल 'संसद रत्न' पुरस्कार प्राप्त झाला.",
    },
    {
      y: "२०१९",
      t: "१७व्या लोकसभेसाठी पुन्हा निवड",
      desc: "जनतेचा विश्वास कायम राखत दुसऱ्यांदा खासदार म्हणून लोकसभेत निवडून आले.",
    },
    {
      y: "२०२०",
      t: "‘संसद महारत्न’ पुरस्कार",
      desc: "उत्कृष्ट संसदीय योगदानासाठी प्रतिष्ठित 'संसद महारत्न' पुरस्काराने सन्मानित करण्यात आले.",
    },
    {
      y: "२०२४",
      t: "१८व्या लोकसभेसाठी सलग तिसऱ्यांदा निवड",
      desc: "सलग तिसऱ्यांदा खासदार म्हणून निवडून येत विकासाची वाटचाल अधिक बळकट केली.",
    },
    {
      y: "२०२५",
      t: "विशेष संसदरत्न पुरस्कार",
      desc: "संसदेतील सातत्यपूर्ण आणि उल्लेखनीय कामगिरीबद्दल 'विशेष संसदरत्न पुरस्कार' प्रदान करण्यात आला.",
    },
  ],
  en: [
    {
      y: "1997",
      t: "Elected as Corporator, Pimpri-Chinchwad Municipal Corporation",
      desc: "Began his political career by being elected as a Corporator in the Pimpri-Chinchwad Municipal Corporation.",
    },
    {
      y: "1999",
      t: "Elected Chairman of the Standing Committee",
      desc: "Served as the Chairman of the Standing Committee of the Pimpri-Chinchwad Municipal Corporation, contributing to key development initiatives.",
    },
    {
      y: "2002",
      t: "Re-elected as Corporator",
      desc: "Earned the trust of the people once again by being re-elected as a Corporator.",
    },
    {
      y: "2002–05",
      t: "Leader of the Opposition & District Planning Committee Member",
      desc: "Served as the Leader of the Opposition in the Pimpri-Chinchwad Municipal Corporation and as a member of the Pune District Planning Committee.",
    },
    {
      y: "2007",
      t: "Re-elected as Corporator",
      desc: "Continued his commitment to local development after being elected as a Corporator for another term.",
    },
    {
      y: "2012",
      t: "Corporator & Shiv Sena Group Leader",
      desc: "Elected as a Corporator and entrusted with the responsibility of serving as the Shiv Sena Group Leader.",
    },
    {
      y: "2014",
      t: "Elected to the 16th Lok Sabha",
      desc: "Entered national politics after being elected as a Member of Parliament from the Maval Lok Sabha constituency.",
    },
    {
      y: "2015",
      t: "Received the Sansad Ratna Award",
      desc: "Honoured with the prestigious Sansad Ratna Award for outstanding performance in Parliament.",
    },
    {
      y: "2016",
      t: "Received the Sansad Ratna Award Again",
      desc: "Received the Sansad Ratna Award for the second consecutive year in recognition of his exceptional parliamentary performance.",
    },
    {
      y: "2019",
      t: "Re-elected to the 17th Lok Sabha",
      desc: "Won a second consecutive term as Member of Parliament, reaffirming the trust and support of the people.",
    },
    {
      y: "2020",
      t: "Honoured with the Sansad Maharatna Award",
      desc: "Received the prestigious Sansad Maharatna Award for his remarkable contribution to parliamentary proceedings.",
    },
    {
      y: "2024",
      t: "Elected to the 18th Lok Sabha for a Third Consecutive Term",
      desc: "Secured a historic third consecutive victory as a Member of Parliament, continuing his commitment to the development of the constituency.",
    },
    {
      y: "2025",
      t: "Honoured with the Special Sansad Ratna Award",
      desc: "Received the Special Sansad Ratna Award in recognition of his consistent and distinguished parliamentary performance.",
    },
  ],
};

const principles = {
  mr: [
    {
      title: "पारदर्शकता व प्रामाणिकपणा",
      desc: "जनतेचा पैसा आणि विकास निधी पूर्णपणे लोककल्याणकारी कामांसाठी वापरण्यावर भर.",
    },
    {
      title: "संसदीय कर्तव्य दक्षता",
      desc: "संसदेतील उपस्थिती, वादविवाद सहभाग आणि प्रश्न विचारण्यात नेहमी अग्रस्थानी राहणे.",
    },
    {
      title: "सर्वसमावेशक विकास",
      desc: "शहरी तसेच ग्रामीण भागातील प्रत्येक घटकापर्यंत विकासाचे फळ पोहोचवण्याचे ध्येय.",
    },
  ],
  en: [
    {
      title: "Transparency & Integrity",
      desc: "Ensuring public funds and resources are utilized entirely for social development projects.",
    },
    {
      title: "Parliamentary Excellence",
      desc: "Maintaining high attendance and active engagement in debates and policy formulations.",
    },
    {
      title: "Inclusive Governance",
      desc: "Bridging the gap between rural and urban regions of Maval through equitable development.",
    },
  ],
};

const iconMap = [Landmark, Calendar, Award, Users];

export default function AboutPage() {
  const { t, lang } = useT();
  const timelineItems = timeline[lang];
  const principlesItems = principles[lang];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      {/* Subpage Header Banner */}
      <section className="relative pt-32 pb-20 bg-[#0d0b0a] text-white overflow-hidden">
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
            {t("about.label")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black font-display tracking-tight text-white"
          >
            {lang === "mr" ? "नेतृत्व आणि कार्यप्रणाली" : "Leadership & Governance"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light"
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </section>

      <main className="flex-grow">
        {/* Biography Showcase */}
        <section className="py-20 md:py-28 container-x bg-white">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
            {/* Left side: Premium Frame Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto max-w-[440px] w-full"
            >
              <div className="absolute -inset-4 bg-gradient-saffron rounded-3xl opacity-30 blur-lg" />
              <div className="relative rounded-3xl overflow-hidden border bg-background p-2 shadow-2xl">
                <img
                  src="images/strip photo.webp"
                  alt={t("hero.title")}
                  loading="lazy"
                  className="rounded-2xl w-full object-cover shadow"
                />
              </div>
            </motion.div>

            {/* Right side: Multi-Card Biography */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-black text-navy leading-tight font-display">
                  {t("about.title")}
                </h2>
                <div className="h-[4px] bg-saffron w-24 mt-3 rounded-full" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="border-l-4 border-saffron pl-5 py-2 text-navy/90 font-display text-lg md:text-xl font-semibold italic bg-saffron/5 rounded-r-2xl"
              >
                "{t("hero.tagline")}"
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base"
              >
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
              </motion.div>

              {/* Stats Block (Counter Grid) */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {stats.map((s, i) => {
                  const IconComponent = iconMap[i] || Landmark;
                  return (
                    <motion.div
                      key={s.key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-card border rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition duration-300"
                    >
                      <div className="p-3 rounded-xl bg-saffron/10 text-saffron">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-2xl md:text-3xl font-black text-navy leading-none">
                          <Counter to={s.value} suffix={s.suffix} />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1.5 leading-snug font-semibold">
                          {t(s.key as Parameters<typeof t>[0])}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Timeline (Political Journey) */}
        <section className="py-20 md:py-28 bg-secondary/30 relative">
          <div className="container-x">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block bg-saffron/10 text-saffron px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {lang === "mr" ? "इतिहास" : "CHRONOLOGY"}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-navy mt-3 font-display">
                {t("about.journey")}
              </h2>
              <div className="h-[4px] bg-saffron w-20 mx-auto mt-3 rounded-full" />
            </div>

            {/* Timeline Tree */}
            <div className="relative max-w-4xl mx-auto">
              {/* Vertical center bar */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-saffron/30 -translate-x-1/2" />

              <div className="space-y-12">
                {timelineItems.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={item.y}
                      className="relative flex flex-col md:flex-row items-start md:items-center"
                    >
                      {/* Timeline dot marker */}
                      <div className="absolute left-4 md:left-1/2 top-1 md:top-auto h-5 w-5 rounded-full bg-saffron ring-4 ring-saffron/20 -translate-x-1/2 z-10" />

                      {/* Content block */}
                      <div
                        className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:order-last"}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                          className="bg-card border rounded-2xl p-6 shadow-elegant hover:border-saffron transition duration-300"
                        >
                          <span className="inline-block bg-saffron text-white text-sm font-black px-3 py-1 rounded-full mb-3">
                            {item.y}
                          </span>
                          <h4 className="text-lg md:text-xl font-bold text-navy font-display">
                            {item.t}
                          </h4>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {item.desc}
                          </p>
                        </motion.div>
                      </div>

                      {/* Spacer for empty side on desktop */}
                      <div className="hidden md:block w-1/2" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Principles Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container-x">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block bg-saffron/10 text-saffron px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {lang === "mr" ? "मूल्ये" : "OUR VALUES"}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-navy mt-3 font-display">
                {lang === "mr" ? "कार्यप्रणाली आणि मूल्ये" : "Governance & Values"}
              </h2>
              <div className="h-[4px] bg-saffron w-20 mx-auto mt-3 rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {principlesItems.map((p, idx) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-card border rounded-3xl p-8 hover:shadow-elegant hover:border-saffron transition duration-300 flex flex-col items-center text-center"
                >
                  <div className="h-12 w-12 rounded-2xl bg-saffron/10 text-saffron flex items-center justify-center mb-6">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-navy font-display">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
