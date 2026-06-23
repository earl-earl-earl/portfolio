"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  name: string;
  level: string;
}

interface SkillCategory {
  [category: string]: Skill[];
}

const skillsData: SkillCategory = {
  Frontend: [
    { name: "Next.js", level: "Advanced" },
    { name: "React.js", level: "Advanced" },
    { name: "TypeScript", level: "Advanced" },
    { name: "Tailwind CSS", level: "Advanced" },
    { name: "Framer Motion", level: "Intermediate" },
    { name: "HTML5/CSS3", level: "Advanced" },
  ],
  Backend: [
    { name: "Node.js", level: "Advanced" },
    { name: "Express.js", level: "Advanced" },
    { name: "FastAPI", level: "Intermediate" },
    { name: "Python", level: "Advanced" },
    { name: "Go (Golang)", level: "Intermediate" },
  ],
  Databases: [
    { name: "PostgreSQL", level: "Advanced" },
    { name: "MongoDB", level: "Advanced" },
    { name: "Redis", level: "Intermediate" },
    { name: "Supabase", level: "Advanced" },
    { name: "Prisma ORM", level: "Advanced" },
  ],
  Mobile: [
    { name: "React Native", level: "Advanced" },
    { name: "Flutter", level: "Intermediate" },
    { name: "Swift", level: "Beginner" },
    { name: "Kotlin", level: "Beginner" },
  ],
  "Tools & DevOps": [
    { name: "Git & GitHub", level: "Advanced" },
    { name: "Docker", level: "Intermediate" },
    { name: "GitHub Actions", level: "Intermediate" },
    { name: "Vercel / Netlify", level: "Advanced" },
    { name: "Linux / Bash", level: "Intermediate" },
  ],
};

export default function SkillsGrid() {
  const categories = Object.keys(skillsData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="space-y-6">
      {/* Category selector pills */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-border/40">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative px-4 py-2 text-xs font-mono font-medium rounded-full cursor-pointer transition-all duration-300 ${
              activeCategory === category
                ? "text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="active-skill-tab"
                className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-indigo rounded-full z-0"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {/* Grid of badges */}
      <div className="relative min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {skillsData[activeCategory].map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.03, y: -2 }}
                className="glass-panel rounded-xl p-3 flex flex-col justify-between items-start border border-border/40 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
              >
                <span className="text-sm font-semibold text-foreground">{skill.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground/80 mt-1 uppercase tracking-wider">
                  {skill.level}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
