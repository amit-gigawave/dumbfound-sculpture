"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
    text: string;
    className?: string;
}

export default function PremiumButton({ text = "Explore Work", className = "" }: Props) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const textCopyRef = useRef<HTMLSpanElement>(null);

    // 1. Magnetic Effect Logic
    useGSAP(() => {
        const button = buttonRef.current;
        if (!button) return;

        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { width, height, left, top } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Sensitivity: 0.5 means it moves half the distance of the mouse
            xTo(x * 0.5);
            yTo(y * 0.5);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // 2. Hover Interaction (Fill & Text Slide)
    const { contextSafe } = useGSAP({ scope: buttonRef });

    const onMouseEnter = contextSafe(() => {
        // Fill animation
        gsap.to(fillRef.current, {
            y: "0%",
            duration: 0.6,
            ease: "power4.inOut",
        });

        // Main text slides up and out
        gsap.to(textRef.current, {
            y: "-150%",
            duration: 0.6,
            ease: "power4.inOut",
        });

        // Secondary text slides up from bottom
        gsap.fromTo(
            textCopyRef.current,
            { y: "150%" },
            { y: "0%", duration: 0.6, ease: "power4.inOut" }
        );
    });

    const onMouseLeave = contextSafe(() => {
        gsap.to(fillRef.current, {
            y: "-100%",
            duration: 0.6,
            ease: "power4.inOut",
        });

        gsap.to(textRef.current, {
            y: "0%",
            duration: 0.6,
            ease: "power4.inOut",
        });

        gsap.to(textCopyRef.current, {
            y: "150%",
            duration: 0.6,
            ease: "power4.inOut",
        });
    });

    return (
        <button
            ref={buttonRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`
        relative group overflow-hidden
        px-10 py-5 rounded-full
        border border-white/20
        bg-transparent transition-colors duration-500
        hover:border-white
        ${className}
      `}
            style={{ isolation: "isolate" }}
        >
            {/* Liquid Fill Background */}
            <div
                ref={fillRef}
                className="absolute inset-0 w-full h-full bg-white -z-10 -translate-y-[100%]"
                style={{ borderRadius: "50% 50% 0 0" }}
            />

            {/* Text Container */}
            <div className="relative overflow-hidden flex flex-col items-center">
                <span
                    ref={textRef}
                    className="block text-white group-hover:text-black transition-colors duration-300 uppercase tracking-[0.2em] text-xs font-medium"
                >
                    {text}
                </span>

                {/* Hidden text for the slide-up effect */}
                <span
                    ref={textCopyRef}
                    className="absolute block text-black uppercase tracking-[0.2em] text-xs font-medium translate-y-[150%]"
                >
                    {text}
                </span>
            </div>
        </button>
    );
}