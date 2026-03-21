"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const clients = [
    "Government Projects",
    "Luxury Hotels",
    "Creative Museums",
    "Architectural Firms",
    "International Airports",
    "Corporate Headquarters",
    "Public Plazas",
    "Private Estates",
  ];

  const stats = [
    { value: "150+", label: "Sculptures Installed" },
    { value: "30+", label: "Global Clients" },
    { value: "15", label: "Years Experience" },
    { value: "12", label: "Art Awards" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const statsGrid = statsRef.current;
    const ticker = tickerRef.current;

    if (!section || !statsGrid || !ticker) {
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      gsap.from(q(".about-eyebrow, .about-title, .about-lead, .about-body"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 42,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(q(".about-rule"), {
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "expo.out",
      });

      gsap.from(q(".stat-card"), {
        scrollTrigger: {
          trigger: statsGrid,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        y: 64,
        opacity: 0,
        stagger: 0.15,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.to(q(".stat-card"), {
        y: (index) => (index % 2 === 0 ? -20 : 20),
        ease: "none",
        scrollTrigger: {
          trigger: statsGrid,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.15,
        },
      });

      gsap.to(q(".about-glow"), {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(ticker, {
        x: () => -(ticker.scrollWidth / 2),
        duration: 26,
        repeat: -1,
        ease: "none",
      });

      const skewTargets = q(".client-pill");
      const skewTo = gsap.quickTo(skewTargets, "skewX", {
        duration: 0.45,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          skewTo(gsap.utils.clamp(-6, 6, self.getVelocity() / 350));
        },
        onLeave: () => skewTo(0),
        onLeaveBack: () => skewTo(0),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 min-h-screen py-32 px-6 lg:px-16 overflow-hidden"
    >
      <div className="about-glow pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_68%)] blur-3xl" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {/* Left: Story */}
          <div className="about-story">
            <p className="about-eyebrow mb-5 text-[10px] font-medium uppercase tracking-[0.42em] text-white/45">
              Studio Approach
            </p>
            <h2 className="about-title text-4xl lg:text-7xl font-serif text-white mb-8">
              Crafting Art That <span className="italic font-light opacity-80">Endures</span>
            </h2>
            <div className="about-rule mb-8 h-px w-28 bg-[linear-gradient(90deg,rgba(255,255,255,0.65),transparent)]" />
            <p className="about-lead text-lg lg:text-xl text-zinc-400 font-light leading-relaxed mb-8">
              For over 15 years, we&apos;ve been transforming spaces with sculptures
              that blend traditional craftsmanship with contemporary design.
            </p>
            <p className="about-body text-lg lg:text-xl text-zinc-400 font-light leading-relaxed">
              Each piece tells a story, capturing moments in time through form,
              texture, and light. Our work has graced galleries, hotels, and
              public spaces across the globe.
            </p>
          </div>

          {/* Right: Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-card group bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-10 hover:-translate-y-1 hover:bg-white/10 transition-all duration-500 shadow-2xl"
              >
                <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/30">
                  <span>0{i + 1}</span>
                  <span className="h-px w-12 bg-white/12 transition-all duration-500 group-hover:w-16 group-hover:bg-white/25" />
                </div>
                <div className="text-5xl font-serif font-bold text-white mb-3">
                  {stat.value}
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos Section */}
        <div className="relative pt-16 border-t border-white/5">
          <p className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] mb-12 text-center">
            Trusted by World-Class Institutions
          </p>

          <div className="relative w-full overflow-hidden">
            {/* Gradient Masks */}
            {/* <div className="absolute inset-y-0 left-0 w-40 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" /> */}

            <div ref={tickerRef} className="ticker-wrapper flex gap-12 whitespace-nowrap py-4 will-change-transform">
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={i}
                  className="client-pill flex items-center gap-4 px-10 py-4 bg-white/3 backdrop-blur-sm border border-white/5 rounded-full hover:bg-white/8 hover:border-white/10 transition-colors duration-500"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-500/50" />
                  <span className="text-sm text-zinc-300 font-serif tracking-wide italic opacity-80 uppercase antialiased">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


