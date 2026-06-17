"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "mr" | "en";

const dict = {
  mr: {
    "nav.blog": "ब्लॉग",
    "nav.contact": "संपर्क",
    "nav.home": "मुख्यपृष्ठ",
    "nav.about": "परिचय",
    "nav.works": "विकास कामे",
    "nav.vision": "दृष्टी व ध्येय",
    "nav.constituency": "मतदारसंघ",
    "nav.gallery": "छायाचित्र दालन",
    "nav.news": "बातम्या",
    "nav.social": "सोशल मीडिया",
    "nav.books": "पुस्तके",
    "hero.tagline": "जनतेचा विश्वास, विकासाचा निर्धार",
    "hero.title": "श्री श्रीरंग आप्पा बारणे",
    "hero.subtitle": "खासदार – मावळ लोकसभा मतदारसंघ",
    "hero.desc":
      "तीन वेळा निवडून आलेले लोकप्रिय खासदार, संसदरत्न पुरस्कार विजेते आणि मावळच्या सर्वांगीण विकासासाठी कटिबद्ध जनसेवक.",
    "about.label": "ABOUT",
    "stats.terms": "वेळा खासदार",
    "stats.years": "वर्षांची संसदीय सेवा",
    "stats.awards": "राष्ट्रीय पुरस्कार",
    "stats.constituency": "मावळ प्रतिनिधी",
    "about.title": "एक समर्पित जनसेवक",
    "about.p1":
      "श्री श्रीरंग चंदू बारणे हे भारतीय जनतेच्या तीन पिढ्यांच्या विश्वासावर मावळ लोकसभा मतदारसंघातून सलग तीन वेळा निवडून आलेले लोकप्रिय खासदार आहेत. पिंपरी-चिंचवड महानगरपालिकेच्या नगरसेवक पदापासून सुरू झालेला त्यांचा प्रवास आज दिल्लीच्या संसदेपर्यंत पोहोचला आहे.",
    "about.p2":
      "रस्ते, रेल्वे, पाणी, आरोग्य आणि शिक्षण क्षेत्रात त्यांनी मतदारसंघात केलेली कामे ही त्यांच्या कार्यपद्धतीची साक्ष आहेत. संसदेमध्ये जनतेचे प्रश्न प्रभावीपणे मांडल्याबद्दल त्यांना अनेकवेळा 'संसदरत्न' पुरस्काराने सन्मानित करण्यात आले आहे.",
    "about.journey": "राजकीय प्रवास",
    "vision.title": "दृष्टी व ध्येय",
    "vision.subtitle": "मावळच्या प्रत्येक नागरिकासाठी सर्वसमावेशक विकास",
    "works.title": "विकास कामे",
    "works.subtitle": "मतदारसंघातील दर्जेदार पायाभूत सुविधा प्रकल्प",
    "works.all": "सर्व",
    "works.read": "अधिक वाचा",
    "constituency.title": "मावळ लोकसभा मतदारसंघ",
    "constituency.subtitle": "सहा विधानसभा क्षेत्रांचा समावेश",
    "gallery.title": "छायाचित्र दालन",
    "gallery.subtitle": "जनसंपर्क व कार्यक्रमांच्या आठवणी",
    "achievements.title": "पुरस्कार व सन्मान",
    "achievements.subtitle": "राष्ट्रीय स्तरावर मिळालेली ओळख",
    "social.title": "सोशल मीडिया",
    "social.subtitle": "जोडले रहा रोजच्या उपक्रमांशी",
    "social.followers": "फॉलोअर्स",
    "social.visit": "प्रोफाइल पाहा",
    "news.title": "बातम्या व अद्यतने",
    "news.subtitle": "नवीनतम घडामोडी आणि घोषणा",
    "news.featured": "मुख्य बातमी",
    "news.latest": "ताज्या बातम्या",
    "news.read": "संपूर्ण वाचा",
    "books.title": "प्रकाशित पुस्तके",
    "books.subtitle": "लेखणीच्या माध्यमातून जनसेवा",
    "contact.title": "संपर्क",
    "contact.subtitle": "आपले विचार, सूचना आणि तक्रारी आम्हाला कळवा",
    "contact.offices": "कार्यालये",
    "contact.form": "संदेश पाठवा",
    "contact.name": "नाव",
    "contact.mobile": "मोबाईल क्रमांक",
    "contact.email": "ईमेल",
    "contact.subject": "विषय",
    "contact.message": "संदेश",
    "contact.send": "पाठवा",
    "contact.map": "नकाशा",
    "footer.quick": "त्वरित दुवे",
    "footer.contact": "संपर्क",
    "footer.follow": "फॉलो करा",
    "footer.rights": "सर्व हक्क राखीव.",
    "footer.privacy": "गोपनीयता धोरण",
  },
  en: {
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.works": "Development Works",
    "nav.vision": "Vision & Mission",
    "nav.constituency": "Constituency",
    "nav.gallery": "Gallery",
    "nav.news": "News & Updates",
    "nav.social": "Social Media",
    "nav.books": "Books",
    "hero.tagline": "Trust of People, Resolve for Development",
    "hero.title": "Shri Shrirang Appa Barne",
    "hero.subtitle": "Member of Parliament — Maval Constituency",
    "hero.desc":
      "A three-time elected Member of Parliament, Sansad Ratna awardee, and tireless public servant committed to the holistic development of Maval.",
    "about.label": "ABOUT",
    "stats.terms": "Time MP",
    "stats.years": "Years of Service",
    "stats.awards": "National Awards",
    "stats.constituency": "Maval Representative",
    "about.title": "A Dedicated Public Servant",
    "about.p1":
      "Shri Shrirang Chandu Barne is a three-time elected Member of Parliament from the Maval Lok Sabha constituency. His journey, which began as a corporator with the Pimpri-Chinchwad Municipal Corporation, today extends to the halls of the Indian Parliament in New Delhi.",
    "about.p2":
      "His work across roads, railways, water, healthcare and education stands as testimony to a results-driven approach. He has been honoured with the prestigious 'Sansad Ratna' award multiple times for outstanding parliamentary performance.",
    "about.journey": "Political Journey",
    "vision.title": "Vision & Mission",
    "vision.subtitle": "Inclusive development for every citizen of Maval",
    "works.title": "Development Works",
    "works.subtitle": "Quality infrastructure projects across the constituency",
    "works.all": "All",
    "works.read": "Read More",
    "constituency.title": "Maval Lok Sabha Constituency",
    "constituency.subtitle": "Six vibrant assembly segments",
    "gallery.title": "Gallery",
    "gallery.subtitle": "Moments from public engagements and events",
    "achievements.title": "Awards & Recognition",
    "achievements.subtitle": "National-level honours and parliamentary excellence",
    "social.title": "Social Media",
    "social.subtitle": "Stay connected with daily updates",
    "social.followers": "Followers",
    "social.visit": "Visit Profile",
    "news.title": "News & Updates",
    "news.subtitle": "Latest developments and announcements",
    "news.featured": "Featured",
    "news.latest": "Latest Updates",
    "news.read": "Read Full Article",
    "books.title": "Published Books",
    "books.subtitle": "Public service through the written word",
    "contact.title": "Get in Touch",
    "contact.subtitle": "Share your thoughts, suggestions and concerns",
    "contact.offices": "Offices",
    "contact.form": "Send a Message",
    "contact.name": "Name",
    "contact.mobile": "Mobile Number",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.map": "View on Map",
    "footer.quick": "Quick Links",
    "footer.contact": "Contact",
    "footer.follow": "Follow",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
  },
} as const;

type Key = keyof (typeof dict)["mr"];

const Ctx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
}>({ lang: "mr", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("mr");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("lang") as Lang | null;
    if (saved === "mr" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("lang", l);
  };

  const t = (k: Key) => dict[lang][k] ?? k;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useT = () => useContext(Ctx);
