import { Award } from "lucide-react";

export function AchievementsSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-saffron)" }}
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 text-saffron-foreground">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            संसदेतील उल्लेखनीय कामगिरीची पावती
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "संसदरत्न पुरस्कार",
              "विशेष संसदरत्न पुरस्कार",
              "संसद महारथी पुरस्कार",
              "Chairman — Standing Committee on Energy",
            ].map((a) => (
              <li
                key={a}
                className="flex items-start gap-3 rounded-xl bg-saffron-foreground/10 p-4 ring-1 ring-saffron-foreground/20"
              >
                <Award className="mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-sm font-semibold">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
