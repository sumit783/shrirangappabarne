import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="text-saffron-foreground" style={{ backgroundColor: "var(--ink)" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <div className="text-center md:text-left">
          <div className="font-display text-lg font-bold">श्रीरंग आप्पा बारणे</div>
          <div className="text-xs opacity-80">खासदार, मावळ लोकसभा मतदारसंघ</div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/shrirangchandubarne"
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-full bg-saffron-foreground/10 transition hover:bg-saffron-foreground/20"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/shrirangappabarne/"
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-full bg-saffron-foreground/10 transition hover:bg-saffron-foreground/20"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://x.com/MPShrirangBarne"
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-full bg-saffron-foreground/10 transition hover:bg-saffron-foreground/20"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
        </div>
        <div className="text-xs opacity-75">
          © {new Date().getFullYear()} Shrirang Appa Barne. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
