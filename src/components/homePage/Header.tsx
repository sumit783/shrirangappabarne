import { Facebook, Instagram, Megaphone, Twitter } from "lucide-react";

const navLinks = [
  { label: "मुखपृष्ठ", href: "#home" },
  { label: "परिचय", href: "#about" },
  { label: "मतदारसंघ", href: "#constituency" },
  { label: "कार्य", href: "#work" },
  { label: "व्हिडिओ", href: "#videos" },
  { label: "बातम्या", href: "#news" },
  { label: "जनसंपर्क", href: "#contact" },
];

const tickerItems = [
  "मावळ लोकसभेसाठी नवीन रेल्वे प्रकल्पाला मंजुरी",
  "पिंपरी-चिंचवडमध्ये आरोग्य शिबिराचे आयोजन — १५ डिसेंबर",
  "ऊर्जा समितीचा अहवाल लोकसभेत सादर",
  "कर्जत येथे शेतकरी मेळावा — सहभाग नोंदवा",
  "संसदरत्न पुरस्कार समारंभाची तारीख जाहीर",
  "पनवेल बायपास रस्त्याच्या कामाला गती",
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white text-foreground shadow-[var(--shadow-elevated)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <a href="#home" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-muted ring-1 ring-border text-saffron-deep">
            <span className="font-display text-lg font-bold">श्री</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold md:text-lg">श्रीरंग आप्पा बारणे</div>
            <div className="text-[11px] text-muted-foreground md:text-xs">खासदार, मावळ लोकसभा</div>
          </div>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com/shrirangchandubarne"
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-full bg-muted transition hover:bg-accent hover:text-accent-foreground"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/shrirangappabarne/"
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-full bg-muted transition hover:bg-accent hover:text-accent-foreground"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://x.com/MPShrirangBarne"
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-full bg-muted transition hover:bg-accent hover:text-accent-foreground"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="flex items-stretch border-t border-saffron-foreground/20 bg-ink/85 text-saffron-foreground">
        <div className="flex shrink-0 items-center gap-2 bg-saffron-foreground px-4 py-2 text-saffron-deep">
          <Megaphone className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">ताज्या घडामोडी</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap py-2 will-change-transform">
            {[...tickerItems, ...tickerItems].map((t, i) => (
              <span key={i} className="mx-8 inline-flex items-center gap-3 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
