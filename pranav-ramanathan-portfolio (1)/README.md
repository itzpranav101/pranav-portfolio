# Pranav Portfolio // Developer Editorial & Venture Hub

An interactive, high-fashion developer editorial portfolio and creative sandbox representing **Pranav**—a 15-year-old student, software architect, and founder based in Singapore. This repository showcases his production-ready applications, system architectures, and engineering philosophies.

---

## 🎨 Visual Philosophy & Architecture

This application is built as an interactive premium editorial magazine, discarding boilerplate card layouts in favor of timeless Swiss typography, micro-staggered layouts, and clean vector assets. Key design components include:

- **Adaptive Dual Palette**: Fully unified high-contrast light and dark themes (soft off-whites and slate dark charcoals) driven by Tailwind CSS v4 variables.
- **Micro-Interaction Mechanics**: Real-time cursor-following coordinate rings, gentle modular spatial audio hover feedback, and custom dynamically rendered SVG tab-specific browser favicons.
- **Scroll-Triggered Reveals**: A highly responsive, low-overhead custom React Intersection Observer system (`ScrollReveal`) that gently enters headings and blocks into the viewport with luxurious cubic-bezier springs.
- **Clean Animations**: Fluid page transitions and interactive elements powered by `@motion/react` utilizing custom easing curves.

---

## 🚀 Core Ventures & Showcases

### 1. Stavex OS
*The peer-to-peer developer operating platform for young founders.*
- Helps ambitious student builders turn concepts into public proof-of-work.
- Features weekly progress validation sprints, authenticated milestone timelines, and structured peer-review interfaces.
- Designed around modular, ultra-responsive grid frameworks for direct focus.

### 2. Kairo AI
*Cognitive chronobiology and energy-based timeline manager.*
- Moves past static hourly task lists to align work with personal physiological stamina states.
- Automatically maps morning/afternoon bandwidth drops, schedules design-buffer cycles, and simulates offline calendar caching.
- Features high-fidelity vector scheduling charts and audio-frequency trackers.

### 3. Hobbies & Technical Playgrounds
- **Violin Mechanics**: Muscular memory, auditory calibration, and bow weight consistency down to wave frequency feedback.
- **Badminton Kinematics**: Spatial tracking, explosive shoulder rotation, and court-speed momentum physics.
- **Golf Trajectory Physics**: Club-face angle loops, rotational velocity, and drag analysis.
- **Robotics & Firmware**: Low-level registers, serial tracking telemetry (115200 bps), and hardware sensor arrays on micro-chip computer controllers.

---

## 🛠️ Stack & Technologies

- **Frontend Core**: React 19, TypeScript 5.8
- **Bundler & Dev Server**: Vite 6.2
- **Styles**: Tailwind CSS v4.0 (incorporating CSS-variable theme variables and imported Google Fonts)
- **Animation Layer**: Motion (`@motion/react`)
- **Icon Assets**: `lucide-react`
- **Host Environs**: Node.js container structures configured to route on port `3000`

---

## ⚡ Setup & Development

### Prerequisite Dependencies
Ensure that you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and npm installed.

### Installation
Clone this repository to your local system and download standard dependencies:
```bash
npm install
```

### Dev Execution
Boot the local development server on the strict mapped environment port (`3000`):
```bash
npm run dev
```
Open your browser of choice and point it to `http://localhost:3000`.

### Linting Check
Perform a static Type-safety audit on the complete src directory:
```bash
npm run lint
```

### Production Build
Compile optimized visual static assets directly to `/dist`:
```bash
npm run build
```
