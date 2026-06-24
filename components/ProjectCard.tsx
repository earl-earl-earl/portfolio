"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiChevronDown, FiChevronUp, FiCpu, FiServer, FiShield, FiGithub, FiActivity, FiLock } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  tags: string[];
  categories: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  mockupGrad: string;
  isPrivate?: boolean;
  githubLinks?: {
    label: string;
    url: string;
  }[];
  liveLinks?: {
    label: string;
    url: string;
  }[];
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between gap-6 border border-border/40 bg-white/2 hover:bg-white/4 transition-all duration-300 overflow-hidden"
    >
      <div className="space-y-4">
        {/* Header: Title, Icon, and Action Links */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              {project.icon === "Cpu" && <FiCpu size={22} />}
              {project.icon === "Server" && <FiServer size={22} />}
              {project.icon === "Shield" && <FiShield size={22} />}
              {project.icon === "Activity" && <FiActivity size={22} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-clash font-semibold text-foreground tracking-tight">
                  {project.title}
                </h3>
                {project.isPrivate && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-500 font-medium">
                    <FiLock className="w-2.5 h-2.5" /> Private
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-border/40 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.isPrivate ? (
              <div 
                className="p-2 rounded-full border border-border/30 bg-white/1 text-muted-foreground/40 cursor-not-allowed"
                title="Private Repository"
              >
                <FiLock className="w-4 h-4" />
              </div>
            ) : project.githubLinks ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="p-2 rounded-full border border-border/60 hover:border-foreground hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer outline-none"
                    aria-label="Select GitHub Repository"
                  >
                    <FiGithub className="w-4 h-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-1">
                  <div className="text-[10px] font-mono text-muted-foreground px-2 py-1 uppercase tracking-wider border-b border-border/30 mb-1">
                    Select Repository
                  </div>
                  {project.githubLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-xs px-2 py-1.5 rounded hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      <span>{link.label}</span>
                      <FiExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  ))}
                </PopoverContent>
              </Popover>
            ) : project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-border/60 hover:border-foreground hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="GitHub Repository"
              >
                <FiGithub className="w-4 h-4" />
              </a>
            ) : null}
            {project.liveLinks ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="p-2 rounded-full border border-border/60 hover:border-foreground hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer outline-none"
                    aria-label="Select Live Link"
                  >
                    <FiExternalLink size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-1">
                  <div className="text-[10px] font-mono text-muted-foreground px-2 py-1 uppercase tracking-wider border-b border-border/30 mb-1">
                    Select Target
                  </div>
                  {project.liveLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-xs px-2 py-1.5 rounded hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      <span>{link.label}</span>
                      <FiExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  ))}
                </PopoverContent>
              </Popover>
            ) : project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-border/60 hover:border-foreground hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="Live Site"
              >
                <FiExternalLink size={16} />
              </a>
            ) : null}
          </div>
        </div>

        {/* Text Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Visual Mockup Placeholder */}
        <div className="relative w-full h-40 rounded-xl border border-border/40 overflow-hidden bg-black/40 group/mockup">
          {/* Header browser-like bar */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-black/40 border-b border-border/20 flex items-center px-3 gap-1 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
            <div className="mx-auto w-[60%] h-3 rounded bg-white/5 border border-border/10" />
          </div>

          {/* Premium visual gradient with glowing lines or image */}
          {project.imageUrl ? (
            <Image 
              src={project.imageUrl} 
              alt={`${project.title} Preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute inset-0 w-full h-full object-cover pt-6 opacity-60 group-hover/mockup:opacity-85 transition-opacity duration-300"
            />
          ) : (
            <>
              <div className={`absolute inset-0 pt-6 flex items-center justify-center bg-linear-to-br ${project.mockupGrad} opacity-30 group-hover/mockup:opacity-40 transition-opacity duration-300`} />
              <div className="absolute inset-0 pt-6 flex flex-col justify-center items-center gap-2 p-4 z-0">
                <span className="text-xs font-mono tracking-wider font-semibold bg-black/60 px-3 py-1.5 rounded-full border border-white/5 text-foreground/90 shadow-md">
                  {project.title} UI Sandbox
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  Screenshot Optimized Container
                </span>
              </div>
            </>
          )}
        </div>

        {/* Performance Metrics / Badges */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="p-2 rounded-lg bg-white/1 border border-border/30 text-center flex flex-col justify-center">
              <span className="text-xs font-mono font-bold text-accent-cyan">{metric.value}</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Expandable Accordion Section */}
        <div className="pt-2 border-t border-border/40">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                Show Less <FiChevronUp size={14} />
              </>
            ) : (
              <>
                Show Architecture & Challenges <FiChevronDown size={14} />
              </>
            )}
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 pb-1 space-y-3 text-xs text-muted-foreground leading-relaxed border-t border-border/20 mt-3">
                  <p className="font-sans whitespace-pre-line">
                    {project.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground border border-border/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
