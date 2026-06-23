"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowRight, 
  FiMail, 
  FiCheckCircle,
  FiZap,
  FiActivity,
  FiBox,
  FiUser,
  FiMessageSquare
} from "react-icons/fi";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { RiNextjsFill } from "react-icons/ri";
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
    title: "InsureVis",
    description: "An AI-powered insurance claims platform spanning mobile, web, and ML infrastructure, enabling automated damage assessment and multi-role verification workflows.",
    longDescription: `MOBILE APPLICATION (Flutter):
    • Real-time AI damage detection with confidence scoring (75%+ accuracy).
    • Smart camera system with live AI overlay for guided photo capture.
    • Offline-first architecture with automatic cloud synchronization.
    
    WEB PORTAL (Node.js/Express):
    • Multi-role verification system (Admin, Car Co, Insurance Co) with Supabase integration.
    • Real-time document upload, review, and approval workflows.
    • Comprehensive audit trail logging for security compliance.
    
    ML/CV API (Flask):
    • Detectron2 models for vehicle part and damage segmentation.
    • Concurrent inference using ONNX Runtime with thread-safe serving.`,
    icon: "Shield",
    tags: ["Flutter", "Node.js", "Flask", "Detectron2", "Supabase"],
    githubUrl: "https://github.com",
    githubLinks: [
      { label: "Mobile App (Flutter)", url: "https://github.com/earl-earl-earl/insurevis-mobile-app" },
      { label: "Web Portal (Express)", url: "https://github.com/earl-earl-earl/insurevis-web-portal" },
      { label: "ML/CV API (Flask)", url: "https://github.com/earl-john-rafael/insurevis-model-api" }
    ],
    liveUrl: "https://insurevis-web-portal.vercel.app/",
    liveLinks: [
      { label: "Mobile App Demo", url: "https://drive.google.com/drive/folders/11rMNHBWA0YmkEhJ5nkBPByA6KXDUd4Cr" },
      { label: "Web Portal Preview", url: "https://insurevis-web-portal.vercel.app/" }
    ],
    imageUrl: "https://placehold.co/600x400/09090b/a1a1aa?text=Image+Placeholder",
    metrics: [
      { label: "AI Accuracy", value: "75%+" },
      { label: "Components", value: "3 Parts" },
      { label: "Code Quality", value: "85%" }
    ],
    mockupGrad: "from-blue-950/40 via-slate-900/60 to-cyan-950/40"
  },
  {
    title: "NPS Survey & Analytics System",
    description: "Enterprise-grade customer feedback platform built for Grand Canyon and 15+ branch locations. Automates NPS survey distribution via smart messaging channels with real-time analytics dashboards.",
    longDescription: `NPS SURVEY SYSTEM:
    • Custom NPS survey platform serving Grand Canyon headquarters and 15+ branches.
    • Multi-channel survey distribution using Email (Mailchimp) and conversational 2-way SMS.
    • Automated 3-SMS conversational flow with 24-hour auto-close timeouts.
    
    DASHBOARDS & ANALYTICS:
    • Real-time branch-level and global analytics dashboards with multi-dimensional filtering.
    • Role-based access control system (Admin, Supervisor, Branch Manager, Staff).
    • Secure PDF export functionality and CSV/XLSX data import/export systems.`,
    icon: "Activity",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "Mailchimp", "SMS Integration"],
    githubUrl: "https://github.com",
    imageUrl: "https://placehold.co/600x400/09090b/a1a1aa?text=Image+Placeholder",
    metrics: [
      { label: "Branch Coverage", value: "15+" },
      { label: "Analytics", value: "Real-time" },
      { label: "Distribution", value: "Multi-ch." }
    ],
    mockupGrad: "from-blue-950/40 via-slate-900/60 to-emerald-950/40",
    isPrivate: true
  },
  {
    title: "BebeCare",
    description: "A cross-platform nanny booking platform connecting parents with vetted childcare providers, featuring real-time chat, escrow payments, and location-based discovery.",
    longDescription: `PLATFORM ARCHITECTURE:
    • Cross-platform MVP (Android, iOS, Web) built with Expo and Next.js.
    • Closed-loop virtual wallet with PayMongo integration and centavos-based ledger.
    • Location-based nanny discovery with radius filtering and availability slots.
    
    CORE SYSTEMS & SECURITY:
    • RBAC system (Parent, Nanny, Admin) with Supabase Auth and RLS policies.
    • Secure payment architecture using atomic transactions for split bookings.
    • Admin dashboard featuring Recharts analytics, nanny approvals, and calendar views.`,
    icon: "Activity",
    tags: ["Next.js", "Expo", "Supabase", "TypeScript", "PayMongo"],
    githubUrl: "https://github.com",
    imageUrl: "https://placehold.co/600x400/09090b/a1a1aa?text=Image+Placeholder",
    metrics: [
      { label: "Tx Logic", value: "Atomic" },
      { label: "Sections", value: "5+ Areas" },
      { label: "User Roles", value: "3 Roles" }
    ],
    mockupGrad: "from-teal-950/40 via-stone-900/60 to-rose-950/40",
    isPrivate: true
  },
  {
    title: "verifAI (In Development)",
    description: "An AI-powered fact-checking platform that scrapes trusted news outlets, processes claim evidence via Gemini AI, and streams verdicts with cited sources in real time.",
    longDescription: `SYSTEM ARCHITECTURE:
    • Real-time fact-checking system leveraging FastAPI, Server-Sent Events, and WebSockets.
    • Headless browser scraper worker built with Playwright to query trusted news outlets.
    • Decision engine using Gemini AI (gemini-1.5-flash) to evaluate claims against evidence.
    
    INFRASTRUCTURE & DEPLOYMENT:
    • Redis-backed async job queue and TTL cache for status streaming updates.
    • Self-hosted MongoDB database deployed on Google Compute Engine.
    • Monorepo setup with Turborepo, shared type libraries, and automated CI/CD.`,
    icon: "Cpu",
    tags: ["FastAPI", "Gemini AI", "Playwright", "Redis", "MongoDB"],
    imageUrl: "https://placehold.co/600x400/09090b/a1a1aa?text=Image+Placeholder",
    metrics: [
      { label: "Status", value: "Ongoing" },
      { label: "Engine", value: "Gemini AI" },
      { label: "Pipeline", value: "Async Jobs" }
    ],
    mockupGrad: "from-slate-950/40 via-neutral-900/60 to-zinc-950/40"
  }
];

