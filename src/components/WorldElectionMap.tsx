import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe2, Search, X, BarChart3 } from "lucide-react";
import {
  countriesData,
  systemColors,
  systemLabels,
  type ElectoralSystemType,
  type CountryData,
} from "../data/countriesData";
import { cn } from "../lib/utils";

const systemTypes: ElectoralSystemType[] = [
  "FPTP",
  "PR",
  "Mixed",
  "RCV",
  "Two-Round",
];

// Perf: memoize to prevent re-renders when sibling cards change
const CountryCard = React.memo(function CountryCard({
  code,
  data,
  isActive,
  onClick,
}: {
  code: string;
  data: CountryData;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-3 sm:p-4 rounded-xl border text-left transition-all cursor-pointer group",
        isActive
          ? "bg-blue-50 border-blue-300 shadow-md"
          : "bg-white border-slate-200 hover:border-blue-200 hover:shadow-sm"
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl">{data.flag}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 text-xs sm:text-sm truncate">
            {data.name}
          </h4>
          <span
            className="inline-block text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full mt-0.5 sm:mt-1"
            style={{
              backgroundColor: systemColors[data.electoralSystem] + "18",
              color: systemColors[data.electoralSystem],
            }}
          >
            {data.electoralSystem}
          </span>
        </div>
      </div>
    </button>
  );
});

function TurnoutBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

export default function WorldElectionMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSystem, setFilterSystem] = useState<
    ElectoralSystemType | "all"
  >("all");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = useMemo(() => {
    return Object.entries(countriesData)
      .filter(([, data]) => {
        const matchesSearch =
          !searchQuery ||
          data.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
          filterSystem === "all" || data.electoralSystem === filterSystem;
        return matchesSearch && matchesFilter;
      })
      .sort(([, a], [, b]) => a.name.localeCompare(b.name));
  }, [searchQuery, filterSystem]);

  const selectedData = selectedCountry
    ? countriesData[selectedCountry]
    : null;

  const systemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(countriesData).forEach((d) => {
      counts[d.electoralSystem] = (counts[d.electoralSystem] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-4">
        <Globe2 className="h-8 w-8 text-blue-600" />
        <h2 className="text-3xl font-bold text-slate-900">
          World Election Map
        </h2>
      </div>
      <p className="text-lg text-slate-600 mb-8 max-w-3xl">
        Explore how {Object.keys(countriesData).length} countries around the
        world conduct their elections. Click on any country to learn about its
        electoral system, voter turnout, and unique democratic features.
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
        <button
          onClick={() => setFilterSystem("all")}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
            filterSystem === "all"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
          )}
        >
          All ({Object.keys(countriesData).length})
        </button>
        {systemTypes.map((system) => (
          <button
            key={system}
            onClick={() =>
              setFilterSystem(filterSystem === system ? "all" : system)
            }
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
              filterSystem === system
                ? "text-white border-transparent"
                : "bg-white border-slate-200 hover:border-slate-400"
            )}
            style={
              filterSystem === system
                ? { backgroundColor: systemColors[system] }
                : { color: systemColors[system] }
            }
          >
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: systemColors[system] }}
              />
              {systemLabels[system]} ({systemCounts[system] || 0})
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search countries..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-slate-100"
          >
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        )}
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
        {/* Country grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 content-start max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-1 sm:pr-2 scrollbar-thin">
          {countries.map(([code, data]) => (
            <CountryCard
              key={code}
              code={code}
              data={data}
              isActive={selectedCountry === code}
              onClick={() =>
                setSelectedCountry(
                  selectedCountry === code ? null : code
                )
              }
            />
          ))}
          {countries.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400">
              No countries match your search.
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            {selectedData ? (
              <motion.div
                key={selectedCountry}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl shadow-slate-200/50"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{selectedData.flag}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {selectedData.name}
                    </h3>
                    <span
                      className="inline-block text-sm font-semibold px-3 py-1 rounded-full mt-1"
                      style={{
                        backgroundColor:
                          systemColors[selectedData.electoralSystem] + "18",
                        color:
                          systemColors[selectedData.electoralSystem],
                      }}
                    >
                      {systemLabels[selectedData.electoralSystem]}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selectedData.systemDescription}
                </p>

                {/* Voter Turnout */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4" />
                      Voter Turnout ({selectedData.turnoutYear})
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      {selectedData.voterTurnout}%
                    </span>
                  </div>
                  <TurnoutBar value={selectedData.voterTurnout} />
                </div>

                {/* Key Fact */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-amber-800 mb-1">
                    Did you know?
                  </p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    {selectedData.keyFact}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center"
              >
                <Globe2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">
                  Select a country to explore its electoral system
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
