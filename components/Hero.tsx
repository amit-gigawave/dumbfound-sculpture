"use client";

// import dynamic from "next/dynamic";
import { useRef } from "react";
// import LightRays from "./LightRays";
import BlurText from "./BlurText";
// import SceneWrapper from "./SceneWrapper";
// import PremiumButton from "./PremiumButton";

// const ScrollFloat = dynamic(() => import("./ScrollFloat"), { ssr: false });

// const heroStats = [
//   { value: "150+", label: "Installed forms" },
//   { value: "30", label: "Cities shaped" },
//   { value: "15", label: "Years refining" },
// ];

export default function Hero() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return (
    <section
      id="home"
      ref={scrollContainerRef}
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden py-0 pointer-events-none"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_162107_3cd240af-dff4-4396-b8b7-22e25c9adb1c.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-6 text-white gap-7 mt-16">
        <h1 className="text-[clamp(36px,4.4vw,72px)] leading-[0.95] tracking-[-0.022em] font-normal m-0 text-white text-center w-full">
          <span className="font-sans block">
            <BlurText
              text="DUMBFOUND SCULPTURE STUDIO"
              startDelay={200}
              delay={50}
              animateBy="words"
              direction="top"
              className="font-medium"
            />
          </span>
          <span className="mt-[0.2em] block">
            <span className="font-serif italic text-[1.14em] tracking-[-0.01em] mr-[0.25em]">
              <BlurText
                text="Elevating modern spaces"
                startDelay={800}
                delay={50}
                animateBy="words"
                direction="top"
                className=""
              />
            </span>
            <span className="font-sans">
              <BlurText
                text="through"
                startDelay={1000}
                delay={50}
                animateBy="words"
                direction="top"
                className="font-normal"
              />
            </span>
          </span>
          <span className="mt-[0.2em] font-sans block">
            <BlurText
              text="the silent poetry of timeless form."
              startDelay={1200}
              delay={50}
              animateBy="words"
              direction="top"
              className="font-normal"
            />
          </span>
        </h1>
        <div className="pointer-events-auto mt-7">
          <button className="bg-white text-black px-[25px] py-[15px] text-[13px] font-semibold rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(255,255,255,0.15)] transition-all duration-300">
            Explore Our Work
          </button>
        </div>
      </div>
    </section>
  );
}

// <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
//   <div className="relative">
//     <div className="mb-6 inline-flex rounded-full border border-black/12 bg-white/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.42em] text-black/60 backdrop-blur-md">
//       Dumbfound Sculpture Studio
//     </div>

//     <div className="max-w-4xl">
//       <ScrollFloat
//         scrollContainerRef={scrollContainerRef}
//         containerClassName="text-left"
//         textClassName="font-display block text-5xl font-semibold uppercase tracking-[-0.05em] text-black sm:text-6xl lg:text-[6.8rem]"
//         scrollStart="top 88%"
//         scrollEnd="bottom 65%"
//       >
//         Sculpture With Atmosphere
//       </ScrollFloat>
//     </div>

//     <p className="mt-6 max-w-xl text-base leading-8 text-black/68 sm:text-lg">
//       We build sculptural spaces that feel alive before the viewer even
//       reaches them. The site should carry that same sense of mass,
//       suspension, and precision.
//     </p>

//     <div className="mt-10 flex flex-col gap-4 sm:flex-row">
//       <a
//         href="#gallery"
//         className="cursor-target inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-black transition-transform duration-300 hover:-translate-y-0.5"
//       >
//         View the Collection
//       </a>
//       <a
//         href="#contact"
//         className="cursor-target inline-flex items-center justify-center rounded-full border border-black/12 bg-white/[0.05] px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-black/78 backdrop-blur-md transition-colors duration-300 hover:border-black/24 hover:text-black"
//       >
//         Start a Commission
//       </a>
//     </div>

//     <div className="mt-12 grid gap-4 sm:grid-cols-3">
//       {heroStats.map((item) => (
//         <div
//           key={item.label}
//           className="rounded-[1.75rem] border border-black/10 bg-white/[0.04] p-5 backdrop-blur-md"
//         >
//           <div className="text-3xl font-display text-black">
//             {item.value}
//           </div>
//           <div className="mt-2 text-[10px] uppercase tracking-[0.32em] text-black/42">
//             {item.label}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>

//   {/* <div className="relative h-[26rem] sm:h-[32rem] lg:h-[39rem]">
//     <div className="absolute inset-0 rounded-[2.4rem] border border-black/12 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.1),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.14))] shadow-[0_40px_120px_rgba(0,0,0,0.38)] backdrop-blur-md" />
//     <div className="absolute inset-[10%] rounded-[2rem] border border-black/10 bg-white/12" />
//     <div className="absolute left-1/2 top-[36%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/14 bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_68%)] shadow-[0_0_80px_rgba(255,255,255,0.08)]" />
//     <div className="absolute left-1/2 top-[36%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/8" />
//     <div className="absolute left-1/2 top-[36%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-black/8" />
//     <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] bg-[linear-gradient(180deg,rgba(4,7,13,0)_0%,rgba(4,7,13,0.18)_100%)]" />

//     <div className="absolute left-5 top-5 rounded-full border border-black/10 bg-white/25 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-black/56 backdrop-blur-md">
//       Global motion field
//     </div>
//     <div className="absolute right-5 top-5 rounded-full border border-black/10 bg-white/25 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-black/56 backdrop-blur-md">
//       Sculpture remains live
//     </div>
//     <div className="absolute inset-x-5 bottom-5 grid gap-4 sm:grid-cols-2">
//       <div className="rounded-[1.6rem] border border-black/10 bg-white/25 p-5 backdrop-blur-md">
//         <div className="text-[10px] uppercase tracking-[0.34em] text-black/42">
//           Motion cue
//         </div>
//         <p className="mt-3 text-sm leading-6 text-black/68">
//           Antigravity now lives behind the entire application, so the page
//           feels consistently energized instead of saving that motion for
//           the opening section alone.
//         </p>
//       </div>
//       <div className="rounded-[1.6rem] border border-black/10 bg-white/25 p-5 backdrop-blur-md">
//         <div className="text-[10px] uppercase tracking-[0.34em] text-black/42">
//           Intended tone
//         </div>
//         <p className="mt-3 text-sm leading-6 text-black/68">
//           The 3D sculpture still anchors the composition, while the
//           particle field adds atmosphere and depth around it.
//         </p>
//       </div>
//     </div>
//   </div> */}
// </div>
