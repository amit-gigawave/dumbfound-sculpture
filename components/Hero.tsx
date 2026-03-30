"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import LightRays from "./LightRays";
import BlurText from "./BlurText";
import SceneWrapper from "./SceneWrapper";
import PremiumButton from "./PremiumButton";

const ScrollFloat = dynamic(() => import("./ScrollFloat"), { ssr: false });

const heroStats = [
  { value: "150+", label: "Installed forms" },
  { value: "30", label: "Cities shaped" },
  { value: "15", label: "Years refining" },
];

export default function Hero() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return (
    <section
      id="home"
      ref={scrollContainerRef}
      className="relative z-10  flex min-h-screen items-center overflow-hidden py-0!  pointer-events-none  justify-between"
    >
      {/* <div className="absolute inset-0 z-0">
        <SceneWrapper />
      </div> */}
      {/* <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
        pulsating={false}
        fadeDistance={0.5}
        saturation={1}
      /> */}
      <div className="px-6 lg:px-24">
        <BlurText
          text="DUMBFOUND"
          startDelay={200}
          delay={150}
          animateBy="words"
          direction="top"
          className="text-6xl text-yellow-400 font-bold cursor-target!"
        />
        <BlurText
          text="SCULPTURE STUDIO"
          startDelay={1000}
          delay={150}
          animateBy="words"
          direction="top"
          className="text-5xl mb-3 font-bold"
        />
        <BlurText
          text="Elevating modern spaces through "
          startDelay={2000}
          delay={100}
          animateBy="words"
          direction="top"
          className="text-2xl"
        />
        <BlurText
          text="the silent poetry of timeless form."
          startDelay={2600}
          delay={100}
          animateBy="words"
          direction="top"
          className="text-2xl mb-8"
        />
      </div>

      <div className=" pointer-events-auto text-black  px-6 lg:px-24">
        <PremiumButton className="cursor-target" text="Explore Our Work" />
      </div>
    </section>
  );
}

// <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
//   <div className="relative">
//     <div className="mb-6 inline-flex rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.42em] text-white/60 backdrop-blur-md">
//       Dumbfound Sculpture Studio
//     </div>

//     <div className="max-w-4xl">
//       <ScrollFloat
//         scrollContainerRef={scrollContainerRef}
//         containerClassName="text-left"
//         textClassName="font-display block text-5xl font-semibold uppercase tracking-[-0.05em] text-white sm:text-6xl lg:text-[6.8rem]"
//         scrollStart="top 88%"
//         scrollEnd="bottom 65%"
//       >
//         Sculpture With Atmosphere
//       </ScrollFloat>
//     </div>

//     <p className="mt-6 max-w-xl text-base leading-8 text-white/68 sm:text-lg">
//       We build sculptural spaces that feel alive before the viewer even
//       reaches them. The site should carry that same sense of mass,
//       suspension, and precision.
//     </p>

//     <div className="mt-10 flex flex-col gap-4 sm:flex-row">
//       <a
//         href="#gallery"
//         className="cursor-target inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-black transition-transform duration-300 hover:-translate-y-0.5"
//       >
//         View the Collection
//       </a>
//       <a
//         href="#contact"
//         className="cursor-target inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-white/78 backdrop-blur-md transition-colors duration-300 hover:border-white/24 hover:text-white"
//       >
//         Start a Commission
//       </a>
//     </div>

//     <div className="mt-12 grid gap-4 sm:grid-cols-3">
//       {heroStats.map((item) => (
//         <div
//           key={item.label}
//           className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md"
//         >
//           <div className="text-3xl font-display text-white">
//             {item.value}
//           </div>
//           <div className="mt-2 text-[10px] uppercase tracking-[0.32em] text-white/42">
//             {item.label}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>

//   {/* <div className="relative h-[26rem] sm:h-[32rem] lg:h-[39rem]">
//     <div className="absolute inset-0 rounded-[2.4rem] border border-white/12 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.1),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.14))] shadow-[0_40px_120px_rgba(0,0,0,0.38)] backdrop-blur-md" />
//     <div className="absolute inset-[10%] rounded-[2rem] border border-white/10 bg-black/12" />
//     <div className="absolute left-1/2 top-[36%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/14 bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_68%)] shadow-[0_0_80px_rgba(255,255,255,0.08)]" />
//     <div className="absolute left-1/2 top-[36%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />
//     <div className="absolute left-1/2 top-[36%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/8" />
//     <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] bg-[linear-gradient(180deg,rgba(4,7,13,0)_0%,rgba(4,7,13,0.18)_100%)]" />

//     <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-white/56 backdrop-blur-md">
//       Global motion field
//     </div>
//     <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-white/56 backdrop-blur-md">
//       Sculpture remains live
//     </div>
//     <div className="absolute inset-x-5 bottom-5 grid gap-4 sm:grid-cols-2">
//       <div className="rounded-[1.6rem] border border-white/10 bg-black/25 p-5 backdrop-blur-md">
//         <div className="text-[10px] uppercase tracking-[0.34em] text-white/42">
//           Motion cue
//         </div>
//         <p className="mt-3 text-sm leading-6 text-white/68">
//           Antigravity now lives behind the entire application, so the page
//           feels consistently energized instead of saving that motion for
//           the opening section alone.
//         </p>
//       </div>
//       <div className="rounded-[1.6rem] border border-white/10 bg-black/25 p-5 backdrop-blur-md">
//         <div className="text-[10px] uppercase tracking-[0.34em] text-white/42">
//           Intended tone
//         </div>
//         <p className="mt-3 text-sm leading-6 text-white/68">
//           The 3D sculpture still anchors the composition, while the
//           particle field adds atmosphere and depth around it.
//         </p>
//       </div>
//     </div>
//   </div> */}
// </div>
