import { Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span className="chip-divider text-xs font-semibold uppercase tracking-[0.25em] text-saffron-deep">
            जनसंपर्क
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">संपर्क साधा</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            आपल्या सूचना, समस्या व विकासविषयक प्रस्ताव थेट कार्यालयाशी कळवा.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            { icon: Phone, title: "दूरध्वनी", value: "+91 98220 04494", href: "tel:+919822004494" },
            {
              icon: Mail,
              title: "ईमेल",
              value: "office@shrirangappabarne.in",
              href: "mailto:office@shrirangappabarne.in",
            },
            {
              icon: MapPin,
              title: "कार्यालय",
              value: "पिंपरी-चिंचवड, पुणे, महाराष्ट्र",
              href: "#",
            },
          ].map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--gradient-saffron)] text-saffron-foreground">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {c.title}
                </div>
                <div className="mt-1 font-display text-lg font-bold text-foreground group-hover:text-saffron-deep">
                  {c.value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
