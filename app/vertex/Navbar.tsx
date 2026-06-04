"use client";
import MobileMenu from "@/components/MobileMenu";
import { Menu } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className=" fixed px-2 top-0 left-0 w-full flex justify-between items-center z-50 pt-2! pointer-events-none">
      <div className="logo-container">
        <div className="logo-placeholder">
          <div className="logo-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="4" fill="white" fillOpacity="0.8" />
              <circle cx="16" cy="8" r="4" fill="white" fillOpacity="0.8" />
              <circle cx="8" cy="16" r="4" fill="white" fillOpacity="0.8" />
              <circle cx="16" cy="16" r="4" fill="white" fillOpacity="0.8" />
            </svg>
          </div>
          <span className="brand-name">
            <a href="">Dumbfound</a>
          </span>
        </div>
      </div>

      <div className="nav-main glass pill">
        <div className="nav-links  pr-4">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>
        {/* <button className="login-btn pill">Login</button> */}

        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white transition-colors hover:bg-white/20"
        >
          <Menu size={22} />
        </button>
      </div>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
      />
    </nav>
  );
};

export default Navbar;
