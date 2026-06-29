"use client";

import { Award, Building2, Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import heroImage from "@/assets/barne-cutout.png";
import cutout1 from "@/assets/cutout-1-removebg-preview.png";
import cutout2 from "@/assets/cutout-2-removebg-preview.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const cutoutImages = [
  heroImage,
  cutout1, 
  cutout2,
];

const stats = [
  { k: "३", v: "वेळा खासदार", icon: Award },
  { k: "६", v: "विधानसभा क्षेत्रे", icon: MapPin },
  { k: "२५+", v: "वर्षांचा अनुभव", icon: Calendar },
  { k: "४५०+", v: "विकासकामे", icon: Building2 },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(60% 80% at 100% 0%, color-mix(in oklab, var(--saffron) 28%, transparent), transparent 60%), linear-gradient(180deg, var(--cream), var(--background))",
      }}
    >
      {/* decorative pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(var(--saffron-deep) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-end gap-8 px-4 pt-10 md:grid-cols-[1.05fr_1.2fr] md:pt-16">
        {/* Left — cutout */}
        <div className="relative">
          {/* Decorative blob behind */}
          <div
            aria-hidden
            className="absolute inset-x-6 bottom-0 top-10 -z-0 rounded-[40%_60%_55%_45%/45%_40%_60%_55%]"
            style={{ background: "var(--gradient-saffron)" }}
          />
          <div
            aria-hidden
            className="absolute -left-4 top-6 -z-0 hidden h-40 w-40 rounded-full md:block"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0 80%, color-mix(in oklab, var(--saffron) 40%, transparent) 80% 100%)",
              filter: "blur(2px)",
            }}
          />
          
          {/* Cutout Image Slider */}
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            opts={{
              loop: true,
            }}
            className="relative z-10 mx-auto w-full max-w-md drop-shadow-2xl md:max-w-xl"
          >
            <CarouselContent className="ml-0">
              {cutoutImages.map((src, i) => (
                <CarouselItem key={i} className="relative aspect-[1024/1408] w-full pl-0">
                  <Image
                    src={src}
                    alt={`श्रीरंग आप्पा बारणे — ${i + 1}`}
                    fill
                    priority={i === 0}
                    className="object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* floating badges */}
          <div className="absolute left-2 top-12 z-20 hidden rounded-2xl bg-card/90 p-3 shadow-xl ring-1 ring-border backdrop-blur md:block">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gradient-saffron)] text-saffron-foreground">
                <Award className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">सन्मान</div>
                <div className="font-display text-sm font-bold">संसदरत्न</div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 right-2 z-20 hidden rounded-2xl bg-card/90 p-3 shadow-xl ring-1 ring-border backdrop-blur md:block">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-saffron-foreground">
                <Users className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">अनुभव</div>
                <div className="font-display text-sm font-bold">२५+ वर्षे</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — content */}
        <div className="self-center">
          <span className="chip-divider text-xs font-semibold uppercase tracking-[0.25em] text-saffron-deep">
            खासदार · मावळ लोकसभा
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
            श्रीरंग <span className="text-saffron-deep">आप्पा</span> बारणे
          </h1>
          <p className="mt-2 text-lg font-medium text-muted-foreground md:text-xl">
            Shrirang Appa Barne · Member of Parliament
          </p>
          <div className="mt-6 inline-block rounded-2xl bg-[var(--gradient-saffron)] px-5 py-3 font-display text-xl font-bold shadow-lg md:text-2xl">
            जनतेचा विश्वास, विकासाचा निर्धार
          </div>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            दूरदर्शी नेतृत्व, सातत्यपूर्ण लोकसेवा आणि मावळच्या सर्वांगीण विकासासाठी समर्पित कार्य.
            तीन वेळा निवडून आलेले खासदार, ऊर्जा विषयक स्थायी समितीचे अध्यक्ष.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-saffron-foreground shadow-lg transition hover:translate-y-[-1px]"
              style={{ backgroundColor: "var(--ink)" }}
            >
              परिचय वाचा
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-saffron-deep/40 bg-card px-6 py-3 text-sm font-semibold text-saffron-deep transition hover:bg-accent"
            >
              संपर्क करा
            </a>
          </div>

          {/* Stat row */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur"
              >
                <s.icon className="h-5 w-5 text-saffron" />
                <div className="mt-2 font-display text-2xl font-bold text-saffron-deep md:text-3xl">
                  {s.k}
                </div>
                <div className="text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
