"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowRight, 
  FiMail, 
  FiCheckCircle,
  FiZap,
  FiActivity,
  FiBox,
  FiGithub,
  FiLinkedin
} from "react-icons/fi";
import { FaFileCode, FaGithub, FaLinkedin } from "react-icons/fa6";
import Header from "@/components/Header";
import AcademicTimeline from "@/components/AcademicTimeline";
import SkillsGrid from "@/components/SkillsGrid";
import ProjectCard, { Project } from "@/components/ProjectCard";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false,
});


const roles = [
  "Full-Stack Developer",
  "Software Engineer",
  "Mobile App Developer",
  "Web Developer",
  "AI/ML Engineer",
  "UI/UX Designer"
];

const projectsData: Project[] = [
  {
    title: "AetherAI Orchestrator",
    description: "A secure, multi-agent LLM orchestration system that coordinates isolated Docker-based execution nodes to complete complex coding and analysis tasks.",
    longDescription: `Designed and built a multi-agent backend orchestrator leveraging LangChain and FastAPI.
    
    Key Achievements:
    • Implemented full Sandboxed Execution using Docker containers, preventing arbitrary code escape.
    • Decreased processing latency by 32% via parallel processing pipelines and custom event brokers.
    • Built a beautiful responsive control panel in Next.js with WebSockets for real-time trace viewing.`,
    icon: "Cpu",
    tags: ["Next.js", "FastAPI", "LangChain", "Docker", "WebSockets"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    metrics: [
      { label: "Latency Red.", value: "-32%" },
      { label: "Agents", value: "8 Active" },
      { label: "Sandbox", value: "Docker" }
    ],
    mockupGrad: "from-cyan-950/40 via-slate-900/60 to-indigo-950/40"
  },
  {
    title: "Zenith DB",
    description: "An offline-first, light-weight, transactional key-value store optimized for mobile devices and embedded devices with a Wasm compilation target.",
    longDescription: `Developed a robust transactional database from scratch using Rust.
    
    Key Achievements:
    • Implemented ACID transactions with Write-Ahead Logging (WAL) for absolute crash safety.
    • Built WebAssembly bindings enabling offline storage synchronization inside client browsers.
    • Wrote custom Swift and Kotlin bindings to allow native mobile platform integrations.`,
    icon: "Server",
    tags: ["Rust", "WebAssembly", "Swift", "Kotlin", "Embedded"],
    githubUrl: "https://github.com",
    metrics: [
      { label: "Sync Speed", value: "<15ms" },
      { label: "Footprint", value: "1.2MB" },
      { label: "ACID", value: "Full WAL" }
    ],
    mockupGrad: "from-indigo-950/40 via-zinc-900/70 to-purple-950/40"
  },
  {
    title: "Novastream Engine",
    description: "A real-time media streaming and translation microservice that processes live WebRTC video streams and applies AI overlays and captions on the fly.",
    longDescription: `Architected a high-throughput video processing node written in Go.
    
    Key Achievements:
    • Integrated WebRTC stream ingestion and GPU-accelerated transcoding pipelines.
    • Applied real-time whisper-based subtitling with less than 250ms of audio latency overhead.
    • Integrated Redis pub-sub systems to scale video relay servers horizontally across 3 nodes.`,
    icon: "Shield",
    tags: ["Go", "WebRTC", "Redis", "FFmpeg", "GPU Compute"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    metrics: [
      { label: "Relay Latency", value: "<250ms" },
      { label: "Throughput", value: "4K 60fps" },
      { label: "Scalability", value: "Redis Pub/Sub" }
    ],
    mockupGrad: "from-emerald-950/40 via-stone-900/60 to-cyan-950/40"
  }
];

export default function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  
  // States for simple mock visual validation on submit
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });


  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(roleTimer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // TODO: Integrate functional email service (e.g. Web3Forms or EmailJS) when backend services are ready.
    setIsSubmitSuccessful(true);
    setTimeout(() => {
      setIsSubmitSuccessful(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent-cyan/20 selection:text-accent-cyan">
      <Header />

      {/* Hero Section */}
      <section 
        id="intro" 
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20 px-6 md:px-12 max-w-[1400px] mx-auto w-full"
      >
        {/* Glow ambient background assets */}
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-accent-indigo/5 blur-[120px] pointer-events-none" />

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center z-10">
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-clash font-extrabold text-foreground tracking-tight select-none">
                Hello, I&apos;m <span className="bg-gradient-to-r from-accent-cyan to-accent-indigo bg-clip-text text-transparent">Earl</span>!
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-clash font-medium text-muted-foreground flex items-center gap-x-3 gap-y-1 whitespace-nowrap">
                <span>I am a</span>
                <span className="relative inline-flex items-center overflow-hidden min-h-[1.2em] min-w-[320px] sm:min-w-[500px] md:min-w-[600px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roles[roleIndex]}
                      initial={{ y: 25, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -25, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute left-0 top-0 bottom-0 flex items-center bg-gradient-to-r from-accent-cyan to-accent-indigo bg-clip-text text-transparent font-semibold whitespace-nowrap"
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed font-normal"
            >
              Specializing in end-to-end architectures, I design and build high-performance backend systems, secure APIs, and intelligent applications. I bridge the gap between complex data logic and user-centric design to deliver scalable, secure, and modern digital solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4 pt-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide bg-accent-cyan text-black hover:opacity-95 shadow-[0_4px_20px_rgba(6,182,212,0.25)] transition-all duration-300 group"
              >
                View My Works 
                <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border bg-white/[0.02] hover:bg-white/[0.05] hover:border-muted-foreground/40 transition-all duration-300 text-muted-foreground hover:text-foreground"
                aria-label="GitHub Profile"
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border bg-white/[0.02] hover:bg-white/[0.05] hover:border-muted-foreground/40 transition-all duration-300 text-muted-foreground hover:text-foreground"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={20} />
              </motion.a>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 flex justify-center items-center w-full relative"
          >
            <HeroCanvas />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="py-24 px-6 max-w-6xl mx-auto w-full space-y-16 border-t border-border/20"
      >
        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest text-accent-indigo uppercase">
            01 / Profile Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-clash font-bold tracking-tight">
            Academic Track & Tooling Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Timeline Column */}
          <div className="space-y-8">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border/30 pb-2">
              Education & Milestones
            </h3>
            <AcademicTimeline />
          </div>

          {/* Tooling Column */}
          <div className="space-y-8">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border/30 pb-2">
              Technical Arsenal
            </h3>
            <SkillsGrid />
          </div>
        </div>
      </section>


      {/* Engineered Works Showcase */}
      <section 
        id="projects" 
        className="py-24 px-6 max-w-6xl mx-auto w-full space-y-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-widest text-accent-cyan uppercase">
              02 / Showcase Registry
            </span>
            <h2 className="text-3xl sm:text-4xl font-clash font-bold tracking-tight">
              Selected Engineered Works
            </h2>
          </div>
          <span className="text-xs font-mono text-muted-foreground/60 hidden sm:block">
            Hover to view interactives // Click accordion for depth
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section 
        id="philosophy" 
        className="py-24 px-6 max-w-6xl mx-auto w-full space-y-16 border-t border-border/20"
      >
        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest text-accent-indigo uppercase">
            03 / System Mindset
          </span>
          <h2 className="text-3xl sm:text-4xl font-clash font-bold tracking-tight">
            Development & Optimization Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4 bg-white/[0.01]"
          >
            <div className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan w-fit">
              <FiZap size={20} />
            </div>
            <h3 className="text-lg font-clash font-semibold text-foreground">
              Performance Ethos
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If it isn&apos;t fast, it isn&apos;t complete. I design to minimize time-to-first-byte (TTFB), optimize bundles, and audit cache policies to ensure applications render instantly.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4 bg-white/[0.01]"
          >
            <div className="p-2.5 rounded-xl bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo w-fit">
              <FiActivity size={20} />
            </div>
            <h3 className="text-lg font-clash font-semibold text-foreground">
              Decoupled Architecture
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Maintaining isolated components and structured interfaces. Separation of concerns between backend engines and client presentation models ensures robust scalability.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4 bg-white/[0.01]"
          >
            <div className="p-2.5 rounded-xl bg-white/[0.05] border border-border w-fit text-foreground">
              <FiBox size={20} />
            </div>
            <h3 className="text-lg font-clash font-semibold text-foreground">
              Lightweight Footprint
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Strict package hygiene. Avoiding unnecessary wrappers and frameworks to minimize build outputs and prevent third-party security vulnerabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="py-24 px-6 max-w-4xl mx-auto w-full space-y-12 border-t border-border/20"
      >
        <div className="space-y-4 text-center">
          <span className="text-xs font-mono tracking-widest text-accent-cyan uppercase">
            04 / Dialogue Portal
          </span>
          <h2 className="text-3xl sm:text-4xl font-clash font-bold tracking-tight">
            Construct Something Exceptional
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            I am always open to discussing new software architectures, open-source projects, or engineering opportunities.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-6 sm:p-10 rounded-3xl border border-border/40 bg-white/[0.01] relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSubmitSuccessful ? (
              <motion.form 
                key="contact-form"
                onSubmit={handleFormSubmit} 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono text-muted-foreground">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-white/[0.02] border border-border/60 hover:border-border focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/30 rounded-xl px-4 py-3 text-sm transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono text-muted-foreground">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-white/[0.02] border border-border/60 hover:border-border focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/30 rounded-xl px-4 py-3 text-sm transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-muted-foreground">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Earl, let's collaborate on..."
                    className="w-full bg-white/[0.02] border border-border/60 hover:border-border focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/30 rounded-xl px-4 py-3 text-sm transition-all outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-[10px] font-mono text-muted-foreground/60 text-center sm:text-left">
                    {"// Frontend-ready. Action triggers visual confirmation modal."}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/20 hover:border-accent-cyan/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 cursor-pointer"
                  >
                    Send Message
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="p-3 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan animate-bounce">
                  <FiCheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-clash font-semibold text-foreground">
                  Message Synthesized
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                  Thank you! Your message has been simulated successfully. I will align on integrations later.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-auto py-8 px-6 border-t border-border/20 bg-black/40">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} EARL JOHN</span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <FaFileCode size={12} />
              Obsidian Core
            </span>
          </div>

          {/* Social graph anchors */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <FiGithub className="w-[18px] h-[18px]" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin className="w-[18px] h-[18px]" />
            </a>
            <a 
              href="mailto:earl@example.com" 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Send Email"
            >
              <FiMail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
