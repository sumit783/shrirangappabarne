import { Building2, Megaphone, Users, Zap } from "lucide-react";

const workAreas = [
  {
    icon: Building2,
    title: "पायाभूत सुविधा",
    desc: "रस्ते, पूल आणि सार्वजनिक वाहतूक व्यवस्थेचा सातत्याने विस्तार.",
  },
  {
    icon: Zap,
    title: "ऊर्जा व पर्यावरण",
    desc: "ऊर्जा समिती अध्यक्ष म्हणून शाश्वत ऊर्जा धोरणाचा पाठपुरावा.",
  },
  {
    icon: Users,
    title: "शिक्षण व आरोग्य",
    desc: "शाळा-रुग्णालय सुविधा बळकट करण्यासाठी निरंतर प्रयत्न.",
  },
  {
    icon: Megaphone,
    title: "जनसेवा",
    desc: "जनतेच्या समस्या थेट ऐकून तातडीने सोडवण्याची कार्यपद्धती.",
  },
];

export function WorkAreasSection() {
  return (
    <section id="work" className="bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="chip-divider text-xs font-semibold uppercase tracking-[0.25em] text-saffron-deep">
            कार्यक्षेत्र
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            नेत्याचे कार्य, जनतेशी नाते
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {workAreas.map((w) => (
            <article
              key={w.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[var(--gradient-saffron)]" />
              <w.icon className="h-7 w-7 text-saffron" />
              <h3 className="mt-4 font-display text-lg font-bold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
