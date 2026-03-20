"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import SceneWrapper from "@/components/SceneWrapper";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden  font-sans text-white">
      <div className="fixed inset-0 z-0">
        <SceneWrapper />
      </div>

      <Hero />
      <About />
      <Gallery />
      <Team />
      <Contact />

      <footer className="relative z-10 flex w-full justify-center border-t border-white/5 p-8 text-sm text-zinc-500 pointer-events-auto">
        {"\u00A9"} 2026 Dumbfound Tech {"\u00B7"} All Rights Reserved
      </footer>
    </div>
  );
}
