# 🗳️ DemocracyEdu — Election Process Education Platform

A modern, interactive web application that teaches citizens how elections work around the world. Built with **React 19**, **TypeScript**, **Framer Motion**, and **Tailwind CSS**, the platform combines rich animations, real-world data, and mobile-first responsive design to make civic education engaging and accessible.


---

## 📸 Features at a Glance

| Feature | Description |
|---|---|
| **Animated Hero** | Canvas-powered interactive dot grid with mouse-tracking, rotating headline text, and staggered entrance animations |
| **How Elections Work** | Three-card overview explaining Registration, Campaign, and Voting & Counting |
| **Election Lifecycle Timeline** | 7-step animated timeline (Announcement → Inauguration) with expandable detail cards and scroll-triggered entrance animations |
| **Electoral Systems Comparison** | Tabbed interface comparing FPTP, Proportional Representation, and Ranked Choice Voting with animated transitions |
| **World Election Map** | Searchable, filterable grid of 30 countries with color-coded electoral system badges, voter turnout bars, and fact cards |
| **How to Vote (Localized)** | Country-specific step-by-step voting guides for 10 major democracies with quick-fact badges |
| **Shareable Infographics** | Horizontal carousel of 12 gradient infographic cards with Download as PNG and Share/Copy functionality |
| **Key Concepts** | Educational cards covering Electoral College, Gerrymandering, and Primaries & Caucuses |
| **Voter Rights** | Dedicated section on civic duty and the importance of participation |

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | React | 19.2.5 |
| **Language** | TypeScript | 6.0.3 |
| **Build Tool** | Vite | 8.0.10 |
| **Styling** | Tailwind CSS | 3.4.19 |
| **Animations** | Framer Motion | 12.38.0 |
| **Icons** | Lucide React | 1.11.0 |
| **UI Primitives** | Radix UI (Slot), CVA | latest |
| **Image Export** | html2canvas | 1.4.1 (lazy-loaded) |
| **Utilities** | clsx, tailwind-merge | latest |

---

## 📁 Project Structure

```
src/
├── main.tsx                          # App entry point
├── App.tsx                           # Root layout, navigation, section composition
├── index.css                         # Global styles, scrollbar utilities, a11y
│
├── ElectionHero.tsx                  # Hero section with canvas animation
├── ElectoralSystems.tsx              # Tabbed electoral systems comparison
│
├── components/
│   ├── ElectionTimeline.tsx          # Feature A — Animated lifecycle timeline
│   ├── WorldElectionMap.tsx          # Feature B — Country grid with filters
│   ├── HowToVote.tsx                # Feature C — Localized voting guides
│   ├── Infographics.tsx             # Feature D — Shareable infographic carousel
│   └── ui/
│       ├── Button.tsx               # Reusable button component (CVA variants)
│       └── RotatingText.tsx         # Animated rotating text with character splitting
│
├── data/
│   ├── timelineData.tsx             # 7 election lifecycle steps with icons
│   ├── countriesData.ts             # 30 countries: system, turnout, facts, flags
│   ├── votingGuidesData.ts          # 10 countries: step-by-step voting guides
│   └── infographicsData.ts          # 12 election fact cards with gradients
│
└── lib/
    └── utils.ts                     # cn() utility (clsx + tailwind-merge), splitIntoCharacters()
```

### Configuration Files

| File | Purpose |
|---|---|
| `vite.config.js` | Vite configuration with React plugin |
| `tsconfig.json` | TypeScript strict mode configuration |
| `tailwind.config.js` | Tailwind CSS configuration (Inter font, custom theme) |
| `postcss.config.js` | PostCSS with Tailwind and Autoprefixer |
| `eslint.config.js` | ESLint with React Hooks and Refresh plugins |
| `index.html` | HTML entry point with SEO meta tags, Google Fonts preload |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone <https://github.com/lalitmohan-mekap/Election-Process-Education>
cd "Election Process Education"

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

---

## 🏗️ Architecture & Design Decisions

### Component Architecture

The app follows an **atomic design** pattern:

- **Atoms** — `Button`, `RotatingText`, `Badge` (small, reusable)
- **Molecules** — `CountryCard`, `TimelineStepCard`, `InfographicCardView` (composed atoms)
- **Organisms** — `WorldElectionMap`, `ElectionTimeline`, `HowToVote`, `Infographics` (full feature sections)
- **Pages** — `App.tsx` composes all organisms into a single-page application

### Data-Driven Content

All educational content is stored in static TypeScript data files inside `src/data/`. This separation ensures:

- **Easy maintenance** — update facts, add countries, or change content without touching component logic
- **Type safety** — every data structure is typed with interfaces (`CountryData`, `VotingGuide`, `InfographicCard`, etc.)
- **Bundle optimization** — data files tree-shake cleanly and can be lazy-loaded with their parent components

### Navigation

- **Desktop** — horizontal nav bar with 8 anchor links, smooth scrolling
- **Mobile** — hamburger menu opens a slide-out drawer overlay with backdrop blur
- **Breakpoint** — `lg:` (1024px) switches between mobile and desktop nav

---

## ⚡ Performance Optimizations

### Code Splitting & Lazy Loading

```tsx
const ElectionTimeline = lazy(() => import("./components/ElectionTimeline"));
const WorldElectionMap = lazy(() => import("./components/WorldElectionMap"));
const HowToVote = lazy(() => import("./components/HowToVote"));
const Infographics = lazy(() => import("./components/Infographics"));
```

