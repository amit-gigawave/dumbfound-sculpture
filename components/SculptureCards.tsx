"use client";

import dynamic from "next/dynamic";
import FadeContent from "./FadeContent";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGLTF } from "@react-three/drei";
import Silk from "./Silk";

const SculptureScene = dynamic(() => import("./SculptureScene"), { ssr: false });
const ScrollFloat = dynamic(() => import("./ScrollFloat"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        id: 1,
        title: "Angel Sculpture",
        description: "A ethereal representation of celestial form, captured in digital marble.",
        modelUrl: "/sculptures/angel_sculpture.glb",
        accent: "#f4f0e8",
        offsetY: -0.1,
        offsetX: 0,
        defaultZoom: 2,
    },
    {
        id: 2,
        title: "Vishnu Fragment",
        description: "Ancient heritage meets modern preservation. A fragment of a doorframe representing Vishnu.",
        modelUrl: "/sculptures/fragment_of_a_doorframe_representing_vishnu.glb",
        accent: "#8ea4ff",
        offsetY: 0,
        offsetX: 0,
        defaultZoom: 3,
    },
    {
        id: 3,
        title: "Hindu Deity",
        description: "Intricate details of a Hindu god, preserved in high-fidelity 3D.",
        modelUrl: "/sculptures/hindu_god.glb",
        accent: "#62d4c8",
        offsetY: 0,
        offsetX: 0,
        defaultZoom: 2.2,
    },
    {
        id: 4,
        title: "Madona",
        description: "Classical sculpture of Madona, emphasizing grace and fluid silhouettes.",
        modelUrl: "/sculptures/madona_sculpture.glb",
        accent: "#ff8d76",
        offsetY: -0.1,
        offsetX: 0,
        defaultZoom: 2.2,
    },
    {
        id: 5,
        title: "Roza Loewenfeld",
        description: "Bust of Roza Loewenfeld, showcasing the delicate balance of light and shadow on form.",
        modelUrl: "/sculptures/sculpture_bust_of_roza_loewenfeld.glb",
        accent: "#a78bfa",
        offsetY: 0,
        offsetX: 0,
        defaultZoom: 2.2,
    },
    {
        id: 6,
        title: "Shiva Nataraja",
        description: "The cosmic dancer, Shiva Nataraja, represented in dynamic 3D bronze.",
        modelUrl: "/sculptures/shiva_nataraja.glb",
        accent: "#facc15",
        offsetY: 0,
        offsetX: 0,
        defaultZoom: 2.8,
    },
];

const SculptureCardItem = ({ card, index }: { card: typeof cards[0]; index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.1, rootMargin: '20% 0px' });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Alternate sides for a more dynamic "one-by-one" feel
    const isEven = index % 2 === 0;

    return (
        <div ref={ref} className=" w-full h-screen flex flex-col items-center justify-center">
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
                {/* Text Section */}
                <FadeContent
                    blur={true}
                    duration={1500}
                    ease="power4.out"
                    threshold={0.5}
                    yOffset={80}
                    className={`flex-1 space-y-6 px-6 lg:px-0 text-center lg:text-left ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                        <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: card.accent }}
                        />
                        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">
                            Specimen {card.id.toString().padStart(2, '0')}
                        </span>
                    </div>
                    <h3 className="text-4xl lg:text-7xl font-display uppercase tracking-[-0.03em] text-white">
                        {card.title}
                    </h3>
                    <p className="max-w-md mx-auto lg:mx-0 text-base lg:text-lg leading-relaxed text-white/50">
                        {card.description}
                    </p>
                    <div className="pt-4">
                        <button className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors border-b border-white/10 pb-1">
                            Explore Details
                        </button>
                    </div>
                </FadeContent>

                {/* 3D Model Section */}
                <FadeContent
                    blur={true}
                    duration={1800}
                    delay={200}
                    threshold={0.5}
                    yOffset={80}
                    className={`flex-1 cursor-target w-full h-[500px] lg:h-[700px] relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                >
                    {isVisible && (
                        <SculptureScene
                            url={card.modelUrl}
                            offsetX={card.offsetX}
                            offsetY={card.offsetY}
                            defaultZoom={card.defaultZoom}
                        />
                    )}
                </FadeContent>
            </div>
        </div>
    );
};

const SculptureCards = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            cards.forEach(c => {
                try {
                    useGLTF.preload(c.modelUrl);
                } catch (e) { }
            });
        }
    }, []);

    return (
        <section ref={sectionRef} className="relative  z-10 w-full" id="collection">

            {/* <div className="absolute inset-x-0 opacity-50 top-0 h-full z-0 pointer-events-none overflow-hidden">
                <Silk
                    speed={5}
                    scale={1}
                    color="#7B7481"
                    noiseIntensity={1.5}
                    rotation={0}
                />
            </div> */}

            <div className="mx-auto max-w-7xl relative z-10">
                <div className="mb-24 px-4 text-center">
                    <p className="text-[10px] uppercase tracking-[0.42em] text-white/42 mb-4">
                        Curated Collection
                    </p>
                    <ScrollFloat
                        animationDuration={1.2}
                        ease="back.inOut(2)"
                        stagger={0.03}
                        containerClassName="text-center"
                        textClassName="font-display block text-4xl font-semibold uppercase tracking-[-0.05em] text-white sm:text-5xl lg:text-[5.4rem]"
                    >
                        Sculptural Masterpieces
                    </ScrollFloat>
                </div>

                <div className="flex flex-col pb-64">
                    {cards.map((card, index) => (
                        <SculptureCardItem key={card.id} card={card} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SculptureCards;