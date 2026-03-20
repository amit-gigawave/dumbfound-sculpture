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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState<Sculpture | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setActive(null);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [])


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".gallery-card", {
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

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


  const isAnyCardActive = () => {
    return active?.title;
  }

  const isCurrentActive = (sculpture: Sculpture) => {
    return active?.title === sculpture.title;
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative z-10 min-h-screen py-32 px-6 lg:px-16 "
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl lg:text-7xl font-serif text-center mb-20 text-white"
        >
          Our <span className="italic font-light opacity-80">Gallery</span>
        </h2>

        <div ref={ref} className="max-w-5xl mx-auto w-full h-160 relative">
          {sculptures.map((sculpture) => (
            <motion.div key={sculpture.title}>
              <motion.button className={"w-80 p-4  absolute inset-0 rounded-4xl cursor-pointer group border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl overflow-hidden"}
                initial={{
                  y: 500,
                  x: 0,
                  rotate: 0,
                  scale: 1,
                  width: 320,
                  height: 400
                }}
                animate={{
                  y: isCurrentActive(sculpture) ? 0 : isAnyCardActive() ? 290 : sculpture.config.y,
                  x: isCurrentActive(sculpture) ? 350 : isAnyCardActive() ? 140 + sculpture.config.x * 0.6 : sculpture.config.x,
                  rotate: isCurrentActive(sculpture) ? 0 : isAnyCardActive() ? sculpture.config.rotate * 0.5 : sculpture.config.rotate,
                  scale: isCurrentActive(sculpture) ? 1 : isAnyCardActive() ? 0.5 : 1,
                  width: isCurrentActive(sculpture) ? 320 : 280,
                  height: isCurrentActive(sculpture) ? 400 : 380,
                  // zIndex: isCurrentActive(sculpture) ? 50 : 1 + i,
                }}
                whileHover={{
                  scale: isCurrentActive(sculpture) ? 1 : isAnyCardActive() ? 0.55 : 1.05,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}

                style={{
                  zIndex: active?.config.zIndex,
                }}
                onClick={() => setActive(sculpture)}

              >
                {/* Background Accent
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${sculpture.accent}, transparent)` }}
                /> */}

                <div className="relative z-10 ">
                  <ClientModelPreview path={sculpture.modelPath} />
                  <div className="text-left mt-6">
                    <h3 className="text-3xl font-serif text-white mb-2">
                      {sculpture.title}
                    </h3>
                    <AnimatePresence mode="popLayout">
                      {isCurrentActive(sculpture) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                          }}
                          className="pt-4 border-t border-white/5"
                        >
                          <p className="text-sm text-zinc-400 uppercase tracking-widest">{sculpture.location}</p>
                          <p className="text-xs text-zinc-500 mt-2 font-mono">{sculpture.year}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Corner Accents */}
                {/* <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}

                {/* Border Highlight */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-4xl transition-all duration-500 pointer-events-none" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

