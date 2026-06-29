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
    "nav.vision": "दृष्टीकोन व ध्येय",
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
      "श्रीरंग आप्पा बारणे (Shrirang Appa Barne) यांनी आपली राजकीय वाटचाल १९९७ साली पिंपरी-चिंचवड महापालिकेत नगरसेवक म्हणून सुरू केली. १९९९ साली त्यांनी स्थायी समितीचे अध्यक्षपद भूषविले. त्यानंतर अनेक वेळा नगरसेवक म्हणून निवडून येत त्यांनी विरोधी पक्षनेते आणि शिवसेना गटनेते म्हणून प्रभावी भूमिका बजावली. २०१४ साली ते राष्ट्रीय राजकारणात दाखल झाले आणि १६व्या लोकसभेसाठी खासदार म्हणून निवडून आले. २०१९ मध्ये १७व्या लोकसभेसाठी पुनः एकदा जनतेने त्यांच्यावर विश्वास दाखवत त्यांची दुसऱ्यांदा निवड केली. २०२४ साली ते सलग तिसऱ्यांदा १८व्या लोकसभेसाठी खासदार म्हणून निवडून आले.",
    "about.p2":
      "खासदार म्हणून त्यांनी ऊर्जा, संरक्षण, अर्थसंकल्प, पर्यटन व संस्कृती अशा देशाच्या दृष्टीने अत्यंत महत्त्वाच्या संसदीय समित्यांवर कार्य केले. त्यांच्या संसदेतील उल्लेखनीय आणि सक्रिय कामगिरीसाठी त्यांना 'संसदरत्न पुरस्कार', 'विशेष संसदरत्न पुरस्कार' तसेच 'संसद महारथी पुरस्कार' यांसारखे अनेक प्रतिष्ठित राष्ट्रीय सन्मान प्राप्त झाले आहेत.",
    "about.journey": "राजकीय प्रवास",
    "vision.title": "दृष्टीकोन व ध्येय",
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
    "contact.office": "कार्यालय",
    "contact.openMap": "नकाशात पहा",
    "contact.contactDetails": "संपर्क तपशील",
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
      "Shrirang Appa Barne began his political journey in 1997 as a Corporator in the Pimpri-Chinchwad Municipal Corporation. In 1999, he served as the Chairman of the Standing Committee. Over the years, he was elected as a Corporator multiple times and played a significant role as the Leader of the Opposition and Shiv Sena Group Leader. In 2014, he entered national politics and was elected as a Member of Parliament to the 16th Lok Sabha. In 2019, the people once again reposed their trust in him by electing him to the 17th Lok Sabha for a second consecutive term. In 2024, he was elected for a third consecutive term as a Member of Parliament to the 18th Lok Sabha.",
    "about.p2":
      "As a Member of Parliament, he has served on several key Parliamentary Committees, including those related to Energy, Defence, Budget, Tourism, and Culture. In recognition of his outstanding and active parliamentary performance, he has been honoured with several prestigious national awards, including the Sansad Ratna Award, Special Sansad Ratna Award, and Sansad Maharathi Award.",
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
    "contact.office": "Office",
    "contact.openMap": "Open in Map",
    "contact.contactDetails": "Contact Details",
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
