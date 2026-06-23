"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiAward } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa6";

interface TimelineItem {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description: string;
  milestones: string[];
}

const educationData: TimelineItem[] = [
  {
    id: 1,
    institution: "State University / College of Engineering",
    degree: "Bachelor of Science in Computer Science",
    period: "2022 - Present (Expected 2026)",
    description: "Specializing in Software Engineering and Intelligent Systems. Maintained a 1.25 GPA equivalent while leading multiple collaborative technical initiatives.",
    milestones: [
      "Capstone Project Lead: Architected a decentralized student identity register using Node.js and Next.js.",
      "President's Lister & Academic Merit Scholar across all semesters.",
      "Core Developer at the University Web Development Guild."
    ]
  },
  {
    id: 2,
    institution: "Institute of Technology",
    degree: "Associate in Information Technology",
    period: "2020 - 2022",
    description: "Graduated with High Honors. Focused on Database Systems, Object-Oriented Programming, and Mobile App Development basics.",
    milestones: [
      "Developed a custom cross-platform student directory app using React Native.",
      "Recipient of the Outstanding IT Project of the Year Award.",
      "Completed 300+ hours of software engineering internship."
    ]
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

          <div className="space-y-3">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 font-mono text-accent-cyan">
                <FiCalendar size={12} />
                {item.period}
              </span>
              <span className="flex items-center gap-1">
                <FaGraduationCap size={12} />
                {item.institution}
              </span>
            </div>

            {/* Degree Title */}
            <h3 className="text-xl font-clash font-semibold text-foreground tracking-tight">
              {item.degree}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              {item.description}
            </p>

            {/* Milestones list */}
            <ul className="space-y-2 pt-2">
              {item.milestones.map((milestone, mIdx) => (
                <li key={mIdx} className="flex items-start gap-2 text-xs text-muted-foreground/80 leading-normal">
                  <FiAward size={12} className="text-accent-indigo shrink-0 mt-0.5" />
                  <span>{milestone}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
