import { motion } from "framer-motion";
import { Facebook, ExternalLink } from "lucide-react";
import { useT } from "@/lib/i18n";
import Script from "next/script";

export function SocialMedia() {
  const { t, lang } = useT();

  return (
    <section id="social" className="py-24 md:py-32 bg-secondary/40">
      <div className="container-x">
        {/* Elfsight platform script loaded once for the page */}
        <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" defer />

        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            {t("nav.social")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-navy mt-4">{t("social.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("social.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-start">
          {/* Column 1: Live Facebook Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border rounded-3xl p-5 md:p-6 shadow-elegant overflow-hidden flex flex-col h-[480px] md:h-[680px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                <Facebook className="h-5 w-5 text-blue-600 fill-blue-600" />
                {lang === "mr" ? "फेसबुक" : "Facebook"}
              </h3>
              <a
                href="https://www.facebook.com/shrirangchandubarne"
                target="_blank"
                rel="noopener noreferrer"
                className="text-saffron text-sm font-semibold hover:underline flex items-center gap-1"
              >
                {lang === "mr" ? "प्रोफाइल पहा" : "View Profile"}{" "}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border bg-background flex-1">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fshrirangchandubarne&tabs=timeline&width=500&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
                width="100%"
                height="100%"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder={0}
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </motion.div>

          {/* Column 2: Twitter & Instagram Elfsight widgets */}
          <div className="flex flex-col gap-6 h-auto md:h-[680px]">
            {/* Top: Twitter/X Feed Widget */}
            <div className="subscribe">
              <div className="fty-header">
                <div>
                  <img
                    src="images/twitter-icon.svg"
                    alt={lang === "mr" ? "सोशल मीडिया" : "Social Media"}
                  />
                  &nbsp;&nbsp;{lang === "mr" ? "ट्विटर" : "Twitter / X"}
                </div>
                <a href="https://x.com/MPShrirangBarne" target="_blank" className="view-all-btn">
                  {lang === "mr" ? "प्रोफाइल पहा" : "View Profile"}
                </a>
              </div>
              <div className="fty-content">
                <div
                  className="elfsight-app-519d4301-19d9-43dc-a329-b02ccb604e2b"
                  data-elfsight-app-lazy="true"
                ></div>
              </div>
            </div>

            {/* Bottom: Instagram Widget */}
            <div className="follow">
              <div className="fty-header">
                <div>
                  <img
                    src="images/instagram-icon.svg"
                    alt={lang === "mr" ? "सोशल मीडिया" : "Social Media"}
                  />
                  &nbsp;&nbsp;{lang === "mr" ? "इन्स्टाग्राम" : "Instagram"}
                </div>
                <a
                  href="https://www.instagram.com/shrirangappabarne/"
                  target="_blank"
                  className="view-all-btn"
                >
                  {lang === "mr" ? "प्रोफाइल पहा" : "View Profile"}
                </a>
              </div>
              <div className="fty-content">
                <div
                  className="elfsight-app-4bd9234d-13da-41b6-91cd-a5ab83d4cb69"
                  data-elfsight-app-lazy="true"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
