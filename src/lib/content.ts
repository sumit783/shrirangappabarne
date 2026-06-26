import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import portrait from "@/assets/portrait-removebg-preview.png";

export const heroSlides = [hero1, hero2, hero3];
export const portraitImg = portrait;

export const stats = [
  { value: 3, suffix: "x", key: "stats.terms" },
  { value: 10, suffix: "+", key: "stats.years" },
  { value: 5, suffix: "+", key: "stats.awards" },
  { value: 1, suffix: "", key: "stats.constituency" },
] as const;

export const missions = {
  mr: [
    { title: "पायाभूत सुविधा", icon: "🛣️" },
    { title: "शिक्षण", icon: "📚" },
    { title: "आरोग्य", icon: "🏥" },
    { title: "पाणी व्यवस्थापन", icon: "💧" },
    { title: "रोजगार निर्मिती", icon: "💼" },
    { title: "युवा सक्षमीकरण", icon: "🎯" },
    { title: "महिला सक्षमीकरण", icon: "👩" },
    { title: "ग्रामीण विकास", icon: "🌾" },
  ],
  en: [
    { title: "Infrastructure", icon: "🛣️" },
    { title: "Education", icon: "📚" },
    { title: "Healthcare", icon: "🏥" },
    { title: "Water Management", icon: "💧" },
    { title: "Employment", icon: "💼" },
    { title: "Youth Empowerment", icon: "🎯" },
    { title: "Women Empowerment", icon: "👩" },
    { title: "Rural Development", icon: "🌾" },
  ],
};

export type WorkCategory = "roads" | "rail" | "water" | "health" | "education" | "rural";

export const works = {
  mr: [
    {
      cat: "roads" as const,
      title: "मावळ–पुणे महामार्ग रुंदीकरण",
      desc: "वाहतूक कोंडी कमी करण्यासाठी सहा पदरी रस्त्याचे विस्तारीकरण.",
      img: hero3,
    },
    {
      cat: "rail" as const,
      title: "लोणावळा-पुणे लोकल वाढ",
      desc: "प्रवाशांच्या सोयीसाठी अतिरिक्त लोकल फेऱ्या मंजूर.",
      img: hero2,
    },
    {
      cat: "water" as const,
      title: "पवना धरण पाणीपुरवठा",
      desc: "मतदारसंघातील गावांना शाश्वत पाणीपुरवठा योजना.",
      img: hero1,
    },
    {
      cat: "health" as const,
      title: "ग्रामीण रुग्णालय सुधारणा",
      desc: "मावळ तालुक्यातील आरोग्य केंद्रांचे आधुनिकीकरण.",
      img: hero3,
    },
    {
      cat: "education" as const,
      title: "डिजिटल वर्गखोली प्रकल्प",
      desc: "जिल्हा परिषद शाळांमध्ये स्मार्ट क्लासरूम सुविधा.",
      img: hero2,
    },
    {
      cat: "rural" as const,
      title: "स्मार्ट गाव अभियान",
      desc: "ग्रामीण भागाच्या सर्वांगीण विकासासाठी विशेष योजना.",
      img: hero1,
    },
  ],
  en: [
    {
      cat: "roads" as const,
      title: "Maval–Pune Highway Expansion",
      desc: "Six-lane widening to ease traffic congestion across the corridor.",
      img: hero3,
    },
    {
      cat: "rail" as const,
      title: "Lonavala–Pune Local Service",
      desc: "Additional local train services sanctioned for commuter convenience.",
      img: hero2,
    },
    {
      cat: "water" as const,
      title: "Pawna Dam Water Supply",
      desc: "Sustainable drinking-water scheme for villages across the constituency.",
      img: hero1,
    },
    {
      cat: "health" as const,
      title: "Rural Hospital Upgrades",
      desc: "Modernisation of primary health centres across Maval taluka.",
      img: hero3,
    },
    {
      cat: "education" as const,
      title: "Digital Classroom Initiative",
      desc: "Smart-classroom facilities in Zilla Parishad schools.",
      img: hero2,
    },
    {
      cat: "rural" as const,
      title: "Smart Village Mission",
      desc: "Integrated development plan for rural Maval.",
      img: hero1,
    },
  ],
};

