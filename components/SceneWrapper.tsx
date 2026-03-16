"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the Scene with SSR disabled.
// This is CRITICAL for SEO as it prevents Three.js from being part of the initial HTML payload,
// keeping the page lightweight for crawlers while loading the heavy 3D assets only on the client.
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-slate-900 animate-pulse">
      <div className="text-white text-xl font-light tracking-widest uppercase">
        Loading Experience...
      </div>
    </div>
  ),
});

export default function SceneWrapper() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}
