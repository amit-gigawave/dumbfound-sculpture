"use client";

import React from "react";
import dynamic from "next/dynamic";

const Prism = dynamic(() => import("./Prism"), { ssr: false });

export default function Footer() {
  return (
    <footer className="relative h-[600px] w-full overflow-hidden bg-black text-white px-6 lg:px-24 flex flex-col justify-end pb-12 pointer-events-auto">
      {/* Prism Background */}
      <div className="absolute inset-0 z-0 opacity-40  pointer-events-none">
        <Prism />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12 mb-20!">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold tracking-tighter uppercase sm:text-6xl">
            Dumbfound
          </h2>
          <p className="max-w-md text-zinc-400 text-lg leading-relaxed">
            Crafting the silent poetry of timeless form through digital and physical mastery.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-semibold">
            <a href="#gallery" className="hover:text-yellow-400 transition-colors">Gallery</a>
            <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors">Studio</a>
          </div>
        </div>

        <div className="text-right space-y-4">
          <div className="text-zinc-500 text-sm">
            {"\u00A9"} 2026 Dumbfound tech {"\u00B7"} All Rights Reserved
          </div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-600">
            London / Tokyo / New York
          </div>
        </div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </footer>
  );
}
