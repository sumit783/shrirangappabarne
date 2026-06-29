const news = [
  {
    date: "२० नोव्हें २०२६",
    tag: "विकासकार्य",
    title: "पिंपरी-चिंचवडमध्ये नवीन ६ लेन रस्त्याला केंद्राची मंजुरी",
    excerpt: "मावळ मतदारसंघातील वाहतूक कोंडी सोडवण्यासाठी महत्त्वपूर्ण निर्णय.",
  },
  {
    date: "१४ नोव्हें २०२६",
    tag: "संसद",
    title: "ऊर्जा क्षेत्रासाठी नवीन धोरणावर लोकसभेत चर्चा",
    excerpt: "स्थायी समितीच्या अहवालावर सविस्तर निवेदन सादर.",
  },
  {
    date: "०२ नोव्हें २०२६",
    tag: "लोकसेवा",
    title: "कर्जतमध्ये मोफत आरोग्य शिबिराचे यशस्वी आयोजन",
    excerpt: "१२०० हून अधिक नागरिकांची मोफत तपासणी आणि उपचार.",
  },
];

export function NewsSection() {
  return (
    <section id="news" className="bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <span className="chip-divider text-xs font-semibold uppercase tracking-[0.25em] text-saffron-deep">
            ताज्या बातम्या
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">घडामोडी व उपक्रम</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {news.map((n) => (
            <article
              key={n.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-[var(--gradient-saffron)] px-3 py-1 font-semibold text-saffron-foreground">
                  {n.tag}
                </span>
                <span className="text-muted-foreground">{n.date}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold leading-snug group-hover:text-saffron-deep">
                {n.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{n.excerpt}</p>
              <a
                href="#"
                className="mt-4 inline-flex items-center text-sm font-semibold text-saffron-deep"
              >
                सविस्तर वाचा →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
