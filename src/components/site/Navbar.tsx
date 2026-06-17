import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { useT } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import Link from "next/link";

const links: { href: string; key: Parameters<ReturnType<typeof useT>["t"]>[0] }[] = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/news", key: "nav.news" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/blog", key: "nav.blog" },
  { href: "/contact", key: "nav.contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-navy/95 backdrop-blur shadow-elegant" : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3">
            <img
              src={logo.src}
              alt="Logo"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white p-1 shadow"
            />
            <span className="hidden sm:block text-white font-semibold text-sm md:text-base leading-tight">
              श्री श्रीरंग आप्पा बारणे
              <span className="block text-xs font-normal opacity-80">Member of Parliament</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageToggle />
            <Link
              suppressHydrationWarning
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 bg-gradient-saffron text-white px-5 py-2.5 rounded-full font-medium text-sm shadow-saffron hover:scale-105 transition"
            >
              <Phone className="h-4 w-4" />
              {t("nav.contact")}
            </Link>
            <button
              suppressHydrationWarning
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition backdrop-blur"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60]"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-navy text-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <img src={logo.src} alt="Logo" className="h-10 w-10 rounded-full bg-white p-1" />
                <button
                  suppressHydrationWarning
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-1">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/10 transition"
                      >
                        <span className="text-lg font-medium">{t(l.key)}</span>
                        <span className="text-saffron opacity-0 group-hover:opacity-100 transition">
                          →
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="p-6 border-t border-white/10 text-sm opacity-80">
                <p>{t("hero.tagline")}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
