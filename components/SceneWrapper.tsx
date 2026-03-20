"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-end justify-start bg-slate-950 px-6 pb-6 sm:px-10 sm:pb-10">
      <div className="rounded-full border border-white/10 bg-black/40 px-5 py-3 text-[10px] uppercase tracking-[0.4em] text-white/60 backdrop-blur-md">
        Loading Sculpture
      </div>
    </div>
  ),
});

export default function SceneWrapper() {
  return (
    <div className="relative w-full h-screen overflow-hidden ">
      <Scene />
      <div className="pointer-events-none absolute inset-0 bg-black/18" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(99,102,241,0.16),transparent_24%),radial-gradient(circle_at_82%_68%,rgba(34,211,238,0.1),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.18)_100%)]" />
    </div>
  );
}
