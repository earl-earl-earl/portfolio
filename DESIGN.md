# DESIGN.md — Earl John Rafael Portfolio

> Comprehensive design documentation covering the visual language, component architecture, animation system, and layout structure of the portfolio website.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Inventory](#component-inventory)
6. [Animation System](#animation-system)
7. [Glassmorphism Utilities](#glassmorphism-utilities)
8. [Section-by-Section Breakdown](#section-by-section-breakdown)
9. [Responsive Design](#responsive-design)
10. [Interaction Patterns](#interaction-patterns)
11. [File Structure](#file-structure)

---

## Tech Stack

| Layer        | Technology                     |
|--------------|-------------------------------|
| Framework    | Next.js (App Router)           |
| Language     | TypeScript                     |
| Styling      | Tailwind CSS v4                |
| Animations   | Framer Motion                  |
| Icons        | Lucide React                   |
| Fonts        | Geist Sans, Geist Mono, Clash Display (local) |

---

## Color System

The palette follows a **Premium Minimalist Dark** theme anchored in deep obsidian tones with two electric accent colors.

### CSS Custom Properties (`globals.css`)

```css
/* Backgrounds */
--background:          hsl(240 10% 3.9%)   /* Deep Obsidian / Near Black */
--card:                hsl(240 10% 7%)      /* Elevated Card Surface */

/* Text */
--foreground:          hsl(0 0% 98%)        /* Crisp Off-White */
--muted-foreground:    hsl(240 5% 64.9%)   /* Soft Slate Gray */

/* Surface & Borders */
--secondary:           hsl(240 3.7% 15.9%)
--muted:               hsl(240 3.7% 15.9%)
--border:              hsl(240 5% 15%)

/* Accent Colors (Raw RGB for alpha compositing) */
--accent-cyan:         6 182 212           /* Cyber Cyan  → #06b6d4 */
--accent-indigo:       99 102 241          /* Royal Indigo → #6366f1 */

/* Border Radius */
--radius:              0.75rem
```

- **Accent Cyan** (`#06b6d4`): Primary interactive highlights, glows, focus rings, active badges, CTA buttons (solid), pulsing dot indicators, metric values.
- **Accent Indigo** (`#6366f1`): Secondary section labels, gradient endpoints, milestone icons, philosophy card accents.
- **Both combined** as a left-to-right gradient (`from-accent-cyan to-accent-indigo`): active skill tab pill, animated role text.
- Accents appear at **low opacity** (`/5`, `/10`, `/20`) for subtle ambient background glows and borders — never solid except for interactive text, solid CTA buttons, or gradient surfaces.

### Selection Highlight

```css
/* Applied on the root <div> in page.tsx */
selection:bg-accent-cyan/20 selection:text-accent-cyan
```

---

## Typography

### Font Families

| Variable                   | Family            | Usage                                      |
|----------------------------|-------------------|--------------------------------------------|
| `--font-sans` / `font-sans`  | Geist Sans        | Body text, nav links, muted descriptions   |
| `--font-mono` / `font-mono`  | Geist Mono        | Section labels, badges, code-style callouts |
| `--font-clash` / `font-clash`| Clash Display     | Display headings (h1, h2, h3), CTA labels  |

### Type Scale

| Usage                  | Classes                                                     |
|------------------------|-------------------------------------------------------------|
| Hero H1                | `text-5xl sm:text-7xl md:text-8xl font-clash font-extrabold tracking-tight` |
| Hero H2 (Role Subtitle)| `text-2xl sm:text-4xl md:text-5xl font-clash font-medium`  |
| Section H2             | `text-3xl sm:text-4xl font-clash font-bold tracking-tight`  |
| Card H3                | `text-xl font-clash font-semibold tracking-tight`           |
| Philosophy Card H3     | `text-lg font-clash font-semibold`                          |
| Body Paragraph         | `text-base sm:text-lg text-muted-foreground leading-relaxed font-normal` |
| Small Body             | `text-sm text-muted-foreground leading-relaxed`             |
| Section Label (Mono)   | `text-xs font-mono tracking-widest uppercase`               |
| Badge / Tag Text       | `text-[10px] font-mono`                                     |

### Typographic Accents

- **Gradient text**: `bg-gradient-to-r from-accent-cyan to-accent-indigo bg-clip-text text-transparent` — used on the hero name ("Earl"), animated role text.
- **Outline text**: `[-webkit-text-stroke:1px_rgba(255,255,255,0.08)]` with `text-transparent` — used on the kinetic scrolling divider.
- **Monospaced labels**: Section numbers (`01 / Profile Matrix`) use `font-mono` for a technical, console-like aesthetic.

---

## Spacing & Layout

### Global Container

All page sections use a constrained centered container:
```
max-w-6xl mx-auto px-6 w-full
```
Contact section uses a narrower container: `max-w-4xl`.

### Section Vertical Spacing

| Section         | Padding                              |
|-----------------|--------------------------------------|
| Hero            | `pt-20 px-6` + `min-h-screen`        |
| About           | `py-24 px-6`                         |
| Projects        | `py-24 px-6`                         |
| Philosophy      | `py-24 px-6`                         |
| Contact         | `py-24 px-6`                         |
| Footer          | `py-8 px-6`                          |

### Section Separators

Sections are visually separated by:
```css
border-t border-border/20   /* Subtle top border at 20% opacity */
```

The kinetic divider (`my-16`) uses:
```css
border-y border-border/20 bg-white/[0.01]
```

### Grids

| Section         | Grid Layout                                    |
|-----------------|------------------------------------------------|
| About           | `grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16` |
| Projects        | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8` |
| Philosophy      | `grid-cols-1 md:grid-cols-3 gap-6`            |
| Skills badges   | `grid-cols-2 sm:grid-cols-3 gap-3`            |
| Project metrics | `grid-cols-3 gap-2`                           |
| Contact form    | `grid-cols-1 sm:grid-cols-2 gap-6`            |

---

## Component Inventory

### `Header.tsx`
**Location:** `components/Header.tsx`

- Fixed position, full-width (`fixed top-0 left-0 right-0 z-50`)
- **Transparent** when at top (`bg-transparent py-6`)
- **Frosted glass** when scrolled > 20px: `bg-background/70 backdrop-blur-md border-b border-border/40 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]`
- **Logo**: SVG image at `/images/logos/page-logo.svg` (40×40), scale hover animation
- **Desktop Nav**: Horizontal pills with a shared `layoutId="nav-hover-pill"` Framer Motion background that slides between hovered links
- **CTA Button**: Gradient pill (`from-accent-cyan to-accent-indigo`) with `ArrowUpRight` icon, labeled "Resume"
- **Mobile Nav**: Hamburger toggle (Menu/X icon) opening a full-screen overlay drawer with `AnimatePresence` fade+slide animation

---

### `AcademicTimeline.tsx`
**Location:** `components/AcademicTimeline.tsx`

- Vertical timeline layout with `border-l border-border/60` left rail
- Each entry revealed via `whileInView` with `opacity/x` fade-slide (`x: -20 → 0`)
- **Dot indicator**: Pulsing neon cyan dot using `animate-ping` + `bg-accent-cyan` with `box-shadow` glow
- Shows: period (Calendar icon, accent-cyan), institution (GraduationCap icon), degree title (Clash Display), description, and milestone bullets (Award icon, accent-indigo)

---

### `SkillsGrid.tsx`
**Location:** `components/SkillsGrid.tsx`

- **Category tabs**: Pill buttons (Frontend / Backend / Databases / Mobile / Tools & DevOps)
- Active tab uses `layoutId="active-skill-tab"` with a cyan→indigo gradient background (Framer Motion spring transition)
- Skill panel switches with `AnimatePresence mode="wait"` and `opacity/y` cross-fade
- Each skill badge: `glass-panel` card with `whileHover={{ scale: 1.03, y: -2 }}` lift effect, showing skill name and level

---

### `ProjectCard.tsx`
**Location:** `components/ProjectCard.tsx`

- Card enters via `whileInView` with `opacity/y` (`y: 30 → 0`)
- **Header**: Project icon (Cpu/Server/Shield from Lucide), title, first 3 tech tags, GitHub + Live links
- **Mockup Area**: Stylized browser-chrome placeholder (traffic light dots + URL bar) with a per-project `mockupGrad` gradient overlay
- **Metrics**: 3-column grid of performance stats (value in `text-accent-cyan`, label in muted mono)
- **Accordion**: "Show Architecture & Challenges" toggle using `AnimatePresence` with `height: 0 → auto` animation — reveals `longDescription` and full tag list

---

## Animation System

### Page Load (Hero Section)

Hero elements stagger in on initial mount using sequential `delay` values:

| Element            | `initial`        | `animate`       | `transition`               |
|--------------------|------------------|-----------------|----------------------------|
| Badge + H1         | `opacity:0, y:15`| `opacity:1, y:0`| `duration: 0.8`            |
| H2 (role heading)  | `opacity:0, y:15`| `opacity:1, y:0`| `duration: 0.8, delay: 0.2`|
| Paragraph          | `opacity:0, y:15`| `opacity:1, y:0`| `duration: 0.8, delay: 0.4`|
| CTA buttons        | `opacity:0, y:15`| `opacity:1, y:0`| `duration: 0.8, delay: 0.6`|

### Animated Role Text (Hero)

```
AnimatePresence mode="wait" — cycles every 2500ms
  enter: y: 25 → 0, opacity: 0 → 1
  exit:  y: 0 → -25, opacity: 1 → 0
  easing: easeInOut, duration: 0.5
```

### Scroll-Triggered Reveals

Used on About timeline, ProjectCards, Philosophy cards, and Contact form:
```
whileInView={{ opacity: 1, y: 0 }}
initial={{ opacity: 0, y: 20–30 }}
viewport={{ once: true, margin: "-50px" to "-100px" }}
```
Philosophy cards stagger with `delay: 0`, `0.15`, `0.3`.

### Kinetic Scrolling Divider

```js
const { scrollYProgress } = useScroll({ target: dividerRef, offset: ["start end", "end start"] });
const dividerTranslateX = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
// Applied as: style={{ x: dividerTranslateX }}
```
Translates massive outline text horizontally in response to vertical scroll.

### Micro-interactions (Hover / Tap)

| Element            | `whileHover`            | `whileTap`        |
|--------------------|-------------------------|-------------------|
| CTA buttons        | `scale: 1.05`           | `scale: 0.95`     |
| Submit button      | `scale: 1.02`           | `scale: 0.98`     |
| Logo               | `scale: 1.05`           | `scale: 0.95`     |
| Nav links          | Shared layout pill      | —                 |
| Skill badges       | `scale: 1.03, y: -2`   | —                 |
| Header mobile CTA  | —                       | `scale: 0.95`     |

### Shared Layout Transitions

| `layoutId`           | Component    | Effect                                              |
|----------------------|--------------|-----------------------------------------------------|
| `nav-hover-pill`     | Header       | Background pill slides across hovered nav links     |
| `active-skill-tab`   | SkillsGrid   | Gradient pill animates between active category tabs |

### Contact Form State Transition

```
AnimatePresence mode="wait"
  Form → Success: opacity fade-out + fade-in + scale: 0.95 → 1
  Auto-resets after 4000ms
```
Success state shows a bouncing `CheckCircle` icon with `animate-bounce`.

---

## Glassmorphism Utilities

Defined as custom CSS classes in `globals.css`:

```css
/* Base glass surface */
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Hover state for interactive glass panels */
.glass-panel-hover {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-panel-hover:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(6, 182, 212, 0.3);     /* Cyan border glow */
  box-shadow: 0 0 30px rgba(6, 182, 212, 0.1); /* Ambient cyan glow */
}
```

`glass-panel` and `glass-panel-hover` are combined on: ProjectCard, Philosophy cards, Contact form panel.
Additional inline overrides: `bg-white/[0.01]`, `bg-white/[0.02]`, `bg-white/[0.04]` for layered depth.

---

## Section-by-Section Breakdown

### Navigation Header
- `id` anchor: none (fixed overlay)
- Behavior: transparent on top → frosted glass on scroll
- Contents: SVG logo · desktop nav · Resume CTA · mobile hamburger

### Hero (`#intro`)
- Layout: `min-h-screen` flex column, vertically centered
- Ambient glows: two blurred radial circles (cyan top-left, indigo bottom-right), `blur-[120px]`, `pointer-events-none`
- Content: status badge pill · H1 with gradient name · animated role H2 · paragraph · dual CTA buttons

### About (`#about`)
- Section label: `01 / Profile Matrix` in accent-indigo mono
- 2-column grid (stacked on mobile):
  - **Left**: `AcademicTimeline` — vertical timeline with pulsing dot indicators
  - **Right**: `SkillsGrid` — tabbed skill categories with animated badge grid


### Projects (`#projects`)
- Section label: `02 / Showcase Registry` in accent-cyan mono
- 3-column responsive card grid (1 → 2 → 3 columns)
- Each `ProjectCard` has: icon · title · tags · description · browser mockup placeholder · performance metrics · expandable accordion

### Philosophy (`#philosophy`)
- Section label: `03 / System Mindset` in accent-indigo mono
- 3-column card grid:
  - **Performance Ethos** — Zap icon, cyan accent
  - **Decoupled Architecture** — Activity icon, indigo accent
  - **Lightweight Footprint** — Box icon, neutral

### Contact (`#contact`)
- Section label: `04 / Dialogue Portal` in accent-cyan mono
- Centered header text
- Glass panel contact form with: Name · Email · Message · Send button
- Form has field focus ring: `border-accent-cyan/80 ring-accent-cyan/30`
- Animated success screen on submit (auto-resets after 4s)

### Footer
- `bg-black/40` backdrop, `border-t border-border/20`
- Left: copyright (`© YEAR EARL JOHN`) + `FileCode2` icon + "Obsidian Core" brand name
- Right: GitHub · LinkedIn · Email icon links (`text-muted-foreground hover:text-foreground`)

---

## Responsive Design

The site is fully responsive using a mobile-first Tailwind approach:

| Breakpoint | Prefix | Behavior                                         |
|------------|--------|--------------------------------------------------|
| Default    | —      | Single-column stacked layouts                    |
| `sm` (≥640px) | `sm:` | Larger type sizes, side-by-side form fields, 2-col skill badges |
| `md` (≥768px) | `md:` | Desktop nav visible, 2-col philosophy, 2-col projects |
| `lg` (≥1024px) | `lg:` | 2-col About section, 3-col projects grid       |

Mobile-specific:
- Nav replaced by full-screen overlay drawer
- CTA buttons become full-width where appropriate
- Hero type scales down: `8xl → 7xl → 5xl`
- All sections remain `px-6` with `max-w-6xl mx-auto`

---

## Interaction Patterns

### Button Styles

| Variant           | Classes                                                                                             |
|-------------------|-----------------------------------------------------------------------------------------------------|
| Primary Solid     | `bg-accent-cyan text-black rounded-full shadow-[0_4px_20px_rgba(6,182,212,0.25)]`                   |
| Ghost / Outline   | `border border-border bg-white/[0.02] hover:bg-white/[0.05] rounded-full`                          |
| Accent Ghost      | `bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/20 rounded-full` |

### Input Fields

```
bg-white/[0.02] border border-border/60
hover:border-border
focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/30
rounded-xl px-4 py-3 text-sm outline-none transition-all
```

### Tag / Badge Styles

| Context         | Classes                                                           |
|-----------------|-------------------------------------------------------------------|
| Hero status     | `bg-accent-cyan/5 border border-accent-cyan/10 text-accent-cyan font-mono rounded-full px-3.5 py-1.5` |
| Project tag     | `bg-white/5 border border-border/40 text-muted-foreground font-mono rounded text-[10px]` |
| Skill badge     | `glass-panel rounded-xl bg-white/[0.02] border border-border/40` |

---

## File Structure

```
portfolio/
├── app/
│   ├── fonts/                    # Local font files (Clash Display .otf)
│   ├── globals.css               # Design tokens, Tailwind @theme, glassmorphism utilities
│   ├── layout.tsx                # Root layout: font injection, metadata, antialiasing
│   ├── page.tsx                  # Main page: all sections, data, scroll hooks
│   └── icon.svg                  # Favicon
├── components/
│   ├── Header.tsx                # Sticky nav with glass scroll effect + mobile drawer
│   ├── AcademicTimeline.tsx      # Vertical timeline with pulsing indicators
│   ├── SkillsGrid.tsx            # Tabbed skill category grid with animated badges
│   └── ProjectCard.tsx           # Expandable project showcase card
├── public/
│   └── images/logos/page-logo.svg  # Site logo
├── blueprint.md                  # Original design brief
├── DESIGN.md                     # ← This file
└── TODO.md                       # Development task tracker
```

---

*Last updated: June 2026*
