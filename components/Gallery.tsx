"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import FadeContent from "./FadeContent";

const CircularGallery = dynamic(() => import("./CircularGallery"), { ssr: false });
const ScrollFloat = dynamic(() => import("./ScrollFloat"), { ssr: false });

type GalleryItem = {
  title: string;
  location: string;
  year: string;
  accent: string;
};

const works: GalleryItem[] = [
  {
    title: "Eternal Flow",
    location: "Mumbai, India",
    year: "2024",
    accent: "#f97316",
  },
  {
    title: "Rising Dawn",
    location: "Dubai, UAE",
    year: "2023",
    accent: "#60a5fa",
  },
  {
    title: "Harmony",
    location: "Singapore",
    year: "2023",
    accent: "#34d399",
  },
  {
    title: "Transcendence",
    location: "London, UK",
    year: "2022",
    accent: "#f87171",
  },
  {
    title: "Serenity",
    location: "New York, USA",
    year: "2022",
    accent: "#facc15",
  },
  {
    title: "Momentum",
    location: "Tokyo, Japan",
    year: "2021",
    accent: "#a78bfa",
  },
];

function createArtwork({ title, location, year, accent }: GalleryItem) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#05070b"/>
          <stop offset="55%" stop-color="#0d1117"/>
          <stop offset="100%" stop-color="#161b22"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="32%" r="55%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.78"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#bg)"/>
      <rect width="1200" height="1200" fill="url(#glow)"/>
      <circle cx="600" cy="420" r="250" fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>
      <circle cx="600" cy="420" r="140" fill="none" stroke="${accent}" stroke-opacity="0.4" stroke-width="10"/>
      <path d="M470 680 C515 555 685 550 730 680 C760 765 710 885 600 930 C488 885 442 765 470 680 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.24)" stroke-width="2"/>
      <text x="100" y="930" fill="white" font-family="Georgia, serif" font-size="88">${title}</text>
      <text x="104" y="1000" fill="rgba(255,255,255,0.65)" font-family="Arial, sans-serif" font-size="24" letter-spacing="7">${location.toUpperCase()}</text>
      <text x="104" y="1060" fill="rgba(255,255,255,0.42)" font-family="Arial, sans-serif" font-size="22" letter-spacing="8">${year}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export default function Gallery() {
  const items = useMemo(
    () =>
      works.map((work) => ({
        image: createArtwork(work),
        text: work.title,
      })),
    [],
  );

  return (
    <FadeContent blur={true} duration={3000} ease="ease-out" initialOpacity={0}>
      <section
        id="gallery"
        className="relative z-10 overflow-hidden py-28  "
      >

        <div className="">

          <ScrollFloat
            animationDuration={2}
            ease='back.inOut(2)'
            scrollStart='center bottom+=10%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.03}
            textClassName="text-7xl mx-auto w-full font-bold text-white"
          >
            Gallary
          </ScrollFloat>


          <div className="h-[600px]  w-full relative">
            <CircularGallery items={items} bend={3} />
          </div>
        </div>
      </section>
    </FadeContent>
  );
}
