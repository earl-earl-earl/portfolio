"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiChevronDown, FiChevronUp, FiCpu, FiServer, FiShield, FiGithub } from "react-icons/fi";

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  mockupGrad: string;
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
      className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between gap-6 border border-border/40 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
    >
      <div className="space-y-4">
        {/* Header: Title, Icon, and Action Links */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              {project.icon === "Cpu" && <FiCpu size={22} />}
              {project.icon === "Server" && <FiServer size={22} />}
              {project.icon === "Shield" && <FiShield size={22} />}
            </div>
            <div>
              <h3 className="text-xl font-clash font-semibold text-foreground tracking-tight">
                {project.title}
              </h3>
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
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-border/60 hover:border-foreground hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all duration-200"
              aria-label="GitHub Repository"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-border/60 hover:border-foreground hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="Live Site"
              >
                <FiExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Text Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Visual Mockup Placeholder */}
        <div className="relative w-full h-[160px] rounded-xl border border-border/40 overflow-hidden bg-black/40 group/mockup">
          {/* Header browser-like bar */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-black/40 border-b border-border/20 flex items-center px-3 gap-1 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
            <div className="mx-auto w-[60%] h-3 rounded bg-white/5 border border-border/10" />
          </div>

          {/* Premium visual gradient with glowing lines */}
          <div className={`absolute inset-0 pt-6 flex items-center justify-center bg-gradient-to-br ${project.mockupGrad} opacity-30 group-hover/mockup:opacity-40 transition-opacity duration-300`} />
          
          <div className="absolute inset-0 pt-6 flex flex-col justify-center items-center gap-2 p-4 z-0">
            <span className="text-xs font-mono tracking-wider font-semibold bg-black/60 px-3 py-1.5 rounded-full border border-white/5 text-foreground/90 shadow-md">
              {project.title} UI Sandbox
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              Screenshot Optimized Container
            </span>
          </div>
        </div>

        {/* Performance Metrics / Badges */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="p-2 rounded-lg bg-white/[0.01] border border-border/30 text-center flex flex-col justify-center">
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
