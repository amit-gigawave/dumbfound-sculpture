"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
    const ctx = gsap.context(() => {
      // Main Entrance
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
      });

      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // Infinite Ticker
      const ticker = document.querySelector(".ticker-wrapper");
      if (ticker) {
        const totalWidth = ticker.scrollWidth;
        gsap.to(ticker, {
          x: -totalWidth / 2,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 min-h-screen py-32 px-6 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {/* Left: Story */}
          <div className="about-text">
            <h2 className="text-4xl lg:text-7xl font-serif text-white mb-8">
              Crafting Art That <span className="italic font-light opacity-80">Endures</span>
            </h2>
            <p className="text-lg lg:text-xl text-zinc-400 font-light leading-relaxed mb-8">
              For over 15 years, we've been transforming spaces with sculptures
              that blend traditional craftsmanship with contemporary design.
            </p>
            <p className="text-lg lg:text-xl text-zinc-400 font-light leading-relaxed">
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
                className="stat-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-10 hover:bg-white/10 transition-all duration-500 shadow-2xl"
              >
                <div className="text-5xl font-serif font-bold text-indigo-400 mb-3">
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

            <div className="ticker-wrapper flex gap-12 whitespace-nowrap py-4">
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-10 py-4 bg-white/3 backdrop-blur-sm border border-white/5 rounded-full hover:bg-white/8 hover:border-white/10 transition-colors duration-500"
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


