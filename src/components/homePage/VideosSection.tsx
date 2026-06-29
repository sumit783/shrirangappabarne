import { Play } from "lucide-react";
import Image from "next/image";
import videoThumb1 from "@/assets/video-thumb-1.jpg";
import videoThumb2 from "@/assets/video-thumb-2.jpg";
import videoThumb3 from "@/assets/video-thumb-3.jpg";

const videos = [
  {
    thumb: videoThumb1,
    title: "मावळ दौरा — जनतेच्या भेटीगाठी",
    meta: "रॅली · ८:४२",
  },
  {
    thumb: videoThumb2,
    title: "लोकसभेतील ऊर्जा विषयक भाषण",
    meta: "संसद · १२:१५",
  },
  {
    thumb: videoThumb3,
    title: "नवीन उड्डाणपूल लोकार्पण सोहळा",
    meta: "लोकार्पण · ५:३०",
  },
];

export function VideosSection() {
  return (
    <section id="videos" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip-divider text-xs font-semibold uppercase tracking-[0.25em] text-saffron-deep">
              व्हिडिओ
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              कार्य आणि भाषणांचे क्षण
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-saffron-deep underline-offset-4 hover:underline"
          >
            सर्व व्हिडिओ पहा →
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {videos.map((v, i) => (
            <a
              key={i}
              href="#"
              className="group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={v.thumb}
                  alt={v.title}
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-saffron-foreground/95 text-saffron-deep shadow-xl ring-4 ring-saffron-foreground/30 transition group-hover:scale-110">
                    <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                  </span>
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-saffron-foreground/95 px-3 py-1 text-[11px] font-semibold text-saffron-deep">
                  {v.meta}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold leading-snug">{v.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
