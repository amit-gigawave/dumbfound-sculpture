"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Ravi Sharma",
    role: "Lead Sculptor",
    description:
      "15 years experience in stone sculpting, specializing in monumental public art.",
    image: "/team/ravi.jpg",
    accent: "#818cf8",
  },
  {
    name: "Elena Petrov",
    role: "Master Artisan",
    description:
      "Expert in metal casting and precision finishing with a focus on geometric forms.",
    image: "/team/elena.jpg",
    accent: "#f97316",
  },
  {
    name: "Marcus Thorne",
    role: "Creative Director",
    description:
      "Award-winning designer with 20 years of experience in spatial and structural aesthetics.",
    image: "/team/marcus.jpg",
    accent: "#2dd4bf",
  },
  {
    name: "Ananya Iyer",
    role: "Installation Specialist",
    description:
      "Coordinates complex site-specific installations across global cultural institutions.",
    image: "/team/ananya.jpg",
    accent: "#f472b6",
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      gsap.to(q(".team-halo"), {
        yPercent: -16,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      mm.add("(min-width: 768px)", () => {
        const cards = q(".team-card") as HTMLElement[];
        const overlays = q(".team-image-overlay") as HTMLElement[];

        gsap.set(q(".team-heading"), { autoAlpha: 0, y: 48 });
        gsap.set(cards, {
          y: () => window.innerHeight * 0.9,
          scale: 0.72,
          autoAlpha: 0,
          rotateX: 10,
          filter: "blur(14px)",
          transformOrigin: "50% 50%",
          transformPerspective: 1400,
          willChange: "transform, opacity, filter",
        });
        gsap.set(overlays, { scaleY: 1, transformOrigin: "top center" });

        cards.forEach((card, index) => {
          gsap.set(card, { zIndex: cards.length - index });
        });

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${cards.length * 900}`,
            scrub: 1.1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(q(".team-heading"), {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
        });

        cards.forEach((card, index) => {
          const overlay = overlays[index];

          timeline.to(
            card,
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 0.95,
              ease: "expo.out",
            },
            index === 0 ? "-=0.1" : ">-0.08",
          );

          if (overlay) {
            timeline.to(
              overlay,
              {
                scaleY: 0,
                duration: 0.8,
                ease: "power2.inOut",
              },
              "<",
            );
          }

          timeline.to(card, {
            scale: 1.08,
            duration: 0.45,
            ease: "power1.inOut",
          });

          timeline.to(card, {
            scale: 1,
            duration: 0.28,
            ease: "power2.out",
          });

          if (index < cards.length - 1) {
            timeline.to(card, {
              x: () => -window.innerWidth * 1.15,
              y: -36,
              rotate: -14,
              scale: 0.82,
              autoAlpha: 0,
              filter: "blur(8px)",
              duration: 0.9,
              ease: "power2.in",
            });
          } else {
            timeline.to(card, {
              y: -20,
              scale: 0.96,
              duration: 0.6,
              ease: "power2.out",
            });
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        const cards = q(".team-card") as HTMLElement[];

        gsap.set(q(".team-heading"), { autoAlpha: 1, y: 0 });
        gsap.set(q(".team-image-overlay"), {
          scaleY: 0,
          transformOrigin: "top center",
        });

        gsap.from(cards, {
          y: 54,
          autoAlpha: 0,
          duration: 0.85,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative z-20 overflow-hidden px-6 py-8"
    >
      <div className="mx-auto grid min-h-screen max-w-7xl content-center gap-10 lg:gap-14">
        <div className="team-heading text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.45em] text-white/45">
            Our Team
          </p>
          <h2 className="mx-auto mb-6 max-w-4xl text-5xl font-serif uppercase tracking-tight text-white lg:text-7xl">
            Meet the{" "}
            <span className="font-light italic text-white/75">Visionaries</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-zinc-400 lg:text-lg">
            Scroll through the studio and watch each specialist take the stage,
            one after another, before the next talent pushes the story forward.
          </p>
        </div>

        <div className="relative space-y-5 md:h-[29rem] md:space-y-0 lg:h-[31rem]">
          <div className="team-halo pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_62%)]" />

          {team.map((member, index) => (
            <div
              key={member.name}
              className="relative flex items-center justify-center px-1 sm:px-6 md:absolute md:inset-0"
            >
              <article className="team-card relative w-full max-w-[18rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] shadow-[0_32px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:max-w-[32rem] lg:max-w-[44rem]">
                <div className="grid min-h-full lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative flex min-h-[13rem] items-end overflow-hidden border-b border-white/10 lg:min-h-[27rem] lg:border-b-0 lg:border-r lg:border-white/10">
                    <div
                      className="absolute inset-0 opacity-95"
                      style={{
                        background: `radial-gradient(circle at 25% 20%, ${member.accent}55, transparent 35%), linear-gradient(160deg, #111827 0%, #020617 45%, #000000 100%)`,
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_24%,rgba(0,0,0,0.35)_100%)]" />
                    <div className="relative z-10 flex w-full items-end justify-between p-5 lg:p-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-white/45">
                          0{index + 1}
                        </p>
                        <p className="mt-3 max-w-[12rem] text-xs uppercase tracking-[0.28em] text-white/65">
                          {member.role}
                        </p>
                      </div>
                      <p className="select-none text-[5.5rem] font-serif leading-none text-white/14 sm:text-[7rem] lg:text-[8.5rem]">
                        {member.name[0]}
                      </p>
                    </div>
                    <div className="team-image-overlay absolute inset-0 z-20 bg-zinc-950" />
                  </div>

                  <div className="relative flex flex-col justify-between p-5 lg:p-6">
                    <div
                      className="mb-8 h-px w-20"
                      style={{
                        background: `linear-gradient(90deg, ${member.accent}, transparent)`,
                      }}
                    />

                    <div>
                      <h3 className="text-2xl font-serif text-white lg:text-4xl">
                        {member.name}
                      </h3>
                      <p
                        className="mt-3 text-xs font-medium uppercase tracking-[0.38em]"
                        style={{ color: member.accent }}
                      >
                        {member.role}
                      </p>
                      <p className="mt-5 max-w-md text-sm leading-6 text-zinc-300">
                        {member.description}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/40">
                      <span>Studio Presence</span>
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: member.accent }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
