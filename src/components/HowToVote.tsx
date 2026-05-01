import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  Calendar,
  CreditCard,
  Users2,
  X,
} from "lucide-react";
import { votingGuides, type VotingGuide } from "../data/votingGuidesData";
import { cn } from "../lib/utils";

const Badge = React.memo(function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
        variant === "success" && "bg-emerald-50 text-emerald-700",
        variant === "warning" && "bg-amber-50 text-amber-700",
        variant === "default" && "bg-blue-50 text-blue-700"
      )}
    >
      {children}
    </span>
  );
});

/**
 * HowToVote component provides a tailored, step-by-step voting guide
 * based on the user's selected country.
 *
 * @component
 * @example
 * return (
 *   <HowToVote />
 * )
 */
export default function HowToVote() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countryList = useMemo(() => {
    return Object.entries(votingGuides)
      .filter(
        ([, data]) =>
          !searchQuery ||
          data.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort(([, a], [, b]) => a.name.localeCompare(b.name));
  }, [searchQuery]);

  const selectedData: VotingGuide | null = selectedCountry
    ? votingGuides[selectedCountry]
    : null;

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (code: string) => {
    setSelectedCountry(code);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How to Vote</h2>
      </div>
      <p className="text-lg text-slate-600 mb-8 max-w-3xl">
        Select your country to get a tailored, step-by-step guide on how voting
        works where you live.
      </p>

      {/* Country Selector */}
      <div className="relative mb-8 max-w-md" ref={dropdownRef}>
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl border bg-white cursor-pointer transition-all",
            isDropdownOpen
              ? "border-blue-400 ring-2 ring-blue-100"
              : "border-slate-200 hover:border-slate-300"
          )}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedData ? (
            <>
              <span className="text-xl">{selectedData.flag}</span>
              <span className="font-medium text-slate-900">
                {selectedData.name}
              </span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Select your country...</span>
            </>
          )}
        </div>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-30 top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-hidden"
            >
              <div className="p-2 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search countries..."
                    className="w-full pl-8 pr-8 py-2 text-sm rounded-lg bg-slate-50 border-none focus:outline-none focus:ring-1 focus:ring-blue-300"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                  {searchQuery && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery("");
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  )}
                </div>
              </div>
              <div className="overflow-y-auto max-h-48">
                {countryList.map(([code, data]) => (
                  <button
                    key={code}
                    onClick={() => handleSelect(code)}
                    className={cn(
                      "w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 transition-colors text-sm",
                      selectedCountry === code && "bg-blue-50"
                    )}
                  >
                    <span className="text-lg">{data.flag}</span>
                    <span className="font-medium text-slate-700">
                      {data.name}
                    </span>
                  </button>
                ))}
                {countryList.length === 0 && (
                  <div className="px-4 py-6 text-center text-slate-400 text-sm">
                    No countries found.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Voting Guide */}
      <AnimatePresence mode="wait">
        {selectedData ? (
          <motion.div
            key={selectedCountry}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 text-white">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{selectedData.flag}</span>
                <div>
                  <h3 className="text-2xl font-bold">{selectedData.name}</h3>
                  <p className="text-blue-100 text-sm mt-1">
                    Voting guide for citizens
                  </p>
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="px-6 py-5 border-b border-slate-100 flex flex-wrap gap-3">
              <Badge variant="default">
                <Users2 className="w-3.5 h-3.5" />
                Voting age: {selectedData.votingAge}
              </Badge>
              <Badge
                variant={
                  selectedData.registrationProcess === "Automatic"
                    ? "success"
                    : "warning"
                }
              >
                Registration: {selectedData.registrationProcess}
              </Badge>
              <Badge
                variant={selectedData.idRequired ? "warning" : "success"}
              >
                <CreditCard className="w-3.5 h-3.5" />
                ID: {selectedData.idRequired ? "Required" : "Not required"}
              </Badge>
              {selectedData.votingMethods.map((method) => (
                <Badge key={method}>{method}</Badge>
              ))}
            </div>

            {/* Steps */}
            <div className="px-6 py-6">
              <h4 className="font-bold text-slate-900 mb-4">
                Step-by-Step Guide
              </h4>
              <div className="space-y-4">
                {selectedData.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.06 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed pt-1">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Election Day & ID info */}
            <div className="px-6 pb-6 grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-blue-900">
                    Election Day
                  </span>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">
                  {selectedData.electionDay}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-bold text-slate-900">
                    ID Requirements
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedData.idDescription}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-10 sm:p-16 text-center"
          >
            <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400 font-medium text-base sm:text-lg">
              Select your country above to see a personalized voting guide
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
