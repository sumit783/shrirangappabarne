import { motion } from "framer-motion";
import cutoutImg from "@/assets/portrait-removebg-preview.png";
import { useT } from "@/lib/i18n";

const mainContent = {
  mr: "खासदार श्री श्रीरंग आप्पा बारणे हे मावळ लोकसभा मतदारसंघाच्या सर्वांगीण आणि सर्वसमावेशक विकासासाठी कटिबद्ध आहेत. प्रत्येक नागरिकाचे जीवनमान उंचावणे, पायाभूत सुविधांचा विस्तार करणे आणि मतदारसंघाला देशात अव्वल बनवणे हेच त्यांचे मुख्य ध्येय आहे. सामाजिक समतोल साधत प्रत्येकाला विकासाची समान संधी देणे यावर त्यांचा विशेष भर आहे.",
  en: "Shri Shrirang Appa Barne is committed to the holistic growth of Maval, prioritizing citizen-centric governance and execution of robust development projects. His vision guides the path toward building an empowered, progressive, and self-reliant constituency where every citizen thrives through inclusive progress.",
};

const visionItems = {
  mr: {
    left: [
      {
        title: "पायाभूत सुविधा",
        desc: "मावळ मतदारसंघाच्या सर्वांगीण प्रगतीसाठी राष्ट्रीय महामार्ग रुंदीकरण, लोणावळा-पुणे लोकल रेल्वे फेऱ्यांची संख्या वाढवणे आणि ग्रामीण भागातील अंतर्गत रस्त्यांचे जाळे मजबूत करण्यावर विशेष भर दिला आहे, ज्यामुळे जलद आणि सुरक्षित प्रवासाची खात्री मिळते.",
      },
    ],
    right: [
      {
        title: "दर्जेदार शिक्षण",
        desc: "मावळमधील तरुणांच्या उज्ज्वल भविष्यासाठी जिल्हा परिषद शाळांमध्ये डिजिटल वर्गखोल्यांची निर्मिती, अत्याधुनिक संगणकीय आणि शैक्षणिक साहित्य पुरवणे आणि स्थानिक स्तरावर कौशल्य आणि तंत्रज्ञान स्नेही शिक्षण केंद्रांची यशस्वी स्थापना केली आहे.",
      },
      {
        title: "आरोग्य सेवा",
        desc: "ग्रामीण व दुर्गम भागातील नागरिकांना तात्काळ व दर्जेदार उपचार मिळण्यासाठी प्राथमिक आरोग्य केंद्रांचे आधुनिकीकरण, फिरती दवाखाने, मोफत आरोग्य तपासणी शिबिरे आणि गरजू रुग्णांना थेट शासकीय योजनांचे आर्थिक साहाय्य मिळवून देण्याचे काम अविरत सुरू आहे.",
      },
    ],
  },
  en: {
    left: [
      {
        title: "Infrastructure",
        desc: "Developing world-class road networks, expanding local Lonavala-Pune railway services, and upgrading public transit corridors to ensure smooth, high-speed, and safe connectivity for residents across all urban and rural parts of Maval.",
      },
    ],
    right: [
      {
        title: "Quality Education",
        desc: "Empowering the next generation by converting Zilla Parishad schools into modern digital classrooms, providing tablets and smart devices, and establishing technology training centers to uplift educational standards across the region.",
      },
      {
        title: "Healthcare Services",
        desc: "Upgrading primary health centers, operating mobile dispensaries in remote villages, organizing mega medical camps, and ensuring seamless access to national health schemes to deliver quality, affordable care to every family.",
      },
    ],
  },
};

export function VisionMission() {
  const { t, lang } = useT();
  const leftItems = visionItems[lang].left;
  const rightItems = visionItems[lang].right;

  return (
    <section
      id="vision"
      className="pt-16 bg-white text-navy relative overflow-hidden flex flex-col justify-center"
    >
      {/* Top horizontal divider line */}
      <div className="container-x w-full mb-12 md:mb-16">
        <div className="h-[2px] bg-saffron opacity-60" />
      </div>

      <div className="container-x relative z-10 w-full">
        {/* Simple 3-column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-10 lg:gap-0 items-start">
          {/* Column 1: Main Card (Heading/Subheading) & 1st Card */}
          <div className="flex flex-col gap-8 lg:gap-10 order-1">
            {/* Header Text (Main Card) */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-navy tracking-tight uppercase leading-none">
                {t("vision.title")}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {mainContent[lang]}
              </p>
            </div>

            {/* Left Items (1 Card) */}
            <div className="flex flex-col gap-8">
              {leftItems.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group"
                >
                  <h3 className="font-bold text-sm tracking-widest text-navy uppercase font-display">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  <div className="h-[2px] bg-saffron w-full mt-4 opacity-50 group-hover:opacity-100 transition duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Center Portrait Cutout Image — hidden on mobile, shown on lg+ */}
          <div className="hidden lg:block order-2">
            <div className="relative w-full flex justify-center">
              <img
                src={cutoutImg.src}
                alt={t("hero.title")}
                loading="lazy"
                className="w-full max-w-[360px] xl:max-w-[400px] object-contain"
                style={{
                  filter:
                    "drop-shadow(3px 0 0 #f26f21) drop-shadow(-3px 0 0 #f26f21) drop-shadow(0 3px 0 #f26f21) drop-shadow(0 -3px 0 #f26f21)",
                }}
              />
            </div>
          </div>

          {/* Column 3: Right Cards (2 Cards) */}
          <div className="flex flex-col gap-10 order-3">
            {rightItems.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <h3 className="font-bold text-sm tracking-widest text-navy uppercase font-display">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                <div className="h-[2px] bg-saffron w-full mt-4 opacity-50 group-hover:opacity-100 transition duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
