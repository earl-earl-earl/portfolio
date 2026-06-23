"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa6";

interface TimelineItem {
  id: number;
  institution: string;
  degree: string;
  period: string;
}

const educationData: TimelineItem[] = [
  {
    id: 1,
    institution: "West Visayas State University",
    degree: "Bachelor of Science in Computer Science",
    period: "2022 - 2026"
  }
];

export default function AcademicTimeline() {
  return (
    <div className="relative border-l border-border/60 ml-3 md:ml-6 pl-6 md:pl-8 space-y-12">
      {educationData.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          className="relative"
        >
          {/* Pulsing neon dot indicator */}
          <span className="absolute -left-[35px] md:-left-[43px] top-1.5 flex h-4 w-4 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan/40 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
          </span>

          <div className="space-y-2">
            {/* Year */}
            <div className="flex items-center gap-1 text-xs font-mono text-accent-cyan">
              <FiCalendar size={12} />
              {item.period}
            </div>

            {/* Course */}
            <h3 className="text-xl font-clash font-semibold text-foreground tracking-tight">
              {item.degree}
            </h3>

            {/* College */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <FaGraduationCap size={14} className="text-muted-foreground/70" />
              <span>{item.institution}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
