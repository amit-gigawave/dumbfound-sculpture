"use client";

import { CSSProperties, useEffect, useId, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function KineticWordLine({ word }: { word: string }) {
  const clipPathId = useId().replace(/:/g, "");

  const bars = useMemo(() => {
    const numBars = 250;
    const viewBoxWidth = 2000;
    const barWidth = viewBoxWidth / numBars;
    const gap = 0.5;

    return Array.from({ length: numBars }, (_, index) => {
      const normalizedX = index / numBars;
      const slowWave = Math.sin(normalizedX * Math.PI * 2);
      const fastWave = Math.sin(normalizedX * Math.PI * 6) * 0.5;
      const combinedWave = (slowWave + fastWave) / 1.5;
      const delay = normalizedX * -2.5;
      const duration = 1.2 + (index % 5) * 0.08;
      const scaleMin = 0.2 + Math.abs(fastWave) * 0.8;
      const scaleMax = 0.9 + Math.abs(combinedWave) * 0.8;

      return {
        x: (index - 14) * barWidth,
        width: barWidth - gap,
        delay,
        duration,
        scaleMin,
        scaleMax,
      };
    });
  }, []);

  const fontSize = word.length > 9 ? 200 : 240;

  return (
    <div className="hero-word-line">
      <svg
        className="hero-kinetic-svg"
        viewBox="0 0 1000 240"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipPathId}>
            <text
              x="50%"
              y="66%"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              fontSize={fontSize}
              letterSpacing="-0.04em"
            >
              {word}
            </text>
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipPathId})`}>
          {bars.map((bar) => (
            <rect
              key={`${word}-${bar.x}`}
              className="hero-kinetic-bar"
              x={bar.x}
              y="0"
              width={bar.width}
              height="100%"
              style={
                {
                  "--anim-delay": `${bar.delay}s`,
                  "--anim-duration": `${bar.duration}s`,
                  "--scale-min": bar.scaleMin,
                  "--scale-max": bar.scaleMax,
                } as CSSProperties
              }
            />
          ))}
        </g>

        <text
          x="50%"
          y="66%"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize={fontSize}
          letterSpacing="-0.04em"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          opacity="0.35"
        >
          {word}
        </text>
      </svg>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = heroRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(q(".hero-meta"), {
        y: 20,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          q(".hero-word-line"),
          {
            y: 46,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: "expo.out",
          },
          "-=0.3",
        )
        .from(
          q(".hero-subtext"),
          {
            y: 24,
            opacity: 0,
            duration: 0.75,
          },
          "-=0.45",
        )
        .from(
          q(".hero-cta"),
          {
            y: 22,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4",
        )
        .from(
          q(".hero-stage-shell"),
          {
            scale: 0.82,
            opacity: 0,
            duration: 1.15,
            ease: "expo.out",
          },
          "-=0.85",
        )
        .from(
          q(".hero-stage-chip"),
          {
            y: 16,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.8",
        );

      gsap.to(q(".hero-stage-orbit"), {
        rotate: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      gsap.to(q(".hero-stage-core"), {
        yPercent: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      })
        .to(
          q(".hero-copy"),
          {
            yPercent: -12,
            opacity: 0.84,
            ease: "none",
          },
          0,
        )
        .to(
          q(".hero-stage-shell"),
          {
            yPercent: 12,
            rotate: 8,
            scale: 1.05,
            ease: "none",
          },
          0,
        )
        .to(
          q(".hero-cta"),
          {
            yPercent: -20,
            opacity: 0.72,
            ease: "none",
          },
          0,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative z-10 pointer-events-none flex min-h-screen items-center px-6 py-24 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.2fr_0.8fr]">
        <div className="hero-copy max-w-[32rem] border-t border-white/10 pt-6 pointer-events-none">
          <p className="hero-meta mb-5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
            Dumbfound Sculpture Studio
          </p>

          <div className="space-y-1">
            <KineticWordLine word="CRAFTING" />
            <KineticWordLine word="TIMELESS" />
            <KineticWordLine word="SCULPTURES" />
          </div>

          <p className="hero-subtext mt-5 max-w-sm text-sm font-medium leading-7 tracking-[-0.01em] text-white/68 sm:text-base">
            Where art meets form, and imagination becomes reality.
          </p>
        </div>

        <div aria-hidden="true" className="hidden min-h-[24rem] items-center justify-center lg:flex">
          <div className="hero-stage-shell relative aspect-square w-full max-w-[26rem] rounded-full border border-white/10 bg-white/[0.03] shadow-[0_24px_120px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <div className="hero-stage-orbit absolute inset-4 rounded-full border border-white/8" />
            <div className="hero-stage-orbit absolute inset-11 rounded-full border border-dashed border-white/10" />
            <div className="hero-stage-orbit absolute inset-[28%] rounded-full border border-white/6" />

            <div className="absolute inset-x-12 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)]" />
            <div className="absolute inset-y-12 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.16),transparent)]" />

            <div className="hero-stage-core absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-white/[0.06] shadow-[0_0_60px_rgba(255,255,255,0.08)]">
              <div className="h-3 w-3 rounded-full bg-white/75 shadow-[0_0_18px_rgba(255,255,255,0.5)]" />
            </div>

            <div className="hero-stage-chip absolute left-0 top-[18%] rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/60 backdrop-blur-md">
              Material Study
            </div>
            <div className="hero-stage-chip absolute right-4 top-[22%] rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/60 backdrop-blur-md">
              Motion Draft
            </div>
            <div className="hero-stage-chip absolute bottom-[18%] left-[12%] rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/60 backdrop-blur-md">
              Scale Logic
            </div>
          </div>
        </div>

        <div className="hero-cta flex justify-start lg:justify-end">
          <a
            href="#gallery"
            className="group pointer-events-auto inline-flex items-center gap-4 rounded-full border border-white/12 bg-white/[0.06] px-6 py-3 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.12] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] transition-all duration-300 group-hover:scale-105 group-hover:border-white/25 group-hover:bg-white/15">
              <span className="h-1.5 w-1.5 rounded-full bg-white/75 transition-colors duration-300 group-hover:bg-white" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/85 transition-colors duration-300 group-hover:text-white">
              Explore Our Work
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
