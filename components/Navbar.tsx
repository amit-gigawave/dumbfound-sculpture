"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import GooeyNav from "./GooeyNav";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300",
        isScrolled
          ? "bg-black border-b border-white/10 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a
          href="#home"
          className="cursor-target mix-blend-difference text-2xl font-bold tracking-tighter text-white"
        >
          DUMBFOUND
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <GooeyNav
            items={navLinks}
            particleCount={42}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={400}
            timeVariance={600}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        {/* Mobile Toggle */}
        <button
          className="cursor-target text-white mix-blend-difference md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 flex w-full flex-col items-center gap-6 border-b border-white/10 bg-black/95 py-6 text-white backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="cursor-target text-lg font-medium text-zinc-300 hover:text-white transition-colors tracking-widest uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
