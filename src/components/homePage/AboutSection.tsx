const milestones = [
  { year: "१९९७", text: "पिंपरी-चिंचवड महापालिकेत नगरसेवक म्हणून राजकीय वाटचालीची सुरुवात." },
  { year: "१९९९", text: "स्थायी समितीचे अध्यक्षपद भूषविले." },
  { year: "२०१४", text: "१६व्या लोकसभेसाठी मावळ मतदारसंघातून खासदार म्हणून निवड." },
  { year: "२०१९", text: "१७व्या लोकसभेसाठी दुसऱ्यांदा खासदार." },
  { year: "२०२४", text: "१८व्या लोकसभेसाठी सलग तिसऱ्यांदा खासदार." },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-start gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="chip-divider text-xs font-semibold uppercase tracking-[0.25em] text-saffron-deep">
              परिचय
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              नगरसेवक ते खासदार — एक दूरदर्शी प्रवास
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                श्रीरंग आप्पा बारणे यांनी १९९७ साली पिंपरी-चिंचवड महापालिकेत नगरसेवक म्हणून
                राजकीय वाटचाल सुरू केली. १९९९ साली स्थायी समिती अध्यक्षपद, त्यानंतर विरोधी
                पक्षनेते व शिवसेना गटनेते म्हणून प्रभावी भूमिका बजावली.
              </p>
              <p>
                २०१४, २०१९ आणि २०२४ — सलग तीन वेळा जनतेने त्यांना मावळ लोकसभेसाठी निवडले.
                खासदार म्हणून त्यांनी ऊर्जा, संरक्षण, अर्थसंकल्प, पर्यटन व संस्कृती अशा
                महत्त्वाच्या संसदीय समित्यांवर कार्य केले आहे.
              </p>
            </div>
          </div>
          <ol className="relative space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border">
            {milestones.map((m) => (
              <li key={m.year} className="relative pl-10">
                <span className="absolute left-0 top-1 grid h-7 w-7 place-items-center rounded-full bg-[var(--gradient-saffron)] font-display text-[10px] font-bold text-saffron-foreground ring-4 ring-background">
                  •
                </span>
                <div className="font-display text-lg font-bold text-saffron-deep">{m.year}</div>
                <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
