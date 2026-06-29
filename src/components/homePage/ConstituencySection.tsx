import { MapPin } from "lucide-react";
import { PuneMap3D } from "@/components/site/PuneMap3D";

const assemblies = [
  "पनवेल",
  "कर्जत",
  "उरण",
  "पिंपरी",
  "चिंचवड",
  "मावळ",
];

export function ConstituencySection() {
  return (
    <section id="constituency" className="bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <span className="chip-divider text-xs font-semibold uppercase tracking-[0.25em] text-saffron-deep">
            मतदारसंघ
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            आम्ही मावळसाठी काम करतो
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            महाराष्ट्राच्या नकाशावर मावळ लोकसभा मतदारसंघ — पुणे आणि रायगड या दोन जिल्ह्यांना
            जोडणारा, औद्योगिक व ऐतिहासिक वारशाने समृद्ध भाग.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="relative rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-elevated)] md:p-8">
            <PuneMap3D className="w-full" />
          </div>

          <div>
            <h3 className="font-display text-2xl font-bold md:text-3xl">
              मावळ लोकसभेतील ६ विधानसभा क्षेत्रे
            </h3>
            <p className="mt-3 text-muted-foreground">
              या सर्व क्षेत्रांत विकासकार्ये, सार्वजनिक सुविधा आणि जनसंपर्क कार्यक्रम सातत्याने
              सुरू आहेत.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {assemblies.map((a) => (
                <li
                  key={a}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition hover:border-saffron hover:shadow-md"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--gradient-saffron)] text-saffron-foreground">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="font-display text-lg font-semibold">{a}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-[var(--gradient-saffron)] p-6 text-saffron-foreground shadow-lg">
              <div className="text-xs font-semibold uppercase tracking-widest opacity-90">
                लोकसंख्या व्याप्ती
              </div>
              <div className="mt-1 font-display text-3xl font-bold text-primary">२० लाख+ मतदार</div>
              <p className="mt-2 text-sm opacity-95 text-black">
                शहरी, ग्रामीण आणि औद्योगिक — तीनही पट्ट्यांचा संगम असलेला मतदारसंघ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
