import { motion } from "framer-motion";
import cutoutImg from "@/assets/portrait-removebg-preview.png";
import { useT } from "@/lib/i18n";

const mainContent = {
  mr: "सर्वसामान्य नागरिकांच्या हिताला प्राधान्य देत पारदर्शक, उत्तरदायी आणि विकासाभिमुख नेतृत्वाच्या माध्यमातून मावळ लोकसभा मतदारसंघाचा सर्वांगीण, शाश्वत आणि सर्वसमावेशक विकास घडवून आणणे. शासनाच्या योजना प्रत्येक घटकापर्यंत प्रभावीपणे पोहोचवून युवकांचे सक्षमीकरण, महिलांचा सहभाग आणि समाजातील शेवटच्या घटकाच्या उन्नतीसाठी सातत्याने कार्यरत राहणे.",
  en: "To foster transparent, accountable, and development-oriented leadership that drives the holistic, sustainable, and inclusive growth of the Maval Lok Sabha constituency. Our mission is to ensure that the benefits of government schemes reach every citizen while empowering youth, promoting women's participation, and uplifting the most underserved sections of society.",
};

const visionItems = {
  mr: {
    left: [
      {
        title: "पायाभूत सुविधा",
        desc: "आधुनिक रस्ते, पूल, पाणीपुरवठा, सार्वजनिक वाहतूक आणि स्मार्ट नागरी सुविधांचा विस्तार करून ग्रामीण व शहरी भागातील पायाभूत सुविधा अधिक सक्षम आणि विकासाभिमुख बनवणे. यासह शाश्वत विकासाच्या दृष्टिकोनातून प्रदूषणमुक्त पर्यावरण आणि सुनियोजित शहर उभारणीवर भर देणे, ज्यामुळे नागरिकांचे जीवनमान उंचावेल आणि रोजगाराच्या नवीन संधी निर्माण होतील.",
      },
    ],
    right: [
      {
        title: "दर्जेदार शिक्षण",
        desc: "प्रत्येक विद्यार्थ्याला दर्जेदार शिक्षण, कौशल्य विकास, आधुनिक तंत्रज्ञान आणि रोजगाराभिमुख संधी उपलब्ध करून सक्षम, आत्मनिर्भर आणि स्पर्धात्मक युवा पिढी घडवणे. ई-लर्निंग, डिजिटल साक्षरता आणि जागतिक दर्जाच्या शैक्षणिक सुविधा सर्वसामान्यांपर्यंत पोहोचवून विद्यार्थ्यांच्या सर्वांगीण विकासासाठी आवश्यक व्यासपीठ निर्माण करणे.",
      },
      {
        title: "आरोग्य सेवा",
        desc: "प्रत्येक नागरिकाला सुलभ, परवडणाऱ्या आणि गुणवत्तापूर्ण आरोग्य सेवा उपलब्ध करून ग्रामीण व शहरी भागातील आरोग्य सुविधा बळकट करणे आणि निरोगी समाजाची निर्मिती करणे. अत्याधुनिक वैद्यकीय तंत्रज्ञान, अद्ययावत रुग्णालये आणि प्रतिबंधात्मक आरोग्य मोहिमांच्या माध्यमातून शेवटच्या घटकापर्यंत उत्तम दर्जाची वैद्यकीय मदत पोहोचवण्यास प्राधान्य देणे.",
      },
    ],
  },
  en: {
    left: [
      {
        title: "Infrastructure",
        desc: "To develop modern and resilient infrastructure through improved roads, bridges, water supply, public transportation, and smart civic amenities, ensuring balanced growth across both urban and rural areas. Furthermore, the focus remains on building eco-friendly spaces, sustainable urban planning, and creating long-term pathways that elevate the living standards and stimulate economic growth for everyone.",
      },
    ],
    right: [
      {
        title: "Quality Education",
        desc: "To provide access to quality education, skill development, modern technology, and employment-oriented learning opportunities, empowering the next generation to become confident, self-reliant, and future-ready. By bridging the digital divide, integrating e-learning platforms, and fostering innovation, we aim to build a strong foundation for lifelong learning and global competitiveness.",
      },
      {
        title: "Healthcare Services",
        desc: "To strengthen healthcare infrastructure by ensuring accessible, affordable, and high-quality medical services for every citizen, while enhancing preventive care and modern healthcare facilities in both rural and urban communities. By equipping hospitals with state-of-the-art medical technology and expanding grassroots health campaigns, we are committed to building a healthier, more secure society.",
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
