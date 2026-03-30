/*
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DrawPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const ballRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const ball = ballRef.current;
    if (!path || !ball) return;

    const length = path.getTotalLength();

    // Set initial stroke dash
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const updateBallPosition = (progress: number) => {
      const point = path.getPointAtLength(length * progress);
      gsap.set(ball, {
        attr: { cx: point.x, cy: point.y },
      });
    };

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(path, { strokeDashoffset: length * (1 - self.progress) });
        updateBallPosition(self.progress);
      },
    });

    // Refresh ScrollTrigger after a short delay to account for other components' layouts (pins, etc)
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      st.kill();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed top-0 bottom-0 left-4 z-50 pointer-events-none w-20 sm:w-28 lg:w-32 hidden md:block">
      <svg
        ref={svgRef}
        viewBox="0 0 200 1000"
        preserveAspectRatio="none"
        className="h-screen w-full"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5227FF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#8A2BE2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5227FF" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <path
          d="M 50 0 C 140 200 20 400 120 600 C 220 800 60 900 180 1000"
          fill="none"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="4.5"
          preserveAspectRatio="none"
        />

        <path
          ref={pathRef}
          d="M 50 0 C 140 200 20 400 120 600 C 220 800 60 900 180 1000"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glowEffect)"
          className="transition-all duration-300"
        />
        
        <circle 
          ref={ballRef}
          r="14" 
          fill="#fff" 
          className="filter-ball"
          style={{ transition: "transform 0.4s ease-out" }}
        />
      </svg>
      
      <style jsx>{`
        .filter-ball {
          filter: drop-shadow(0 0 15px #5227FF);
          animation: pulse 2s infinite alternate ease-in-out;
        }
        @keyframes pulse {
          0% { transform: scale(1); filter: drop-shadow(0 0 10px #5227FF); }
          100% { transform: scale(1.15); filter: drop-shadow(0 0 20px #5227FF); }
        }
      `}</style>
    </div>
  );
}
*/

export default function DrawPath() { return null; }