export const workCategories = {
  mr: {
    all: "सर्व",
    roads: "रस्ते",
    rail: "रेल्वे",
    water: "पाणी",
    health: "आरोग्य",
    education: "शिक्षण",
    rural: "ग्रामीण",
  },
  en: {
    all: "All",
    roads: "Roads",
    rail: "Railway",
    water: "Water",
    health: "Healthcare",
    education: "Education",
    rural: "Rural",
  },
};

export const constituencies = {
  mr: [
    { name: "पिंपरी", desc: "औद्योगिक नगरीचा सर्वांगीण विकास" },
    { name: "चिंचवड", desc: "स्मार्ट सिटी पायाभूत प्रकल्प" },
    { name: "मावळ", desc: "पर्यटन व कृषी विकास" },
    { name: "कर्जत", desc: "ग्रामीण सक्षमीकरण" },
    { name: "पनवेल", desc: "नवी मुंबई कनेक्टिव्हिटी" },
    { name: "उरण", desc: "बंदर व मच्छीमार कल्याण" },
  ],
  en: [
    { name: "Pimpri", desc: "Holistic development of the industrial city" },
    { name: "Chinchwad", desc: "Smart city infrastructure projects" },
    { name: "Maval", desc: "Tourism and agriculture development" },
    { name: "Karjat", desc: "Rural empowerment initiatives" },
    { name: "Panvel", desc: "Navi Mumbai connectivity" },
    { name: "Uran", desc: "Port and fisherman welfare" },
  ],
};

export const galleryImages = [hero1, hero2, hero3, hero1, hero2, hero3, hero1, hero2];

export const galleryCategories = {
  mr: ["सर्व", "सार्वजनिक कार्यक्रम", "संसद", "विकास कामे", "समाजसेवा", "पुरस्कार"],
  en: ["All", "Public Events", "Parliament", "Development", "Community", "Awards"],
};

export const achievements = {
  mr: [
    { year: "2024", title: "संसद महारत्न पुरस्कार", desc: "उत्कृष्ट संसदीय कामगिरीसाठी" },
    { year: "2023", title: "संसदरत्न पुरस्कार", desc: "सलग पाचव्या वर्षी सन्मान" },
    { year: "2022", title: "जनसेवा सन्मान", desc: "मतदारसंघातील विशेष कार्यासाठी" },
    { year: "2021", title: "सर्वोत्कृष्ट खासदार पुरस्कार", desc: "लोकसभेतील सहभागासाठी" },
  ],
  en: [
    {
      year: "2024",
      title: "Sansad Maha Ratna Award",
      desc: "For outstanding parliamentary performance",
    },
    { year: "2023", title: "Sansad Ratna Award", desc: "Honoured for the fifth consecutive year" },
    {
      year: "2022",
      title: "Public Service Recognition",
      desc: "For exceptional constituency work",
    },
    { year: "2021", title: "Best MP Award", desc: "Recognised for active Lok Sabha participation" },
  ],
};

export const social = [
  {
    name: "Instagram",
    handle: "@shrirangappabarne",
    url: "https://instagram.com",
    followers: "120K+",
    color: "from-pink-500 to-purple-600",
  },
  {
    name: "Facebook",
    handle: "Shrirang Barne",
    url: "https://facebook.com",
    followers: "380K+",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "X (Twitter)",
    handle: "@ShrirangBarne",
    url: "https://twitter.com",
    followers: "85K+",
    color: "from-slate-700 to-black",
  },
  {
    name: "YouTube",
    handle: "Shrirang Barne MP",
    url: "https://youtube.com",
    followers: "45K+",
    color: "from-red-600 to-red-800",
  },
];

