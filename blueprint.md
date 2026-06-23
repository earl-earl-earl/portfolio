# System Prompt & Context Guide: Premium One-Page Portfolio

This document serves as the structural and design blueprint for building a high-end, interactive, dark-themed, single-page portfolio website. It is specifically optimized for an AI developer agent to parse, generate, and implement using **Next.js**, **Tailwind CSS**, **Framer Motion**, and **shadcn/ui**.

---

## 🎨 Core Design System & Theme

### Theme: Premium Minimalist Dark
*   **Background (Primary):** `hsl(240 10% 3.9%)` (Deep Obsidian / Near Black)
*   **Background (Secondary/Cards):** `hsl(240 10% 7%)` or `rgba(255, 255, 255, 0.03)` with glassmorphism `backdrop-blur-md`
*   **Foreground (Text):** `hsl(0 0% 98%)` (Crisp Off-White)
*   **Muted Foreground:** `hsl(240 5% 64.9%)` (Soft Slate Gray)
*   **Accent Color:** Choose a premium electric tone, e.g., Neo-Mint (`#10b981`), Cyber Cyan (`#06b6d4`), or Royal Indigo (`#6366f1`). Use it sparingly for interactive highlights, glows, and text gradients.

### Motion & Interaction Philosophy
*   **Smooth Scrolling:** Enabled globally (`scroll-smooth`).
*   **Micro-interactions:** Every button, card, and link must have a subtle, deliberate hover feedback loop using Framer Motion (e.g., slight scaling `scale: 1.02`, soft glow intensification).
*   **Viewport Animations:** Elements should gracefully fade and slide into view as the user scrolls (`framer-motion` with `whileInView`, `viewport: { once: true, margin: "-100px" }`).

---

## 🏗️ Architecture & Component Layout

### [COMPONENT 1: Navigation Header]
*   **Behavior:** Sticky top navigation, blurred background (`backdrop-blur-md bg-background/60`), thin bottom border (`border-b border-border/40`).
*   **Left Section:** Developer Logo / Personal Brand Monogram.
    *   *Animation Idea:* SVG path drawing animation on initial mount using Framer Motion.
*   **Right Section:** Minimalist nav links pointing to section IDs (`#intro`, `#about`, `#projects`, `#contact`).
    *   *Interaction:* Active state tracking or a sliding background highlight pill that tracks the hovered link.

---

### [SECTION 1: Hero & Introduction] (`id="intro"`)
*   **Layout:** Full viewport height (`min-h-screen`), vertically centered content, large typographic emphasis.
*   **Elements:**
    1.  **Greeting:** High-visibility text (e.g., `"Hello, I'm Earl"`).
        *   *Animation:* Gentle stagger fade-in on page load.
    2.  **Dynamic Role Sub-heading:** Main heading text combined with a continuously morphing, animated text segment to cycling through professional roles.
        *   *Roles to Cycle:* `Full-Stack Developer` | `Software Engineer` | `Mobile App Developer` | `Web Developer` | `AI/ML Engineer (Amateur)` | `UI/UX Designer`
        *   *Animation Mechanism:* Framer Motion `AnimatePresence` with `mode="wait"`. Cross-fade (`opacity`) and vertical slide (`y: -20` to `0`) transitions every 2.5 seconds.
    3.  **Short Narrative Paragraph:** A sleek text block detailing core engineering methodologies, execution style, and passion for creating fast, responsive, and secure software ecosystems.
    4.  **Call to Action (CTA):** Premium primary button with an arrow animation that translates forward on hover.

---

### [SECTION 2: About & Framework Matrix] (`id="about"`)
*   **Layout:** Responsive two-column layout on large screens, stacked on mobile.
*   **Column A: Academic Journey (Education)**
    *   *Layout:* Chronological vertical timeline layout using thin borders and dot indicators.
    *   *Content placeholders:* Institutional name, degree tracking, major milestones, and relevant coursework highlights.
*   **Column B: Technological Stack & Skills**
    *   *Layout:* Structured grid categorizing tools, runtimes, and languages by domain (e.g., Backend, Frontend, Databases, Mobile Runtimes).
    *   *Component:* Wrap individual skill badges in interactive Framer Motion wrappers. Use shadcn/ui custom styled badges (`variant="secondary"`) with subtle hover scale effects.

---

### [SECTION 3: Engineered Works Showcase] (`id="projects"`)
*   **Part A: Kinetic Typography Divider (Scroll-Triggered)**
    *   *Concept:* High-end scrolling transition banner creating horizontal movement relative to vertical scroll.
    *   *Text Content:* `"BUILDING PERFANT AND MODERN APPLICATIONS"` / `"ENGINEERING SCALABLE SYSTEMS"`
    *   *Implementation:* Framer Motion `useScroll` and `useTransform` hooked into an `x` translation property to slide massive outline text across the screen on scroll.
*   **Part B: Interactive Project Registry**
    *   *Component:* Custom accordion grid or an explicit deck configuration (such as a modern card grid or a custom tabbed interface using shadcn/ui Accordion / Tabs).
    *   *Each Project Entry Must Support:*
        *   Project Title and Branding Logo/Icon.
        *   Rich Text Summary (Challenges overcome, performance metrics, security implementations).
        *   Visual Mockup Placeholder (Contextual space optimized for responsive screenshots).
        *   Tech Stack Tags (e.g., Next.js, FastAPI, Supabase).
        *   Links to source code or active deployments.

---

### [SECTION 4: Technical Narrative & Philosophy] (`id="philosophy"`)
*   **Layout:** Modern, asymmetric full-bleed callout section or clean card grid.
*   **Focus Area:** Development principles, system optimization, performance ethos, and architectural design choices (e.g., prioritizing open-source infrastructure, free-tier microservices, decoupled API architectures, state management patterns).
*   **Aesthetic:** Clean typography, generous layout padding, and micro-animations to highlight data flow or core development ethics.

---

### [COMPONENT 5: Footer Infrastructure]
*   **Layout:** Minimalist footer with subtle top divider rule.
*   **Content:**
    *   Copyright ownership notation with current year context.
    *   Social/Professional Graph Anchors (GitHub, LinkedIn, Email).
    *   *Aesthetic:* Muted text that responds to pointer proximity or hover changes.
