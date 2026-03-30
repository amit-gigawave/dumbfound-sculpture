"use client";

import dynamic from "next/dynamic";
import SceneWrapper from "@/components/SceneWrapper";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import SculptureCards from "@/components/SculptureCards";
import GradualBlur from "@/components/GradualBlur";
import SequenceCanvas from "@/components/SequenceCanvas";
import Footer from "@/components/Footer";

const TargetCursor = dynamic(() => import("@/components/TargetCursor"), {
  ssr: false,
});


export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black font-sans  text-white ">
      <TargetCursor targetSelector=".cursor-target" />

      {/* <div className="fixed inset-0 z-0">
        <SceneWrapper />
      </div> */}

      <div id="sequence-trigger" className="relative">
        <SequenceCanvas />
        <Hero />
        <About />
      </div>
      <Gallery />
      <SculptureCards />
      <Team />
      <Contact />

      <Footer />
      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={40}
        className="pointer-events-none"
      />
    </div>
  );
}
