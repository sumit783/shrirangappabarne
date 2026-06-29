import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

import { useT } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled ? "bg-[#0d0b0a]/95 backdrop-blur-md border-white/5 shadow-lg shadow-black/20 py-2" : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="container-x flex items-center justify-between h-14 md:h-16">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="relative">
              <img
                src="/images/logo.webp"
                alt="Logo"
                className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white p-1 shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm md:text-lg tracking-wide">
                श्री श्रीरंग आप्पा बारणे
              </span>
              <span className="text-white/60 text-[10px] md:text-xs font-medium tracking-wider">
                Member of Parliament
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 md:gap-2 lg:gap-6 ml-auto mr-8">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-2 py-1 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-saffron" : "text-white/80 hover:text-white"
                  }`}
                >
                  {t(l.key)}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-saffron rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            
            <button
              suppressHydrationWarning
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="p-2 md:p-2.5 rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Sidebar Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-[#0d0b0a] border-l border-white/10 text-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo.webp"
                    alt="Logo"
                    className="h-10 w-10 rounded-full bg-white p-1"
                  />
                  <div className="sm:hidden">
                    <LanguageToggle />
                  </div>
                </div>
                <button
                  suppressHydrationWarning
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-2">
                  {links.map((l, i) => {
                    const isActive = pathname === l.href;
                    return (
                      <motion.li
                        key={l.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className={`group flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 ${
                            isActive ? "bg-saffron/10 text-saffron font-semibold" : "hover:bg-white/5 text-white/80 hover:text-white"
                          }`}
                        >
                          <span className="text-lg">{t(l.key)}</span>
                          <span className={`transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                            →
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <Link
                    suppressHydrationWarning
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center gap-2 bg-saffron text-white px-5 py-3.5 rounded-full font-semibold text-sm shadow-lg shadow-saffron/20 hover:bg-saffron/90 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {t("nav.contact")}
                  </Link>
                </motion.div>
              </nav>
              <div className="p-6 border-t border-white/10 bg-black/20 text-center">
                <p className="text-sm text-white/50 font-medium tracking-wide uppercase">
                  {t("hero.tagline")}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