All four feature sections are **code-split** using `React.lazy()` + `Suspense`. The initial bundle only includes `ElectionHero` and `ElectoralSystems`. Feature components load on-demand as users scroll.

### Canvas Animation (ElectionHero)

The hero section features an interactive dot-grid canvas animation:

| Optimization | Detail |
|---|---|
| **Mobile skip** | Canvas is fully disabled on `<768px` screens and when `prefers-reduced-motion` is set — saves CPU and battery |
| **Cached bounding rect** | `getBoundingClientRect()` is cached in a ref, updated only on resize — eliminates per-frame layout thrashing |
| **Spatial grid** | Dots are indexed into grid cells for O(1) neighbor lookups during mouse interaction |
| **Numeric RGB constants** | Color values stored as `DOT_R=59, DOT_G=130, DOT_B=246` — avoids per-frame string parsing |
| **Debounced resize** | Window resize handler is debounced (100ms) to prevent layout thrashing during drag-resize |
| **Module-level variants** | All Framer Motion animation variant objects are defined outside the component — never recreated on render |

### Component Memoization

- `CountryCard` — Wrapped in `React.memo()` to prevent re-renders when sibling cards change (30 cards in the grid)
- `TimelineStepCard` — Wrapped in `React.memo()` so expanding one card doesn't re-render siblings

### Lazy Library Import

```tsx
// html2canvas (55KB gzipped) is only loaded when user clicks "Download as PNG"
const html2canvas = (await import("html2canvas")).default;
```

---

## 📱 Responsive Design

The app uses a **mobile-first** approach with Tailwind's responsive prefixes:

| Breakpoint | Width | Behavior |
|---|---|---|
| Default (xs) | `<640px` | Single column, compact padding, smaller text, no canvas |
| `sm:` | `≥640px` | 2-column grids, medium padding, standard text |
| `md:` | `≥768px` | 3-column grids, desktop timeline layout |
| `lg:` | `≥1024px` | Desktop nav bar, full padding, side-by-side layouts |

### Key Responsive Patterns

- **Section padding**: `py-12 sm:py-16 lg:py-20` — tighter on mobile, spacious on desktop
- **Headings**: `text-2xl sm:text-3xl` — readable on all screens
- **Hero headline**: `text-3xl sm:text-4xl md:text-5xl lg:text-[64px]` — scales across 4 breakpoints
- **Card padding**: `p-4 sm:p-6` or `p-5 sm:p-8` — touch-friendly spacing
- **Infographic cards**: `w-[280px] sm:w-[340px] md:w-[380px]` — fits mobile screens without horizontal overflow
- **Carousel scroll**: Dynamic `getCardWidth()` calculation instead of hardcoded pixel values

---

## ♿ Accessibility

| Feature | Implementation |
|---|---|
| **Reduced motion** | `prefers-reduced-motion` CSS media query disables all animations and transitions |
| **Keyboard navigation** | Global `focus-visible` outline ring on all interactive elements |
| **ARIA labels** | All icon-only buttons have descriptive `aria-label` attributes |
| **Semantic HTML** | Proper `<main>`, `<nav>`, `<section>`, `<footer>` hierarchy |
| **Heading hierarchy** | Single `<h1>` in hero, `<h2>` for each section, `<h3>` for subsections |
| **Color contrast** | Text colors meet WCAG AA requirements against their backgrounds |

---

## 📊 Data Coverage

### World Election Map — 30 Countries

Australia, Argentina, Brazil, Canada, Chile, Denmark, Egypt, Finland, France, Germany, Ghana, India, Indonesia, Ireland, Italy, Japan, Kenya, Mexico, Netherlands, New Zealand, Nigeria, Norway, Philippines, South Africa, South Korea, Spain, Sweden, Turkey, United Kingdom, United States

**Electoral Systems Tracked:** FPTP (7), Proportional Representation (10), Mixed (6), Ranked Choice Voting (2), Two-Round (5)

### How to Vote Guides — 10 Countries

United States, United Kingdom, India, Germany, Australia, France, Brazil, Japan, Sweden, New Zealand

Each guide includes: voting age, registration process type, voting methods, ID requirements, election day schedule, and 6 step-by-step instructions.

### Infographic Facts — 12 Cards

Covering India's 960M+ voters, Australia's compulsory voting, New Zealand's 1893 women's suffrage, youth voting at age 16, global turnout decline, Iceland's oldest parliament, US mail-in voting surge, and more.

---

## 🔧 Development Workflow

### Adding a New Country to World Map

1. Open `src/data/countriesData.ts`
2. Add a new entry to the `countriesData` object:
   ```ts
   XX: {
     name: "Country Name",
     flag: "🏳️",
     electoralSystem: "PR", // FPTP | PR | Mixed | RCV | Two-Round
     voterTurnout: 75,
     turnoutYear: 2024,
     systemDescription: "Description...",
     keyFact: "Interesting fact...",
   }
   ```

### Adding a New Voting Guide

1. Open `src/data/votingGuidesData.ts`
2. Add a new entry to the `votingGuides` object with the country ISO code as key
3. Follow the `VotingGuide` interface for the required fields

### Adding a New Infographic Card

1. Open `src/data/infographicsData.ts`
2. Add a new object to the `infographicsData` array
3. Choose a gradient color pair from the design system

---

## 📜 License

This is a non-partisan educational resource. © 2026 DemocracyEdu.
