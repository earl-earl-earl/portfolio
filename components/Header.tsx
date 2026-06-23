"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";

const navLinks = [
  { name: "Intro", href: "#intro" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "Connect", href: "#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-md border-b border-border/40 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Page Logo / Actual SVG Logo with Hover Animation */}
          <a href="#intro" className="flex items-center gap-2">
            <motion.div
              className="cursor-pointer flex items-center justify-center relative w-8 h-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/images/logos/page-logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </motion.div>
          </a>

          {/* Navigation Links with Shared Layout Pill Transition */}
          <nav className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {hoveredLink === link.name && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-white/5 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </nav>

          {/* Resume / Contact CTA Button */}
          <div className="flex items-center gap-4">
            <motion.a
              href="/files/RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-accent-cyan text-neutral-950 shadow-[0_4px_20px_rgba(6,182,212,0.2)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all duration-300 group"
            >
              <span className="flex items-center gap-1.5 font-bold">
                Resume
                <FiArrowUpRight size={13} className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-17.5 z-40 bg-background/95 backdrop-blur-lg border-b border-border/40 md:hidden flex flex-col items-center justify-center gap-8 p-6"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <motion.a
              href="/files/RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold tracking-wider uppercase bg-accent-cyan text-neutral-950 w-full max-w-50 shadow-[0_4px_20px_rgba(6,182,212,0.2)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all duration-300 group"
            >
              <span className="flex items-center gap-1.5 font-bold">
                Resume
                <FiArrowUpRight size={15} className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

