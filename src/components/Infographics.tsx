import React, { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
} from "lucide-react";
import { infographicsData, type InfographicCard } from "../data/infographicsData";

function InfographicCardView({
  card,
  cardRef,
}: {
  card: InfographicCard;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={cardRef}
      className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[420px] sm:h-[460px] md:h-[480px] rounded-3xl overflow-hidden flex-shrink-0 snap-center select-none"
      style={{
        background: `linear-gradient(135deg, ${card.gradient[0]}, ${card.gradient[1]})`,
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20"
        style={{ backgroundColor: card.gradient[1] }}
      />
      <div
        className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full opacity-15"
        style={{ backgroundColor: card.gradient[0] }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-7 md:p-8">
        <div>
          <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">
            Did you know?
          </span>
          <h3 className="text-white text-xl font-bold mt-2 leading-tight">
            {card.title}
          </h3>
        </div>

        <div>
          <div className="text-white text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-3 sm:mb-4">
            {card.stat}
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            {card.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white/50 text-[10px] max-w-[60%]">
            Source: {card.source}
          </span>
          <span className="text-white/60 text-xs font-bold tracking-tight">
            DemocracyEdu
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Infographics() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [shared, setShared] = useState(false);

  // Perf: calculate actual card width dynamically
  const getCardWidth = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !container.firstElementChild) return 320;
    return container.firstElementChild.getBoundingClientRect().width + 24; // card + gap
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = getCardWidth();
    container.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }, [getCardWidth]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = getCardWidth();
    const index = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(0, index), infographicsData.length - 1));
  }, [getCardWidth]);

  const handleDownload = useCallback(async () => {
    if (!captureRef.current || downloading) return;
    setDownloading(true);
    try {
      // Perf: lazy-load html2canvas only when needed (55KB gzipped)
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `democracyedu-${infographicsData[activeIndex].id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [activeIndex, downloading]);

  const handleShare = useCallback(async () => {
    const card = infographicsData[activeIndex];
    const shareText = `${card.title}: ${card.stat} — ${card.description}\n\nLearn more at DemocracyEdu`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `DemocracyEdu — ${card.title}`,
          text: shareText,
        });
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        console.error("Copy failed");
      }
    }
  }, [activeIndex]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="h-8 w-8 text-blue-600" />
        <h2 className="text-3xl font-bold text-slate-900">
          Election Facts
        </h2>
      </div>
      <p className="text-lg text-slate-600 mb-8 max-w-3xl">
        Share these eye-opening facts about elections around the world. Download
        them as images or share directly with friends.
      </p>

      {/* Carousel */}
      <div className="relative">
        {/* Scroll container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {infographicsData.map((card, index) => (
            <div key={card.id} className="flex-shrink-0">
              <InfographicCardView
                card={card}
                cardRef={index === activeIndex ? captureRef : undefined}
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-slate-200 shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-slate-200 shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-4 mb-6">
        {infographicsData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const cardWidth = getCardWidth();
              scrollRef.current?.scrollTo({
                left: index * cardWidth,
                behavior: "smooth",
              });
            }}
            className={`rounded-full transition-all ${
              index === activeIndex
                ? "w-6 h-2 bg-blue-600"
                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {downloading ? "Saving..." : "Download as PNG"}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors"
        >
          {shared ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              Share
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
