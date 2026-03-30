"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Optimized SequenceCanvas
 * Background sequence tied to the entire page's scroll progress.
 */
const SequenceCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameRef = useRef({ index: 0 });

  // CONFIGURATION
  const TOTAL_ASSET_FRAMES = 88;
  const SKIP_FACTOR = 1; 
  const EFFECTIVE_FRAME_COUNT = Math.ceil(TOTAL_ASSET_FRAMES / SKIP_FACTOR);
  const FRAME_PATH = "/sequence/ezgif-frame-";
  const FRAME_EXT = "jpg";

  // Preloading optimized images
  const preloadImages = useCallback(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_ASSET_FRAMES; i += SKIP_FACTOR) {
        const img = new Image();
        const frameNum = i.toString().padStart(3, "0");
        img.src = `${FRAME_PATH}${frameNum}.${FRAME_EXT}`;
        
        img.onload = () => {
            loadedCount++;
            const pct = Math.round((loadedCount / EFFECTIVE_FRAME_COUNT) * 100);
            setProgress(pct);
            
            if (loadedCount === EFFECTIVE_FRAME_COUNT) {
                setImages(loadedImages);
                setIsLoaded(true);
                // Initial paint
                requestAnimationFrame(() => renderFrame(0, loadedImages));
            }
        };
        
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === EFFECTIVE_FRAME_COUNT) {
                setImages(loadedImages);
                setIsLoaded(true);
            }
        };
        
        // Store in order
        const index = Math.floor((i - 1) / SKIP_FACTOR);
        loadedImages[index] = img;
    }
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // High-performance "Object-Fit: Cover" render
  const renderFrame = useCallback((index: number, imagesArray: HTMLImageElement[] = images) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Fallback to state if imagesArray not provided
    const sourceArr = imagesArray.length > 0 ? imagesArray : images;
    const img = sourceArr[index];
    if (!img || !img.complete) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // Disable alpha for better performance
    if (!ctx) return;
    
    // Canvas dimensions
    const cw = canvas.width;
    const ch = canvas.height;
    
    const imgAspect = img.width / img.height;
    const canvasAspect = cw / ch;

    let dw, dh, dx, dy;

    if (canvasAspect > imgAspect) {
        dw = cw;
        dh = cw / imgAspect;
        dx = 0;
        dy = (ch - dh) / 2;
    } else {
        dh = ch;
        dw = ch * imgAspect;
        dx = (cw - dw) / 2;
        dy = 0;
    }

    ctx.drawImage(img, dx, dy, dw, dh);
  }, [images]);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderFrame(Math.floor(frameRef.current.index));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // ... (preloading and rendering logic stays the same)

  // GSAP Scroll Binding - Global
  useGSAP(() => {
    if (!isLoaded || images.length === 0) return;

    // 1. Scrubbing the frames
    ScrollTrigger.create({
        trigger: "#sequence-trigger",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
            const index = Math.floor(self.progress * (EFFECTIVE_FRAME_COUNT - 1));
            if (frameRef.current.index !== index) {
                frameRef.current.index = index;
                renderFrame(index);
            }
        }
    });

    // 2. Visibility Control (True Fixed Background)
    gsap.set(bgRef.current, { opacity: 0 });
    
    ScrollTrigger.create({
        trigger: "#sequence-trigger",
        start: "top 80%", // Start fading in a bit before
        end: "bottom 20%", // Start fading out near the end
        onToggle: (self) => {
            gsap.to(bgRef.current, {
                opacity: self.isActive ? 1 : 0,
                duration: 0.8,
                ease: "power2.inOut"
            });
        }
    });

  }, [isLoaded, images, renderFrame]);

  return (
    <>
        {/* Fixed Background (True fixed, visibility managed by GSAP) */}
        <div 
            ref={bgRef}
            className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-black"
        >
            <canvas 
                ref={canvasRef} 
                className="w-full h-full block"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Loading overlay - only visible during init */}
        {!isLoaded && (
            <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black transition-opacity duration-700">
                <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
                    <div 
                        className="h-full bg-white transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-white/30 text-[9px] uppercase tracking-[0.5em]">
                    Syncing Atmosphere — {progress}%
                </p>
            </div>
        )}
    </>
  );
};

export default SequenceCanvas;
