import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, Clock } from "lucide-react";
import { timelineSteps } from "../data/timelineData";
import { cn } from "../lib/utils";

// Perf: memoize card to prevent re-renders when sibling cards expand/collapse
const TimelineStepCard = React.memo(function TimelineStepCard({
  step,
  index,
}: {
  step: (typeof timelineSteps)[0];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.05 }}
      className={cn(
        "relative flex items-start gap-4 sm:gap-6 md:gap-8",
        "md:w-[calc(50%-2rem)]",
        index % 2 === 0 ? "md:self-start md:mr-auto" : "md:self-end md:ml-auto"
      )}
    >
      {/* Step number circle — mobile only */}
      <div className="flex-shrink-0 md:hidden w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm sm:text-lg font-bold shadow-lg shadow-blue-600/20 z-10">
        {step.step}
      </div>

      {/* Card */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex-1 text-left bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-blue-600">{step.icon}</span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {step.title}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
          </motion.div>
        </div>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{step.summary}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100">
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
});

export default function ElectionTimeline() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Election Lifecycle
        </h2>
      </div>
      <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-12 max-w-3xl">
        Every election follows a structured process from announcement to
        inauguration. Click on each step to learn more about how it works.
      </p>

      {/* Timeline container */}
      <div className="relative">
        {/* Vertical line — desktop only */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-200 -translate-x-1/2" />

        {/* Steps */}
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12">
          {timelineSteps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex flex-col md:flex-row md:items-center"
            >
              {/* Desktop center dot */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 text-white items-center justify-center text-sm font-bold shadow-lg shadow-blue-600/20 z-10 border-4 border-white">
                {step.step}
              </div>

              {/* Card positioned left or right */}
              <div
                className={cn(
                  "w-full md:w-1/2",
                  index % 2 === 0
                    ? "md:pr-16 md:text-right"
                    : "md:pl-16 md:ml-auto"
                )}
              >
                <TimelineStepCard step={step} index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