export const news = {
  mr: [
    {
      date: "12 जून 2026",
      title: "मावळ मतदारसंघात नवीन आरोग्य योजनेची घोषणा",
      excerpt: "ग्रामीण भागातील नागरिकांसाठी मोफत आरोग्य तपासणी शिबीर.",
      img: hero1,
      featured: true,
    },
    {
      date: "08 जून 2026",
      title: "पवना धरण परिसर पर्यटन विकास",
      excerpt: "स्थानिक रोजगारासाठी विशेष प्रकल्प सुरू.",
      img: hero2,
    },
    {
      date: "01 जून 2026",
      title: "लोणावळा रेल्वे स्थानक आधुनिकीकरण",
      excerpt: "प्रवाशांच्या सोयीसाठी नवीन सुविधा.",
      img: hero3,
    },
    {
      date: "25 मे 2026",
      title: "डिजिटल शिक्षण उपक्रमाचा शुभारंभ",
      excerpt: "जिल्हा परिषद शाळांमध्ये टॅबलेट वाटप.",
      img: hero1,
    },
  ],
  en: [
    {
      date: "12 Jun 2026",
      title: "New healthcare scheme announced for Maval",
      excerpt: "Free medical camps for rural citizens across the constituency.",
      img: hero1,
      featured: true,
    },
    {
      date: "08 Jun 2026",
      title: "Pawna Dam region tourism development",
      excerpt: "Special project launched to boost local employment.",
      img: hero2,
    },
    {
      date: "01 Jun 2026",
      title: "Lonavala railway station modernisation",
      excerpt: "New passenger amenities inaugurated.",
      img: hero3,
    },
    {
      date: "25 May 2026",
      title: "Digital learning initiative launched",
      excerpt: "Tablets distributed across Zilla Parishad schools.",
      img: hero1,
    },
  ],
};

export const books = {
  mr: [
    { title: "शब्दवेध", desc: "विचार आणि कविता संग्रह" },
    { title: "समर्थ लढवैय्या", desc: "जनसेवेच्या अनुभवांची गाथा" },
    { title: "आपला वैभवशाली मावळ", desc: "मावळ प्रदेशाचा सांस्कृतिक वारसा" },
    { title: "मी अनुभव लेली संसद", desc: "संसदीय जीवनातील आठवणी" },
  ],
  en: [
    { title: "Shabdved", desc: "A collection of thoughts and poetry" },
    { title: "Samarth Ladvaiya", desc: "Tales from a life of public service" },
    { title: "Apla Vaibhavshali Maval", desc: "The cultural heritage of Maval" },
    { title: "Me Anubhav Leli Sansad", desc: "Memoirs from parliamentary life" },
  ],
};

export const offices = {
  mr: [
    {
      name: "पुणे कार्यालय",
      addr: "श्री निवास, पद्मजी पेपर मिल जवळ, थेरगाव, पुणे, 411 033",
      phone: "+91 20 2700 0000",
      email: "pune@shrirangappabarne.in",
    },
    {
      name: "दिल्ली कार्यालय",
      addr: "36, डुप्लेक्स, नॉर्थ एव्हेन्यू, नवी दिल्ली 110 001 011 23094027",
      phone: "+91 11 2300 0000",
      email: "delhi@shrirangappabarne.in",
    },
    {
      name: "पनवेल कार्यालय",
      addr: "ओमसाई बिल्डिंग, पहिला मजला, गार्डन हॉटेल जवळ, पनवेल, रायगड 410 206",
      phone: "+91 22 2700 0000",
      email: "panvel@shrirangappabarne.in",
    },
  ],
  en: [
    {
      name: "Pune Office",
      addr: "Shree Nivas, Near Padmaji Paper Mill, Thergaon, Pune 411033",
      phone: "+91 20 2700 0000",
      email: "pune@shrirangappabarne.in",
    },
    {
      name: "Delhi Office",
      addr: "36, Duplex, North Avenue, New Delhi 110001",
      phone: "+91 11 2300 0000",
      email: "delhi@shrirangappabarne.in",
    },
    {
      name: "Panvel Office",
      addr: "Omsai Building, First Floor, Near Garden Hotel, Panvel, Raigad 410206",
      phone: "+91 22 2700 0000",
      email: "panvel@shrirangappabarne.in",
    },
  ],
};
