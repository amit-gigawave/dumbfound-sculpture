"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

function getStatusLabel(item: string | null, active: boolean) {
  if (!active) {
    return "Sculpture aligned";
  }

  if (!item) {
    return "Gathering fragments";
  }

  const fileName = item.split("/").pop();

  return fileName ? `Loading ${fileName}` : "Preparing the atelier";
}

export default function SceneLoader() {
  const { active, progress, item } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const mountedAtRef = useRef<number>(0);

  useEffect(() => {
    mountedAtRef.current = window.performance.now();
  }, []);

  useEffect(() => {
    const maxVisibleTimeout = window.setTimeout(() => {
      setIsHidden(true);
    }, 3200);

    return () => window.clearTimeout(maxVisibleTimeout);
  }, []);

  useEffect(() => {
    let frameId = 0;

    const animate = () => {
      setDisplayProgress((current) => {
        const next = current + (progress - current) * 0.14;

        if (Math.abs(next - progress) < 0.2) {
          return progress;
        }

        return next;
      });

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [progress]);

  useEffect(() => {
    if (active || progress < 100 || isHidden) {
      return;
    }

    const elapsed = window.performance.now() - mountedAtRef.current;
    const remainingDelay = Math.max(0, 1800 - elapsed);
    const timeout = window.setTimeout(() => {
      setIsHidden(true);
    }, remainingDelay + 350);

    return () => window.clearTimeout(timeout);
  }, [active, isHidden, progress]);

  const roundedProgress = Math.round(displayProgress);
  const statusLabel = getStatusLabel(item ?? null, active);

  return (
    <div
      aria-hidden={isHidden}
      className={`pointer-events-none absolute inset-0 z-50 overflow-hidden transition-all duration-900 ${
        isHidden
          ? "translate-y-6 scale-[1.02] opacity-0"
          : "translate-y-0 scale-100 opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-[#030507]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(71,85,105,0.22),transparent_28%),radial-gradient(circle_at_80%_28%,rgba(99,102,241,0.18),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(244,114,182,0.12),transparent_30%)]" />
      <div className="loader-grid absolute inset-0 opacity-40" />

      <div className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.5em] text-white/40 sm:left-10 sm:top-10">
        Dumbfound Sculpture
      </div>

      <div className="absolute right-6 top-6 text-right text-[10px] uppercase tracking-[0.4em] text-white/35 sm:right-10 sm:top-10">
        <p>Immersive Atelier</p>
        <p className="mt-2 text-white/55">{roundedProgress}%</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="relative w-full max-w-4xl">
          <div className="absolute left-1/2 top-1/2 h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[22rem] sm:w-[22rem]">
            <div className="absolute inset-5 rounded-full border border-white/8" />
            <div className="loader-pulse absolute inset-0 rounded-full border border-white/15" />
            <div className="loader-orbit absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.8)]" />
            <div className="loader-scan absolute left-8 right-8 top-1/2 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="mb-5 text-[11px] uppercase tracking-[0.6em] text-white/40">
              Constructing Presence
            </p>
            <div className="space-y-1 font-serif uppercase leading-none text-white">
              <p className="text-[clamp(2.8rem,7vw,6.6rem)] tracking-[0.18em]">
                Sculpted
              </p>
              <p className="text-[clamp(2.8rem,7vw,6.6rem)] tracking-[0.24em] text-white/78">
                Matter
              </p>
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 tracking-[0.18em] text-white/45 uppercase">
              {statusLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between gap-6 sm:bottom-10 sm:left-10 sm:right-10">
        <div className="max-w-xs text-[10px] uppercase tracking-[0.35em] text-white/30">
          Atmosphere, depth, and motion are loading before the sculpture takes the stage.
        </div>
        <div className="w-32 sm:w-44">
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/45">
            <span>Progress</span>
            <span>{roundedProgress.toString().padStart(2, "0")}</span>
          </div>
          <div className="h-px overflow-hidden bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-white/55 via-white to-white/35 transition-[width] duration-300"
              style={{ width: `${Math.min(100, roundedProgress)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
