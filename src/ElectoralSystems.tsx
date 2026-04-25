// Fix #1: Removed "use client" (meaningless in Vite)

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Users, TrendingUp } from "lucide-react";
import { cn } from "./lib/utils"; // Fix #10: Use shared cn() utility

interface ElectoralSystem {
  id: string;
  name: string;
  shortName: string;
  description: string;
  howItWorks: string;
  advantages: string[];
  disadvantages: string[];
  icon: React.ReactNode;
}

const electoralSystems: ElectoralSystem[] = [
  {
    id: "fptp",
    name: "First-Past-The-Post",
    shortName: "FPTP",
    description:
      "A simple plurality voting system where the candidate with the most votes wins, regardless of whether they achieve an absolute majority.",
    howItWorks:
      "Voters select one candidate. The candidate with the most votes in each district wins the seat. No minimum percentage is required.",
    advantages: [
      "Simple and easy to understand",
      "Quick to count and declare results",
      "Creates strong constituency links",
      "Usually produces clear winners",
    ],
    disadvantages: [
      "Can result in wasted votes",
      "May not reflect overall popular vote",
      "Can lead to tactical voting",
      "Smaller parties often underrepresented",
    ],
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
  {
    id: "pr",
    name: "Proportional Representation",
    shortName: "PR",
    description:
      "A system designed to ensure that the distribution of seats closely matches the proportion of votes received by each party.",
    howItWorks:
      "Voters typically vote for a party rather than individual candidates. Seats are allocated proportionally based on the percentage of votes each party receives.",
    advantages: [
      "Fair representation of all parties",
      "Fewer wasted votes",
      "Encourages diverse political views",
      "Better represents minority groups",
    ],
    disadvantages: [
      "Can lead to coalition governments",
      "Weaker constituency links",
      "More complex to understand",
      "May result in political instability",
    ],
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: "rcv",
    name: "Ranked Choice Voting",
    shortName: "RCV",
    description:
      "A voting system where voters rank candidates in order of preference, ensuring the winner has broad support.",
    howItWorks:
      "Voters rank candidates by preference. If no candidate gets a majority, the candidate with fewest votes is eliminated and their votes redistributed until someone achieves a majority.",
    advantages: [
      "Ensures majority support",
      "Reduces negative campaigning",
      "Eliminates vote splitting",
      "Encourages diverse candidates",
    ],
    disadvantages: [
      "More complex ballot process",
      "Longer counting time",
      "Can be confusing for voters",
      "Requires voter education",
    ],
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

interface ElectoralSystemsComponentProps {
  systems?: ElectoralSystem[];
  defaultSystem?: string;
}

export default function ElectoralSystems({
  systems = electoralSystems,
  defaultSystem = "fptp",
}: ElectoralSystemsComponentProps) {
  const [activeSystem, setActiveSystem] = React.useState<string>(defaultSystem);
  const [hoveredSystem, setHoveredSystem] = React.useState<string | null>(null);

  const activeData = systems.find((s) => s.id === activeSystem);

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4">
      {/* Tab Navigation */}
      <div className="relative mb-8">
        <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-slate-100 rounded-xl relative shadow-inner">
          {systems.map((system) => {
            const isActive = activeSystem === system.id;
            const isHovered = hoveredSystem === system.id;

            return (
              <motion.button
                key={system.id}
                onClick={() => setActiveSystem(system.id)}
                onMouseEnter={() => setHoveredSystem(system.id)}
                onMouseLeave={() => setHoveredSystem(null)}
                className={cn(
                  "relative flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-colors z-10",
                  isActive
                    ? "text-blue-700"
                    : "text-slate-500 hover:text-slate-800"
                )}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{
                      scale: isActive || isHovered ? 1.1 : 1,
                      rotate: isActive ? 360 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    {system.icon}
                  </motion.div>
                  <span>{system.name}</span>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-200/50"
                    style={{ zIndex: -1 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeData && (
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-xl shadow-slate-200/50"
          >
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
                  {activeData.name}
                </h2>
                <p className="text-slate-600 text-lg max-w-3xl">
                  {activeData.description}
                </p>
              </div>

              {/* How It Works */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-blue-900">
                  How It Works
                </h3>
                <p className="text-blue-800 leading-relaxed text-lg">
                  {activeData.howItWorks}
                </p>
              </div>

              {/* Advantages & Disadvantages */}
              <div className="grid md:grid-cols-2 gap-8 pt-4">
                {/* Advantages */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-emerald-700 border-b border-emerald-100 pb-2">
                    Advantages
                  </h3>
                  <ul className="space-y-3">
                    {activeData.advantages.map((advantage, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-base text-slate-700 font-medium">
                          {advantage}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Disadvantages */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-amber-700 border-b border-amber-100 pb-2">
                    Disadvantages
                  </h3>
                  <ul className="space-y-3">
                    {activeData.disadvantages.map((disadvantage, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-0.5 bg-amber-500" />
                        </div>
                        <span className="text-base text-slate-700 font-medium">
                          {disadvantage}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
