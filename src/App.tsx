import { useState, Suspense, lazy } from "react";
import {
  BookOpen,
  Globe2,
  Vote,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import ElectionHero from "./ElectionHero";
import ElectoralSystems from "./ElectoralSystems";

// Perf: lazy-load heavy feature components (only loaded when scrolled into view)
const ElectionTimeline = lazy(() => import("./components/ElectionTimeline"));
const WorldElectionMap = lazy(() => import("./components/WorldElectionMap"));
const HowToVote = lazy(() => import("./components/HowToVote"));
const Infographics = lazy(() => import("./components/Infographics"));

const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
  </div>
);

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it Works" },
  { href: "#timeline", label: "Timeline" },
  { href: "#systems", label: "Electoral Systems" },
  { href: "#world-map", label: "World Map" },
  { href: "#concepts", label: "Key Concepts" },
  { href: "#how-to-vote", label: "How to Vote" },
  { href: "#rights", label: "Voter Rights" },
  { href: "#facts", label: "Facts" },
];

/**
 * Mobile navigation menu overlay component.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {boolean} props.isOpen - Whether the menu is currently visible
 * @param {() => void} props.onClose - Callback function to close the menu
 */
function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-xl p-6 flex flex-col gap-6">
        <button
          onClick={onClose}
          className="self-end p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-slate-700" />
        </button>
        <nav className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

/**
 * Main application component.
 * Orchestrates the rendering of the landing page, navigation, and lazy-loaded feature components.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Vote className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl tracking-tight text-slate-900">
                DemocracyEdu
              </span>
            </div>

            {/* Desktop nav */}
            <div className="hidden lg:flex space-x-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile hamburger button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <main className="pt-16">
        <ElectionHero />

        {/* How Elections Work */}
        <section id="how-it-works" className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <Globe2 className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                The Global Election Process
              </h2>
            </div>
            <p className="text-lg text-slate-600 mb-6">
              Elections are the cornerstone of democratic societies worldwide.
              While exact processes vary by country, they generally follow a
              standard lifecycle designed to ensure fairness, transparency, and
              representation.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg sm:text-xl font-semibold mb-3">1. Registration</h3>
                <p className="text-slate-600">
                  Before voting, citizens must register. Some countries use
                  automatic registration based on government records, while
                  others require citizens to proactively sign up before a
                  specific deadline.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg sm:text-xl font-semibold mb-3">2. The Campaign</h3>
                <p className="text-slate-600">
                  Candidates and parties present their platforms to the public.
                  This period is regulated by laws concerning campaign finance,
                  advertising, and media access to ensure a level playing field.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-semibold mb-3">
                  3. Voting &amp; Counting
                </h3>
                <p className="text-slate-600">
                  On election day, voters cast ballots in person or via mail.
                  Votes are then securely counted—often under the observation of
                  independent monitors—and the results are officially certified.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Election Timeline — Feature A */}
        <section id="timeline" className="py-12 sm:py-16 lg:py-20 bg-white">
          <Suspense fallback={<SectionLoader />}>
            <ElectionTimeline />
          </Suspense>
        </section>

        {/* Electoral Systems */}
        <section id="systems" className="py-12 sm:py-16 lg:py-20 bg-slate-50">
          <ElectoralSystems />
        </section>

        {/* World Election Map — Feature B */}
        <section id="world-map" className="py-12 sm:py-16 lg:py-20 bg-white">
          <Suspense fallback={<SectionLoader />}>
            <WorldElectionMap />
          </Suspense>
        </section>

        {/* Key Concepts */}
        <section id="concepts" className="py-12 sm:py-16 lg:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Key Concepts
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="group rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 transition-all hover:shadow-lg hover:border-blue-300">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Electoral College
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Used primarily in the United States presidential elections,
                  this is a system where voters elect representatives (electors)
                  who then formally cast votes for the president. A candidate
                  needs a majority of electoral votes, not necessarily the
                  national popular vote, to win.
                </p>
              </div>

              <div className="group rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 transition-all hover:shadow-lg hover:border-blue-300">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Gerrymandering
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  The practice of drawing electoral district boundaries to give
                  one political party an unfair advantage over its rivals. This
                  can significantly dilute the voting power of certain
                  demographics and distort overall election outcomes.
                </p>
              </div>

              <div className="group rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 transition-all hover:shadow-lg hover:border-blue-300">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Primaries &amp; Caucuses
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Methods used by political parties to select their candidates
                  for a general election. Primaries are direct, statewide voting
                  processes, while caucuses are local gatherings where voters
                  openly decide which candidate to support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Vote — Feature C */}
        <section id="how-to-vote" className="py-12 sm:py-16 lg:py-20 bg-white">
          <Suspense fallback={<SectionLoader />}>
            <HowToVote />
          </Suspense>
        </section>

        {/* Voter Rights */}
        <section id="rights" className="py-12 sm:py-16 lg:py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <ShieldCheck className="h-8 w-8 text-blue-300" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                Voter Rights &amp; Civic Duty
              </h2>
            </div>
            <p className="text-lg text-blue-100 max-w-3xl mb-8">
              Voting is not just a right; it is the fundamental mechanism through
              which citizens exercise control over their government. Historically,
              many groups had to fight tirelessly to secure the right to vote,
              making it a privilege that should not be taken for granted.
            </p>
            <p className="text-lg text-blue-100 max-w-3xl">
              Understanding how your local system works empowers you to make
              informed decisions. We encourage every eligible citizen to check
              their registration status, learn about the issues, and participate
              in local and national elections. Your voice matters in shaping the
              future of your community.
            </p>
          </div>
        </section>

        {/* Shareable Infographics — Feature D */}
        <section id="facts" className="py-12 sm:py-16 lg:py-20 bg-slate-50">
          <Suspense fallback={<SectionLoader />}>
            <Infographics />
          </Suspense>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 text-center">
        <p>&copy; 2026 DemocracyEdu. A non-partisan educational resource.</p>
        <p className="mt-2 text-sm text-slate-500">Get out and vote!</p>
      </footer>
    </div>
  );
}

export default App;
