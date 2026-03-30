"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "./BorderGlow";

const ScrollFloat = dynamic(() => import("./ScrollFloat"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "Material Intelligence",
    copy:
      "Stone, metal, and finish decisions are treated as part of the storytelling, not decoration added later.",
    note:
      "Material studies, patina logic, and finish direction are mapped before fabrication begins.",
    index: "01",
    color: "#f4f0e8",
    colorTwo: "#8ea4ff",
    chip: "Finish logic",
  },
  {
    title: "Spatial Discipline",
    copy:
      "Every form is designed to hold its silhouette from distance, approach, and peripheral movement.",
    note:
      "The piece has to read from across a plaza and still reward the close-up encounter.",
    index: "02",
    color: "#d7f2ff",
    colorTwo: "#62d4c8",
    chip: "Silhouette check",
  },
  {
    title: "Site Response",
    copy:
      "Installations are shaped to work with weather, foot traffic, architecture, and light behavior.",
    note:
      "Scale, shadow, and circulation paths are choreographed like part of the sculpture itself.",
    index: "03",
    color: "#ffe1f4",
    colorTwo: "#ff8d76",
    chip: "Context mapping",
  },
];

const stats = [
  { value: "150+", label: "Sculptures installed" },
  { value: "30+", label: "Global clients" },
  { value: "15", label: "Years in practice" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const blockRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      blockRefs.current.forEach((block, index) => {
        if (!block) return;

        const text = block.querySelector("[data-about-text]");
        const card = block.querySelector("[data-about-card]");
        const marker = block.querySelector("[data-about-marker]");

        gsap.set([text, card], {
          opacity: 0,
          y: 72,
        });

        gsap.set(card, {
          scale: 0.96,
        });

        gsap.set(marker, {
          opacity: 0.35,
          scaleX: 0.45,
          transformOrigin: "left center",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 72%",
            end: "bottom 42%",
            scrub: 1.1,
          },
        });

        tl.to(
          text,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.9,
          },
          0,
        )
          .to(
            card,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power2.out",
              duration: 1,
            },
            0.08,
          )
          .to(
            marker,
            {
              opacity: 1,
              scaleX: 1,
              ease: "power2.out",
              duration: 0.8,
            },
            0,
          );

        if (index < blockRefs.current.length - 1) {
          gsap.to(block, {
            opacity: 0.38,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "bottom 38%",
              end: "bottom 12%",
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 overflow-hidden bg-transparent px-6 py-24 text-white lg:px-16"
    >
      {/* <div className="absolute inset-0 bg-black/50 pointer-events-none" /> */}
      {/* Redundant background effects removed for performance Optimization */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/8 to-transparent" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#8ea4ff]/14 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#ff8d76]/10 blur-3xl" />
      </div> */}

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-white/42">
            About The Studio
          </p>
          <ScrollFloat
            containerClassName="text-left"
            textClassName="font-display block text-4xl font-semibold uppercase tracking-[-0.05em] text-white sm:text-5xl "
          >
            Precision That Reveals Itself On Scroll
          </ScrollFloat>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            Each principle enters only when the page has room for it. The
            section keeps its natural height, and the story unfolds in thirds
            instead of arriving as one crowded slab.
          </p>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.35rem] border border-white/8 bg-white/[0.04] p-4 backdrop-blur-md"
              >
                <div className="font-display text-2xl text-white">
                  {stat.value}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.26em] text-white/38">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 space-y-28 lg:space-y-36">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              ref={(node) => {
                blockRefs.current[index] = node;
              }}
              className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"
            >
              <div data-about-text className="space-y-6">
                <div
                  data-about-marker
                  className="h-px w-20"
                  style={{
                    background: `linear-gradient(90deg, ${pillar.color}, ${pillar.colorTwo})`,
                  }}
                />
                <div className="text-[10px] uppercase tracking-[0.42em] text-white/34">
                  {pillar.index}
                </div>
                <h3 className="max-w-sm font-display text-4xl uppercase tracking-[-0.05em] text-white sm:text-5xl">
                  {pillar.title}
                </h3>
                <p className="max-w-md text-base leading-8 text-white/62 sm:text-lg">
                  {pillar.copy}
                </p>
                <p className="max-w-md text-sm leading-7 text-white/38">
                  {pillar.note}
                </p>
              </div>

              {/* <div data-about-card>
                <BorderGlow
                  className="overflow-hidden border-white/12"
                  edgeSensitivity={56}
                  glowColor="42 88 84"
                  backgroundColor="#080211"
                  borderRadius={30}
                  glowRadius={34}
                  glowIntensity={1.05}
                  coneSpread={22}
                  colors={[pillar.color, pillar.colorTwo, "#ffffff"]}
                  forceHover
                  forceHoverAngle={315}
                  forceHoverProximity={1}
                >
                  <article className="relative p-6 sm:p-7">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-55"
                      style={{
                        background: `radial-gradient(circle at 12% 16%, ${pillar.color}12, transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.08))`,
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/[0.035]" />

                    <div className="relative z-10 flex h-full flex-col">

                      <h4 className="max-w-md font-sans text-[1.45rem] font-semibold tracking-[-0.05em] text-white sm:text-[1.7rem]">
                        {pillar.title}
                      </h4>
                      <p className="mt-3 max-w-xl text-[0.98rem] leading-7 text-white/58">
                        {pillar.copy}
                      </p>
                    </div>
                  </article>
                </BorderGlow>
              </div> */}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
