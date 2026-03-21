"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, Float, PerspectiveCamera } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

function ModelPreview({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  
  return (
    <div className="w-full h-50 rounded-xl bg-zinc-900/50 relative overflow-hidden group/model shadow-inner border border-white/5">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.1} shadows={false} adjustCamera={1.2}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <primitive object={scene} />
            </Float>
          </Stage>
        </Suspense>
      </Canvas>
      
      {/* Dynamic Gradient HUD overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br opacity-20 from-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t opacity-40 from-black/60 to-transparent" />
      </div>
    </div>
  );
}

const ClientModelPreview = dynamic(
  () => Promise.resolve(ModelPreview),
  { ssr: false },
);

type Sculpture = {
  title: string;
  location: string;
  year: string;
  modelPath: string;
  accent: string;
  config: {
    y: number;
    x: number;
    zIndex: number;
    rotate: number;
  };
};

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Sculpture | null>(null);
  const cardBoundsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (cardBoundsRef.current && !cardBoundsRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);


  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage) {
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      gsap.from(q(".gallery-heading > *"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(q(".gallery-stage"), {
        scrollTrigger: {
          trigger: stage,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        y: 70,
        opacity: 0,
        scale: 0.96,
        duration: 1.05,
        ease: "expo.out",
      });

      gsap.from(q(".gallery-mobile-card"), {
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        y: 48,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(q(".gallery-aura"), {
        yPercent: -16,
        rotate: 8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(q(".gallery-stage-frame"), {
        yPercent: -6,
        rotate: 1.8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const sculptures: Sculpture[] = [
    {
      title: "Eternal Flow",
      location: "Mumbai, India",
      year: "2024",
      accent: "rgba(249, 115, 22, 0.2)",
      modelPath: "/sculptures/angel_sculpture.glb",
      config: { y: 0, x: 0, zIndex: 1, rotate: -10 }
    },
    {
      title: "Rising Dawn",
      location: "Dubai, UAE",
      year: "2023",
      accent: "rgba(59, 130, 246, 0.2)",
      modelPath: "/sculptures/fragment_of_a_doorframe_representing_vishnu.glb",
      config: { y: 50, x: 150, zIndex: 2, rotate: 10 }
    },
    {
      title: "Harmony",
      location: "Singapore",
      year: "2023",
      accent: "rgba(16, 185, 129, 0.2)",
      modelPath: "/sculptures/hindu_god.glb",
      config: { y: -25, x: 300, zIndex: 3, rotate: -6 }
    },
    {
      title: "Transcendence",
      location: "London, UK",
      year: "2022",
      accent: "rgba(239, 68, 68, 0.2)",
      modelPath: "/sculptures/madona_sculpture.glb",
      config: { y: 30, x: 450, zIndex: 4, rotate: 6 }
    },
    {
      title: "Serenity",
      location: "New York, USA",
      year: "2022",
      accent: "rgba(234, 179, 8, 0.2)",
      modelPath: "/sculptures/sculpture_bust_of_roza_loewenfeld.glb",
      config: { y: 50, x: 600, zIndex: 5, rotate: -10 }
    },
    {
      title: "Momentum",
      location: "Tokyo, Japan",
      year: "2021",
      accent: "rgba(139, 92, 246, 0.2)",
      modelPath: "/sculptures/shiva_nataraja.glb",
      config: { y: 0, x: 750, zIndex: 6, rotate: 10 }
    },
  ];


  const hasActiveCard = Boolean(active);

  const isCurrentActive = (sculpture: Sculpture) => {
    return active?.title === sculpture.title;
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative z-10 min-h-screen py-32 px-6 lg:px-16 "
    >
      <div className="gallery-aura pointer-events-none absolute left-1/2 top-32 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.11),transparent_68%)] blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="gallery-heading mb-16 text-center">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.42em] text-white/45">
            Selected Works
          </p>
          <h2 className="text-5xl lg:text-7xl font-serif text-white">
            Our <span className="italic font-light opacity-80">Gallery</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Each sculpture gets its own focus moment. The section opens as a stacked archive,
            then lets one piece move forward without losing the rest of the collection.
          </p>
        </div>

        <div className="md:hidden">
          <div className="grid gap-5">
            {sculptures.map((sculpture) => (
              <motion.button
                key={sculpture.title}
                className="gallery-mobile-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 text-left shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl"
                initial={{ opacity: 0, y: 32 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setActive(isCurrentActive(sculpture) ? null : sculpture)
                }
              >
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 18%, ${sculpture.accent}, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.34em] text-white/45">
                    <span>{sculpture.year}</span>
                    <span>{sculpture.location}</span>
                  </div>

                  <ClientModelPreview path={sculpture.modelPath} />

                  <div className="mt-5">
                    <h3 className="text-3xl font-serif text-white">
                      {sculpture.title}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/45">
                      Tap to {isCurrentActive(sculpture) ? "collapse" : "expand"}
                    </p>

                    <AnimatePresence initial={false}>
                      {isCurrentActive(sculpture) && (
                        <motion.div
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -14 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="mt-4 border-t border-white/10 pt-4"
                        >
                          <p className="text-sm leading-6 text-zinc-300">
                            Site-responsive sculpture developed for a contemporary
                            hospitality or civic environment, with emphasis on
                            proportion, movement, and material presence.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div
          ref={cardBoundsRef}
          className="gallery-stage hidden md:block"
        >
          <div
            ref={stageRef}
            className="gallery-stage-frame relative mx-auto h-[44rem] w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-6 py-6 shadow-[0_35px_120px_rgba(0,0,0,0.38)] backdrop-blur-xl lg:px-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.12))]" />
            <div className="pointer-events-none absolute inset-x-10 top-10 flex items-center justify-between text-[10px] uppercase tracking-[0.34em] text-white/38">
              <span>Interactive Selection</span>
              <span>{hasActiveCard ? "Focused View" : "Stacked Archive"}</span>
            </div>

            {sculptures.map((sculpture) => (
              <motion.button
                key={sculpture.title}
                className="gallery-card-shell group absolute inset-0 w-80 cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 text-left shadow-2xl backdrop-blur-xl"
                initial={{
                  y: 460,
                  x: 0,
                  rotate: 0,
                  scale: 1,
                  width: 320,
                  height: 400,
                }}
                animate={{
                  y: isCurrentActive(sculpture)
                    ? 74
                    : hasActiveCard
                      ? 326
                      : sculpture.config.y + 84,
                  x: isCurrentActive(sculpture)
                    ? 340
                    : hasActiveCard
                      ? 78 + sculpture.config.x * 0.54
                      : sculpture.config.x + 10,
                  rotate: isCurrentActive(sculpture)
                    ? 0
                    : hasActiveCard
                      ? sculpture.config.rotate * 0.35
                      : sculpture.config.rotate,
                  scale: isCurrentActive(sculpture)
                    ? 1
                    : hasActiveCard
                      ? 0.5
                      : 1,
                  width: isCurrentActive(sculpture) ? 360 : 290,
                  height: isCurrentActive(sculpture) ? 430 : 380,
                }}
                whileHover={
                  isCurrentActive(sculpture)
                    ? { scale: 1.015, y: 68 }
                    : hasActiveCard
                      ? { scale: 0.54 }
                      : {
                          scale: 1.04,
                          y: sculpture.config.y + 66,
                          rotate: sculpture.config.rotate * 0.6,
                        }
                }
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 16,
                  mass: 0.9,
                }}
                style={{
                  zIndex: isCurrentActive(sculpture) ? 40 : sculpture.config.zIndex,
                }}
                aria-pressed={isCurrentActive(sculpture)}
                onClick={() =>
                  setActive(isCurrentActive(sculpture) ? null : sculpture)
                }
              >
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                  style={{
                    background: `radial-gradient(circle at 50% 12%, ${sculpture.accent}, transparent 62%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.34em] text-white/42">
                    <span>{sculpture.year}</span>
                    <span>{sculpture.location}</span>
                  </div>

                  <ClientModelPreview path={sculpture.modelPath} />

                  <div className="mt-6 text-left">
                    <h3 className="text-3xl font-serif text-white mb-2">
                      {sculpture.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                      {isCurrentActive(sculpture) ? "Focused entry" : "Open work"}
                    </p>

                    <AnimatePresence initial={false} mode="wait">
                      {isCurrentActive(sculpture) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{
                            type: "spring",
                            stiffness: 110,
                            damping: 16,
                          }}
                          className="pt-5 mt-5 border-t border-white/10"
                        >
                          <p className="text-sm leading-6 text-zinc-300">
                            A sculptural study designed to hold attention through
                            silhouette, rhythm, and the way it occupies space.
                          </p>
                          <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/42">
                            <span>Collection note</span>
                            <span>Tap again to reset</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-[2rem] border border-white/0 transition-all duration-500 pointer-events-none group-hover:border-white/10" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

