"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";

interface Skill {
  name: string;
  iconSlug?: string;
  iconUrl?: string;
  svg?: React.ReactNode;
}

interface SkillCategory {
  [category: string]: Skill[];
}

const skillsData: SkillCategory = {
  "Front-End & Design": [
    { name: "React", iconSlug: "react" },
    { name: "React Native", iconSlug: "react" },
    { name: "Flutter", iconSlug: "flutter" },
    { name: "Figma", iconSlug: "figma" },
    { name: "WordPress", iconSlug: "wordpress" }
  ],
  "Back-End": [
    { name: "Next.js", iconSlug: "nextdotjs" },
    { name: "Node.js", iconSlug: "nodedotjs" },
    { name: "FastAPI", iconSlug: "fastapi" },
    { name: "Flask", iconSlug: "flask" },
    { name: "PostgreSQL", iconSlug: "postgresql" },
    { name: "Supabase", iconSlug: "supabase" },
    { name: "Firebase", iconSlug: "firebase" },
    { name: "Appwrite", iconSlug: "appwrite" },
    { name: "Redis", iconSlug: "redis" },
    { name: "GraphQL", iconSlug: "graphql" },
    { name: "Prisma", iconSlug: "prisma" }
  ],
  "Cloud & Infra": [
    { name: "Google Cloud", iconSlug: "googlecloud" },
    { name: "Docker", iconSlug: "docker" },
    { name: "IAM", iconSlug: "auth0" },
    { name: "Microsoft Azure", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
    { name: "Render", iconSlug: "render" }
  ],
  "AI/ML Engineering": [
    { name: "PyTorch", iconSlug: "pytorch" },
    { name: "TensorFlow", iconSlug: "tensorflow" },
    { name: "Roboflow", iconSlug: "roboflow" },
    { name: "Kaggle", iconSlug: "kaggle" },
    { name: "PGVector", iconSlug: "postgresql" },
    { name: "RAG", iconSlug: "langchain" }
  ],
  "CI/CD & Automation": [
    { name: "Git", iconSlug: "git" },
    { name: "GitHub Actions", iconSlug: "githubactions" },
    { name: "Supabase Edge", iconSlug: "supabase" },
    { name: "Vercel", iconSlug: "vercel" }
  ],
  "Testing": [
    { name: "Jest", iconSlug: "jest" },
    { 
      name: "Playwright", 
      svg: (
        <svg viewBox="0 0 400 400" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M136.444 221.556C123.558 225.213 115.104 231.625 109.535 238.032C114.869 233.364 122.014 229.08 131.652 226.348C141.51 223.554 149.92 223.574 156.869 224.915V219.481C150.941 218.939 144.145 219.371 136.444 221.556ZM108.946 175.876L61.0895 188.484C61.0895 188.484 61.9617 189.716 63.5767 191.36L104.153 180.668C104.153 180.668 103.578 188.077 98.5847 194.705C108.03 187.559 108.946 175.876 108.946 175.876ZM149.005 288.347C81.6582 306.486 46.0272 228.438 35.2396 187.928C30.2556 169.229 28.0799 155.067 27.5 145.928C27.4377 144.979 27.4665 144.179 27.5336 143.446C24.04 143.657 22.3674 145.473 22.7077 150.721C23.2876 159.855 25.4633 174.016 30.4473 192.721C41.2301 233.225 76.8659 311.273 144.213 293.134C158.872 289.185 169.885 281.992 178.152 272.81C170.532 279.692 160.995 285.112 149.005 288.347ZM161.661 128.11V132.903H188.077C187.535 131.206 186.989 129.677 186.447 128.11H161.661Z" fill="#2D4552"/>
          <path d="M193.981 167.584C205.861 170.958 212.144 179.287 215.465 186.658L228.711 190.42C228.711 190.42 226.904 164.623 203.57 157.995C181.741 151.793 168.308 170.124 166.674 172.496C173.024 167.972 182.297 164.268 193.981 167.584ZM299.422 186.777C277.573 180.547 264.145 198.916 262.535 201.255C268.89 196.736 278.158 193.031 289.837 196.362C301.698 199.741 307.976 208.06 311.307 215.436L324.572 219.212C324.572 219.212 322.736 193.41 299.422 186.777ZM286.262 254.795L176.072 223.99C176.072 223.99 177.265 230.038 181.842 237.869L274.617 263.805C282.255 259.386 286.262 254.795 286.262 254.795ZM209.867 321.102C122.618 297.71 133.166 186.543 147.284 133.865C153.097 112.156 159.073 96.0203 164.029 85.204C161.072 84.5953 158.623 86.1529 156.203 91.0746C150.941 101.747 144.212 119.124 137.7 143.45C123.586 196.127 113.038 307.29 200.283 330.682C241.406 341.699 273.442 324.955 297.323 298.659C274.655 319.19 245.714 330.701 209.867 321.102Z" fill="#2D4552"/>
          <path d="M161.661 262.296V239.863L99.3324 257.537C99.3324 257.537 103.938 230.777 136.444 221.556C146.302 218.762 154.713 218.781 161.661 220.123V128.11H192.869C189.471 117.61 186.184 109.526 183.423 103.909C178.856 94.612 174.174 100.775 163.545 109.665C156.059 115.919 137.139 129.261 108.668 136.933C80.1966 144.61 57.179 142.574 47.5752 140.911C33.9601 138.562 26.8387 135.572 27.5049 145.928C28.0847 155.062 30.2605 169.224 35.2445 187.928C46.0272 228.433 81.663 306.481 149.01 288.342C166.602 283.602 179.019 274.233 187.626 262.291H161.661V262.296ZM61.0848 188.484L108.946 175.876C108.946 175.876 107.551 194.288 89.6087 199.018C71.6614 203.743 61.0848 188.484 61.0848 188.484Z" fill="#E2574C"/>
          <path d="M341.786 129.174C329.345 131.355 299.498 134.072 262.612 124.185C225.716 114.304 201.236 97.0224 191.537 88.8994C177.788 77.3834 171.74 69.3802 165.788 81.4857C160.526 92.163 153.797 109.54 147.284 133.866C133.171 186.543 122.623 297.706 209.867 321.098C297.093 344.47 343.53 242.92 357.644 190.238C364.157 165.917 367.013 147.5 367.799 135.625C368.695 122.173 359.455 126.078 341.786 129.174ZM166.497 172.756C166.497 172.756 180.246 151.372 203.565 158C226.899 164.628 228.706 190.425 228.706 190.425L166.497 172.756ZM223.42 268.713C182.403 256.698 176.077 223.99 176.077 223.99L286.262 254.796C286.262 254.791 264.021 280.578 223.42 268.713ZM262.377 201.495C262.377 201.495 276.107 180.126 299.422 186.773C322.736 193.411 324.572 219.208 324.572 219.208L262.377 201.495Z" fill="#2EAD33"/>
          <path d="M139.88 246.04L99.3324 257.532C99.3324 257.532 103.737 232.44 133.607 222.496L110.647 136.33L108.663 136.933C80.1918 144.611 57.1742 142.574 47.5704 140.911C33.9554 138.563 26.834 135.572 27.5001 145.929C28.08 155.063 30.2557 169.224 35.2397 187.929C46.0225 228.433 81.6583 306.481 149.005 288.342L150.989 287.719L139.88 246.04ZM61.0848 188.485L108.946 175.876C108.946 175.876 107.551 194.288 89.6087 199.018C71.6615 203.743 61.0848 188.485 61.0848 188.485Z" fill="#D65348"/>
          <path d="M225.27 269.163L223.415 268.712C182.398 256.698 176.072 223.99 176.072 223.99L232.89 239.872L262.971 124.281L262.607 124.185C225.711 114.304 201.232 97.0224 191.532 88.8994C177.783 77.3834 171.735 69.3802 165.783 81.4857C160.526 92.163 153.797 109.54 147.284 133.866C133.171 186.543 122.623 297.706 209.867 321.097L211.655 321.5L225.27 269.163ZM166.497 172.756C166.497 172.756 180.246 151.372 203.565 158C226.899 164.628 228.706 190.425 228.706 190.425L166.497 172.756Z" fill="#1D8D22"/>
          <path d="M141.946 245.451L131.072 248.537C133.641 263.019 138.169 276.917 145.276 289.195C146.513 288.922 147.74 288.687 149 288.342C152.302 287.451 155.364 286.348 158.312 285.145C150.371 273.361 145.118 259.789 141.946 245.451ZM137.7 143.451C132.112 164.307 127.113 194.326 128.489 224.436C130.952 223.367 133.554 222.371 136.444 221.551L138.457 221.101C136.003 188.939 141.308 156.165 147.284 133.866C148.799 128.225 150.318 122.978 151.832 118.085C149.393 119.637 146.767 121.228 143.776 122.867C141.759 129.093 139.722 135.898 137.7 143.451Z" fill="#C04B41"/>
        </svg>
      )
    },
    { name: "React Testing Library", iconSlug: "testinglibrary" }
  ],
  "Languages": [
    { name: "JavaScript & TypeScript", iconSlug: "typescript" },
    { name: "Python", iconSlug: "python" },
    { name: "PHP", iconSlug: "php" },
    { name: "Java", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    { name: "C++", iconSlug: "cplusplus" },
    { name: "C#", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
    { name: "Dart", iconSlug: "dart" },
    { name: "SQL", iconSlug: "sqlite" }
  ]
};

export default function SkillsGrid() {
  const categories = Object.keys(skillsData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 180;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Category selector pills */}
      <div className="flex items-center gap-2 pb-2 border-b border-border/40 w-full">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          className="p-1.5 rounded-full glass-panel bg-background/90 text-muted-foreground hover:text-foreground hover:border-accent-cyan/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] cursor-pointer transition-all duration-300 opacity-80 hover:opacity-100 shrink-0"
          aria-label="Scroll Left"
        >
          <FiChevronLeft size={14} />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 flex-1 scroll-smooth"
        >
          {categories.map((category) => (
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
                  layoutId="active-skill-tab"
                  className="absolute inset-0 bg-linear-to-r from-accent-cyan to-accent-indigo rounded-full z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="p-1.5 rounded-full glass-panel bg-background/90 text-muted-foreground hover:text-foreground hover:border-accent-cyan/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] cursor-pointer transition-all duration-300 opacity-80 hover:opacity-100 shrink-0"
          aria-label="Scroll Right"
        >
          <FiChevronRight size={14} />
        </button>
      </div>

      {/* Grid of badges */}
      <div className="relative min-h-45">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {(skillsData[activeCategory] || []).map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.03, y: -2 }}
                className="glass-panel rounded-xl p-3 flex items-center gap-3 border border-border/40 bg-white/2 hover:bg-white/4 transition-colors duration-300"
              >
                {skill.svg ? (
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center bg-white/4 rounded-lg p-1">
                    {skill.svg}
                  </div>
                ) : (
                  (skill.iconSlug || skill.iconUrl) && (
                    <div className="w-6 h-6 shrink-0 flex items-center justify-center bg-white/4 rounded-lg p-1">
                      <Image
                        src={skill.iconUrl || `https://cdn.simpleicons.org/${skill.iconSlug}`}
                        alt={skill.name}
                        width={24}
                        height={24}
                        unoptimized
                        priority
                        className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          // Hide broken images if slug doesn't exist
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  )
                )}
                <span className="text-sm font-semibold text-foreground leading-tight">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preload all non-active category icons immediately after page loads */}
      <div className="hidden" aria-hidden="true">
        {Object.values(skillsData).flatMap(skills => skills).map((skill, idx) => {
          if (skill.svg) return null;
          const url = skill.iconUrl || (skill.iconSlug ? `https://cdn.simpleicons.org/${skill.iconSlug}` : null);
          if (!url) return null;
          return (
            <Image
              key={idx}
              src={url}
              alt=""
              width={24}
              height={24}
              unoptimized
              priority
            />
          );
        })}
      </div>
    </div>
  );
}