export default function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLogs, setSubmitLogs] = useState<string[]>([]);
  
  // States for simple mock visual validation on submit
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });


  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(roleTimer);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setSubmitLogs(["Initializing secure dialogue gateway..."]);
    
    const logs = [
      "Resolving handshakes with developer node...",
      "Packet structure verified (name, email, message)",
      "Applying aes-256 client-side simulation payload...",
      "Dispatching encrypted payload to dev stream...",
      "Connection verified. Status: 200 OK"
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200));
      setSubmitLogs((prev) => [...prev, logs[i]]);
    }
    
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsSubmitSuccessful(true);
    setIsSubmitting(false);
    
    setTimeout(() => {
      setIsSubmitSuccessful(false);
      setFormData({ name: "", email: "", message: "" });
      setSubmitLogs([]);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent-cyan/20 selection:text-accent-cyan">
      <Header />

      {/* Hero Section */}
      <section 
        id="intro" 
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20 px-6 md:px-12 max-w-350 mx-auto w-full"
      >
        {/* Glow ambient background assets */}
        <div className="absolute top-[20%] left-[10%] w-75 h-75 rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-75 h-75 rounded-full bg-accent-indigo/5 blur-[120px] pointer-events-none" />

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center z-10">
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-clash font-extrabold text-foreground tracking-tight select-none">
                Hello, I&apos;m <span className="bg-linear-to-r from-accent-cyan to-accent-indigo bg-clip-text text-transparent">Earl</span>!
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-clash font-medium text-muted-foreground flex items-center gap-x-3 gap-y-1 whitespace-nowrap">
                <span>I am a</span>
                <span className="relative inline-flex items-center overflow-hidden min-h-[1.2em] min-w-[320px] sm:min-w-125 md:min-w-150">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roles[roleIndex]}
                      initial={{ y: 25, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -25, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute left-0 top-0 bottom-0 flex items-center bg-linear-to-r from-accent-cyan to-accent-indigo bg-clip-text text-transparent font-semibold whitespace-nowrap"
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
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border bg-white/2 hover:bg-white/5 hover:border-muted-foreground/40 transition-all duration-300 text-muted-foreground hover:text-foreground"
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
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border bg-white/2 hover:bg-white/5 hover:border-muted-foreground/40 transition-all duration-300 text-muted-foreground hover:text-foreground"
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
              Education
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

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
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
            className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4 bg-white/1"
          >
            <div className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan w-fit">
              <FiZap size={20} />
            </div>
            <h3 className="text-lg font-clash font-semibold text-foreground">
              Distributed Ecosystems
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Avoiding monolithic bottlenecks. I focus on orchestrating decoupled architectures—building optimized, independent layers across web dashboards, mobile clients, and central backend API gateways to ensure seamless state synchronization and long-term maintainability.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4 bg-white/1"
          >
            <div className="p-2.5 rounded-xl bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo w-fit">
              <FiActivity size={20} />
            </div>
            <h3 className="text-lg font-clash font-semibold text-foreground">
              Intelligent Engineering
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Going beyond basic database storage. My development process prioritizes integrating advanced utility—whether that means implementing complex backend data cross-matching algorithms or deploying cloud-hosted computer vision pipelines to solve high-impact, real-world problems.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4 bg-white/1"
          >
            <div className="p-2.5 rounded-xl bg-white/5 border border-border w-fit text-foreground">
              <FiBox size={20} />
            </div>
            <h3 className="text-lg font-clash font-semibold text-foreground">
              Production-First Mindset
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Strict adherence to open-source tool optimization, performance tuning, and database hardening. I build with an explicit focus on secure transactions, fast response times, and clean, responsive UI configurations that render perfectly on any device.
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
          className="glass-panel p-6 sm:p-10 rounded-3xl border border-border/40 bg-white/1 relative overflow-hidden"
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
                  {/* Name field */}
                  <div className="relative group space-y-2">
                    <label htmlFor="name" className="text-xs font-mono text-muted-foreground group-focus-within:text-accent-cyan transition-colors flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-muted-foreground group-focus-within:bg-accent-cyan rounded-full transition-colors" />
                      01 / Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent-cyan transition-colors">
                        <FiUser size={16} />
                      </div>
                      <input
                        type="text"
                        id="name"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full bg-white/1 border border-border/40 hover:border-border/80 focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/20 rounded-xl pl-10 pr-4 py-3 text-sm transition-all outline-none disabled:opacity-50"
                      />
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-focus-within:border-accent-cyan/40 rounded-tl-xl transition-all" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-focus-within:border-accent-cyan/40 rounded-br-xl transition-all" />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="relative group space-y-2">
                    <label htmlFor="email" className="text-xs font-mono text-muted-foreground group-focus-within:text-accent-cyan transition-colors flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-muted-foreground group-focus-within:bg-accent-cyan rounded-full transition-colors" />
                      02 / Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent-cyan transition-colors">
                        <FiMail size={16} />
                      </div>
                      <input
                        type="email"
                        id="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full bg-white/1 border border-border/40 hover:border-border/80 focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/20 rounded-xl pl-10 pr-4 py-3 text-sm transition-all outline-none disabled:opacity-50"
                      />
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-focus-within:border-accent-cyan/40 rounded-tl-xl transition-all" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-focus-within:border-accent-cyan/40 rounded-br-xl transition-all" />
                    </div>
                  </div>
                </div>

                {/* Message field */}
                <div className="relative group space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-muted-foreground group-focus-within:text-accent-cyan transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-muted-foreground group-focus-within:bg-accent-cyan rounded-full transition-colors" />
                    03 / Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent-cyan transition-colors">
                      <FiMessageSquare size={16} />
                    </div>
                    <textarea
                      id="message"
                      required
                      disabled={isSubmitting}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Earl, let's collaborate on..."
                      className="w-full bg-white/1 border border-border/40 hover:border-border/80 focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/20 rounded-xl pl-10 pr-4 py-3 text-sm transition-all outline-none resize-none disabled:opacity-50"
                    />
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-focus-within:border-accent-cyan/40 rounded-tl-xl transition-all" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-focus-within:border-accent-cyan/40 rounded-br-xl transition-all" />
                  </div>
                </div>

                {/* Controls and Submission status */}
                <div className="flex justify-end pt-4 border-t border-border/20">
                  <motion.button
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-300 cursor-pointer flex items-center justify-center gap-2
                      ${isSubmitting 
                        ? "bg-muted/10 border-muted/30 text-muted-foreground/50 cursor-not-allowed" 
                        : "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/20 hover:border-accent-cyan/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-muted-foreground/30 border-t-accent-cyan rounded-full animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FiArrowRight size={14} />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 flex flex-col space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                  <div className="p-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">
                    <FiCheckCircle size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-clash font-semibold text-foreground">
                      Dialogue Link Established
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Packet simulation complete & logged successfully.
                    </p>
                  </div>
                </div>

                {/* Simulated Receipt Terminal */}
                <div className="bg-black/40 border border-border/60 rounded-xl p-4 font-mono text-xs space-y-2 text-left relative overflow-hidden shadow-inner">
                  <div className="absolute top-2 right-3 text-[9px] text-accent-cyan/40 animate-pulse">
                    ● SECURE_STREAM
                  </div>
                  
                  <div className="space-y-1 text-muted-foreground">
                    <p className="text-accent-cyan/80">=== DIALOGUE TRANSMISSION RECEIPT ===</p>
                    <p><span className="text-foreground/50">TIMESTAMP :</span> {new Date().toISOString()}</p>
                    <p><span className="text-foreground/50">SENDER    :</span> {formData.name || "Anonymous User"}</p>
                    <p><span className="text-foreground/50">GATEWAY   :</span> secure.earljohn.dev</p>
                    <p><span className="text-foreground/50">PAYLOAD   :</span> {formData.message ? `"${formData.message.substring(0, 40)}..."` : "N/A"}</p>
                    <p className="text-accent-cyan/80">=====================================</p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-border/20">
                    {submitLogs.map((log, idx) => (
                      <motion.p 
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-emerald-400/90 flex items-center gap-1.5"
                      >
                        <span className="text-emerald-500/50">&gt;&gt;</span> {log}
                      </motion.p>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-2">
                  The connection will reset shortly. I will align on integrations later.
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
            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-200">
              <RiNextjsFill size={14} />
              <span>Powered by Next.js</span>
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
              <FaGithub size={18} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={18} />
            </a>
            <a 
              href="mailto:earl@example.com" 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Send Email"
            >
              <FaEnvelope size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
