import { Instagram, Facebook, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react";

import { useT } from "@/lib/i18n";
import Link from "next/link";

const links: { href: string; key: Parameters<ReturnType<typeof useT>["t"]>[0] }[] = [
  { href: "/about", key: "nav.about" },
  { href: "/news", key: "nav.works" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/blog", key: "nav.blog" },
  { href: "/contact", key: "nav.contact" },
];

export function Footer() {
  const { t } = useT();
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="container-x grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <img src="/images/logo.webp" alt="" className="h-12 w-12 rounded-full bg-white p-1" />
            <div className="font-semibold">
              श्री श्रीरंग आप्पा बारणे
              <div className="text-xs opacity-70">Member of Parliament</div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-70 italic">"{t("hero.tagline")}"</p>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-saffron">{t("footer.quick")}</h4>
          <ul className="space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="opacity-80 hover:opacity-100 hover:text-saffron transition"
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-saffron">{t("footer.contact")}</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 text-saffron flex-shrink-0 mt-0.5" />
              Pimpri-Chinchwad, Pune
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 text-saffron flex-shrink-0 mt-0.5" />
              +91 20 2700 0000
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 text-saffron flex-shrink-0 mt-0.5" />
              contact@shrirangappabarne.in
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-saffron">{t("footer.follow")}</h4>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2.5 rounded-full bg-white/10 hover:bg-saffron transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs opacity-70">
        <p>
          © {new Date().getFullYear()} shrirangappabarne.in — {t("footer.rights")}
        </p>
        <a href="#" className="hover:text-saffron transition">
          {t("footer.privacy")}
        </a>
      </div>
    </footer>
  );
}
