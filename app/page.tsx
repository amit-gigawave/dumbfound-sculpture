import Image from "next/image";
import SceneWrapper from "@/components/SceneWrapper";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black font-sans text-white overflow-x-hidden">
      {/* 3D Background Layer - Decoupled from main SEO content */}
      <div className="fixed inset-0 z-0">
        <SceneWrapper />
      </div>

      {/* Main Content Layer - Accessible for Crawlers */}


      {/* Footer / Contact HUD */}
      <footer className="relative z-10 w-full p-8 flex justify-center text-zinc-500 text-sm">
        © 2026 Antigravity Labs • Built with Next.js 16 & Three.js
      </footer>
    </div>
  );
}

