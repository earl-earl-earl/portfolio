"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectImagePreview from "./ProjectImagePreview";
import { 
  FiExternalLink, 
  FiCpu, 
  FiServer, 
  FiShield, 
  FiActivity, 
  FiGithub, 
  FiLock,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Project } from "./ProjectCard";

interface ProjectShowcaseProps {
  projects: Project[];
}

const CATEGORIES = ["All", "Full-Stack", "Web", "Mobile", "Backend", "AI / ML"];

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [userSelectedProject, setUserSelectedProject] = useState<Project | null>(null);
  
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const projectScrollRef = useRef<HTMLDivElement>(null);

  // Filter projects by category
  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    return project.categories.includes(activeCategory);
  });

  // Derive the active project: use the user-selected project if it matches the current filter,
  // otherwise default to the first project in the filtered list.
  const selectedProject = (userSelectedProject && filteredProjects.some(p => p.title === userSelectedProject.title))
    ? userSelectedProject
    : (filteredProjects[0] || null);

  const checkScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      const overflowing = scrollWidth > clientWidth;
      setIsOverflowing(overflowing);
      setShowLeftArrow(overflowing && scrollLeft > 1);
      setShowRightArrow(overflowing && scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    // Run initial check and bind resize listener
    const timer = setTimeout(checkScroll, 100);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScroll);
    };
  }, [projects]);

  useEffect(() => {
    // Re-check scroll offsets when category tabs are clicked or updated
    checkScroll();
  }, [activeCategory]);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 150;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      // Allow scroll animation to finish before updating arrow states
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="space-y-8 w-full">
      {/* Category selector tabs row */}
      <div className="flex items-center gap-2 pb-2 border-b border-border/20 w-full">
        {showLeftArrow && (
          <button
            onClick={() => scroll(categoryScrollRef, "left")}
            className="p-1.5 rounded-full glass-panel bg-background/90 text-muted-foreground hover:text-foreground hover:border-accent-cyan/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] cursor-pointer transition-all duration-300 opacity-80 hover:opacity-100 shrink-0"
            aria-label="Scroll Left"
          >
            <FiChevronLeft size={14} />
          </button>
        )}

        <div
          ref={categoryScrollRef}
          onScroll={checkScroll}
          className={`flex flex-nowrap overflow-x-auto no-scrollbar gap-2 flex-1 scroll-smooth py-1 ${
            isOverflowing ? "justify-start" : "justify-center"
          }`}
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={(e) => {
                setActiveCategory(category);
                e.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
              }}
              className={`relative px-4 py-2 text-xs font-mono font-medium rounded-full cursor-pointer shrink-0 transition-all duration-300 ${
                activeCategory === category
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="active-project-tab"
                  className="absolute inset-0 bg-linear-to-r from-accent-cyan to-accent-indigo rounded-full z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll(categoryScrollRef, "right")}
            className="p-1.5 rounded-full glass-panel bg-background/90 text-muted-foreground hover:text-foreground hover:border-accent-cyan/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] cursor-pointer transition-all duration-300 opacity-80 hover:opacity-100 shrink-0"
            aria-label="Scroll Right"
          >
            <FiChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Main showcase container: master-detail */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full min-h-145">
        {/* Left Side: Projects buttons (20% wide on desktop, horizontal scroll on mobile) */}
        <div className="w-full lg:w-[22%] flex flex-col shrink-0 lg:border-r lg:border-border/20 lg:pr-6">
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3 hidden lg:block">
            Projects ({filteredProjects.length})
          </div>
          
          {/* Mobile project scroll wrapper */}
          <div className="flex items-center gap-1 lg:hidden w-full pb-3 border-b border-border/10 mb-2">
            <button
              onClick={() => scroll(projectScrollRef, "left")}
              className="p-1 rounded-full border border-border/40 text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
            >
              <FiChevronLeft size={12} />
            </button>
            <div
              ref={projectScrollRef}
              className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 flex-1 scroll-smooth py-1"
            >
              {filteredProjects.map((project) => (
                <button
                  key={project.title}
                  onClick={(e) => {
                    setUserSelectedProject(project);
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "center",
                    });
                  }}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border shrink-0 cursor-pointer transition-all duration-300 ${
                    selectedProject?.title === project.title
                      ? "bg-accent-cyan/10 border-accent-cyan text-accent-cyan shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                      : "border-border/40 bg-white/2 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {project.title}
                </button>
              ))}
            </div>
            <button
              onClick={() => scroll(projectScrollRef, "right")}
              className="p-1 rounded-full border border-border/40 text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
            >
              <FiChevronRight size={12} />
            </button>
          </div>

          {/* Desktop vertical sidebar list */}
          <div className="hidden lg:flex flex-col gap-2 overflow-y-auto max-h-125 pr-2 no-scrollbar">
            {filteredProjects.map((project) => {
              const isSelected = selectedProject?.title === project.title;
              return (
                <button
                  key={project.title}
                  onClick={() => setUserSelectedProject(project)}
                  className={`group relative text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer w-full flex items-center gap-3 overflow-hidden ${
                    isSelected
                      ? "border-accent-cyan/40 bg-white/3 text-foreground"
                      : "border-border/40 bg-white/1 text-muted-foreground hover:text-foreground hover:bg-white/3 hover:border-border/80"
                  }`}
                >
                  {/* Selected Indicator background */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-project-selection"
                      className="absolute inset-y-0 left-0 w-1 bg-accent-cyan"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Icon */}
                  <div className={`p-2 rounded-lg transition-colors shrink-0 ${
                    isSelected 
                      ? "bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan" 
                      : "bg-white/5 border border-border/30 text-muted-foreground group-hover:text-foreground group-hover:border-border"
                  }`}>
                    {project.icon === "Cpu" && <FiCpu size={16} />}
                    {project.icon === "Server" && <FiServer size={16} />}
                    {project.icon === "Shield" && <FiShield size={16} />}
                    {project.icon === "Activity" && <FiActivity size={16} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold tracking-tight block truncate">
                      {project.title}
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground block truncate mt-0.5">
                      {project.tags.slice(0, 2).join(" · ")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detail Showcase Pane (80% wide on desktop) */}
        <div className="flex-1 w-full lg:w-[78%]">
          <AnimatePresence mode="wait">
            {selectedProject ? (
              <motion.div
                key={selectedProject.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col gap-6 border border-border/40 bg-white/2 shadow-[0_8px_32px_rgba(0,0,0,0.15)] relative overflow-hidden"
              >
                {/* Glow Overlay */}
                <div className={`absolute top-0 right-0 w-96 h-96 bg-linear-to-br ${selectedProject.mockupGrad} opacity-[0.05] rounded-full blur-[100px] pointer-events-none`} />

                {/* Header row: Info & Action links */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/20 pb-5 z-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl sm:text-3xl font-clash font-bold text-foreground tracking-tight">
                        {selectedProject.title}
                      </h3>
                    </div>
                    {/* Category pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.categories.map((cat) => (
                        <span key={cat} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-accent-cyan/5 border border-accent-cyan/15 text-accent-cyan/80">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* GitHub Button */}
                    {selectedProject.isPrivate ? (
                      <div 
                        className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border border-border/30 bg-white/1 text-muted-foreground/40 cursor-not-allowed"
                        title="Private Repository"
                      >
                        <FiLock className="w-3.5 h-3.5" />
                        <span>Private</span>
                      </div>
                    ) : selectedProject.githubLinks ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-2 px-4 py-2 text-xs rounded-lg border border-border/60 hover:border-foreground bg-white/2 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer outline-none font-medium">
                            <FiGithub className="w-3.5 h-3.5" />
                            <span>Repositories</span>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-1 w-48 bg-card border border-border/60">
                          <div className="text-[9px] font-mono text-muted-foreground px-2 py-1 uppercase tracking-wider border-b border-border/30 mb-1">
                            Select Repository
                          </div>
                          {selectedProject.githubLinks.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between text-xs px-2 py-2 rounded hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors duration-150"
                            >
                              <span>{link.label}</span>
                              <FiExternalLink className="w-3 h-3 opacity-60" />
                            </a>
                          ))}
                        </PopoverContent>
                      </Popover>
                    ) : selectedProject.githubUrl ? (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-xs rounded-lg border border-border/60 hover:border-foreground bg-white/2 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all duration-200 font-medium"
                      >
                        <FiGithub className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    ) : null}

                    {/* Preview Button */}
                    {selectedProject.liveLinks ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-2 px-4 py-2 text-xs rounded-lg bg-accent-cyan text-black hover:bg-accent-cyan/90 transition-all duration-200 cursor-pointer outline-none font-semibold shadow-[0_4px_12px_rgba(6,182,212,0.2)]">
                            <span>Launch Demo</span>
                            <FiExternalLink size={14} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-1 w-48 bg-card border border-border/60">
                          <div className="text-[9px] font-mono text-muted-foreground px-2 py-1 uppercase tracking-wider border-b border-border/30 mb-1">
                            Select Link
                          </div>
                          {selectedProject.liveLinks.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between text-xs px-2 py-2 rounded hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors duration-150"
                            >
                              <span>{link.label}</span>
                              <FiExternalLink className="w-3 h-3 opacity-60" />
                            </a>
                          ))}
                        </PopoverContent>
                      </Popover>
                    ) : selectedProject.liveUrl ? (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-xs rounded-lg bg-accent-cyan text-black hover:bg-accent-cyan/90 transition-all duration-200 font-semibold shadow-[0_4px_12px_rgba(6,182,212,0.2)]"
                      >
                        <span>Live Site</span>
                        <FiExternalLink size={14} />
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Body Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start z-10">
                  {/* Left Column: Description & Metrics */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        Executive Summary
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Metrics Section */}
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        Key Performance Metrics
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {selectedProject.metrics.map((metric) => (
                          <div 
                            key={metric.label} 
                            className="p-3 rounded-xl bg-white/1 border border-border/40 text-center flex flex-col justify-center transition-all hover:bg-white/3"
                          >
                            <span className="text-lg sm:text-xl font-clash font-bold text-accent-cyan tracking-tight">
                              {metric.value}
                            </span>
                            <span className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 block truncate">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Mockup */}
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      Visual Preview
                    </div>
                    <div className="relative w-full h-44 sm:h-52 rounded-xl border border-border/40 overflow-hidden bg-black/50 group/mockup">
                      <ProjectImagePreview images={selectedProject.imageUrls || []} title={selectedProject.title} />
                    </div>
                  </div>
                </div>

                {/* Architecture Details / Full-Width Technical Section */}
                <div className="border-t border-border/20 pt-5 mt-auto z-10">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-accent-indigo mb-2">
                    System Architecture & Core Challenges
                  </div>
                  <div className="bg-white/1 border border-border/30 rounded-xl p-4">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans whitespace-pre-line">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Fully formatted tech stack tags row */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {selectedProject.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-muted-foreground border border-border/10 transition-colors hover:border-accent-cyan/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center border border-border/40 bg-white/2 h-full min-h-100">
                <span className="text-sm font-mono text-muted-foreground">Select a project to review details</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
