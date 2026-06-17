import { useT } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useT();
  return (
    <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur p-1 text-xs font-semibold">
      <button
        suppressHydrationWarning
        onClick={() => setLang("mr")}
        className={`px-3 py-1.5 rounded-full transition ${lang === "mr" ? "bg-saffron text-white shadow" : "text-white/80 hover:text-white"}`}
        aria-pressed={lang === "mr"}
      >
        मराठी
      </button>
      <button
        suppressHydrationWarning
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 rounded-full transition ${lang === "en" ? "bg-saffron text-white shadow" : "text-white/80 hover:text-white"}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
