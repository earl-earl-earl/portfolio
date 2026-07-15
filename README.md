# 🌌 Earl John Rafael — Premium Interactive Portfolio

A premium, interactive, single-page portfolio engineered with modern front-end technologies. Featuring a bespoke **Obsidian Dark** visual style, immersive **3D interactive rendering**, scroll-driven parallax graphics, and custom-tailored micro-interactions.

---

## 🎨 Visual Identity & Theme: *Obsidian Dark*

The aesthetic follows a custom-crafted design system prioritizing minimalism, high-performance animation frames, and high-fidelity layouts:

*   **Obsidian Depth**: Near-black obsidian background colors (`#09090b` / `hsl(240 10% 3.9%)`) paired with elevated translucent card overlays.
*   **Neon Accent Compositions**: Interactive components glow and track focus with Cyber Cyan (`#06b6d4`) and Royal Indigo (`#6366f1`) accents.
*   **Modern Typography**:
    *   `Clash Display` (Local font): High-impact display headings and call-to-actions.
    *   `Geist Sans` (Vercel): Clean, readable body copy and structural labels.
    *   `Geist Mono` (Vercel): Section details, badges, and code blocks.
*   **Glassmorphism**: Translucent interfaces built using custom Tailwind v4 configurations, incorporating fine-border highlights and backdrop blurs.

---

## ⚡ Immersive & Engineering-Led Features

### 1. Interactive 3D Hero Canvas
Powered by **Three.js**, the background of the hero section displays a live 3D developer workspace. It renders an advanced 3D laptop viewport running an offscreen canvas texture, which simulates typing real-time codebase lines and system logs representing the development session.

### 2. Dynamic Role Cycler
Utilizes Framer Motion's `AnimatePresence` to rotate through professional roles (`Full-Stack Developer`, `Software Engineer`, `Mobile App Developer`, `Web Developer`, `AI/ML Engineer`, `UI/UX Designer`) using vertical-slide translation and opacity cross-fades every 2.5 seconds.

### 3. Academic & Skills Matrix
Positions the educational timeline and technological matrix side-by-side:
*   **Academic Journey**: An animated chronological timeline showing credentials (e.g., Bachelor of Science in Information Technology at West Visayas State University) with pulsing neon markers.
*   **Interactive Skills Grid**: A horizontal-scroll category selector filtering structured tags (Languages, Front-End, Back-End, AI/ML, Cloud/Infra, CI/CD, Testing) with SVG vectors and simpleicons.

### 4. Kinetic Parallax Typography
A full-width marquee divider displaying outline typography. Leverages Framer Motion's `useScroll` and `useTransform` to translate headings horizontally based on the user's vertical scroll position.

### 5. Expandable Showcase Deck
An interactive portfolio gallery showing engineered projects:
*   **InsureVis**: AI-powered insurance platform spanning Flutter (Mobile), Express (Web), and Flask/Detectron2 (ML API).
*   **NPS Survey & Analytics System**: Enterprise-grade feedback dashboard built for 15+ retail branches.
*   **BebeCare**: Nanny booking marketplace platform featuring PayMongo escrow transactions.
*   **verifAI**: Real-time AI-powered fact-checking pipeline integrating Gemini AI, Playwright, FastAPI, and Redis.
*   **INNO Webpage**: High-performance responsive CMS architecture.
*   Supports live links, GitHub repos, performance metrics, and responsive screen preview carousels.

### 6. Terminal Contact Gateway
The contact form replaces basic inputs with a simulated terminal dialogue. On submission, it outputs mock cryptographic handshakes, encryption passes (`aes-256`), and payload transmission statuses.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | React Server Components & file-system routing |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Static type safety and autocomplete interfaces |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-generation CSS utility compilation |
| **3D Rendering** | [Three.js](https://threejs.org/) | High-performance WebGL scene structures |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Responsive, layout-driven transitions at 60fps |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) & [Simple Icons](https://simpleicons.org/) | Icon sets and brands vectors |

---

## 📂 Project Architecture

```bash
├── app/                  # Next.js App Router (Layouts & Main Page)
│   ├── layout.tsx        # HTML metadata and font loading configurations
│   ├── globals.css       # Custom Tailwind CSS v4 directives & Obsidian variables
│   └── page.tsx          # Master Single-Page Portfolio template & section orchestrator
├── components/           # Modular presentational & interactive components
│   ├── ui/               # Base shadcn-inspired interface components
│   │   └── popover.tsx   # Radix-backed popover drawer
│   ├── AcademicTimeline.tsx # Chronological education vertical list
│   ├── Header.tsx        # Sticky navigation header with SVG monogram drawer
│   ├── HeroCanvas.tsx    # Interactive Three.js WebGL canvas background
│   ├── ProjectCard.tsx   # Individual showcase item wrapper
│   ├── ProjectImagePreview.tsx # Image carousel and preview popups
│   ├── ProjectShowcase.tsx # Showcase container with tags & custom grid layout
│   └── SkillsGrid.tsx    # Tabbed matrix rendering developer skills and tools
├── data/                 # Static JSON databases
│   └── projects.json     # Details, links, metrics, and tags for featured works
├── public/               # Static assets (images, logos, resume PDFs)
└── package.json          # Dependencies, devDependencies, and build pipelines
```

---

## ⚙️ Getting Started

Follow these steps to run the portfolio workspace locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) on your local browser to view.

### 3. Production Build
Optimize the app bundle and perform a production compilation:
```bash
npm run build
npm run start
```

### 4. Running Linter
Check for TypeScript compliance and syntax errors:
```bash
npm run lint
```
