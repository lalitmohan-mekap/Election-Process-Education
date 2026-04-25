import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Vote, Users, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "./components/ui/Button";
import RotatingText from "./components/ui/RotatingText";

// Perf: check if we should skip canvas on mobile/low-power devices
const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;
const PREFERS_REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Fix #3 & #12: All constants moved outside component ──────────────────────

const DOT_SPACING = 25;
const BASE_OPACITY_MIN = 0.2;
const BASE_OPACITY_MAX = 0.4;
const BASE_RADIUS = 1.5;
const INTERACTION_RADIUS = 150;
const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
const OPACITY_BOOST = 0.6;
const RADIUS_BOOST = 2.5;
const GRID_CELL_SIZE = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5));

// Fix #4: Store RGB as numbers directly instead of parsing a color string per-frame
const DOT_R = 59;
const DOT_G = 130;
const DOT_B = 246;

// Fix #12: Animation variant objects defined at module level (they are static)
const CONTENT_DELAY = 0.1;
const ITEM_DELAY = 0.1;

const bannerVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: CONTENT_DELAY },
  },
};

const headlineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: CONTENT_DELAY + ITEM_DELAY },
  },
};

const subHeadlineVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: CONTENT_DELAY + ITEM_DELAY * 2 },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: CONTENT_DELAY + ITEM_DELAY * 3 },
  },
};

const featuresVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: CONTENT_DELAY + ITEM_DELAY * 4 },
  },
};

// ── Dot interface ─────────────────────────────────────────────────────────────

interface Dot {
  x: number;
  y: number;
  targetOpacity: number;
  currentOpacity: number;
  opacitySpeed: number;
  baseRadius: number;
  currentRadius: number;
}

// ── Fix #8: Smooth-scroll helper ──────────────────────────────────────────────

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ── Component ─────────────────────────────────────────────────────────────────

const ElectionHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const gridRef = useRef<Record<string, number[]>>({});
  const canvasSizeRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const mousePositionRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  // Perf: cache bounding rect, update only on resize
  const canvasRectRef = useRef<DOMRect | null>(null);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Perf: skip canvas entirely on mobile
  const [canvasEnabled] = useState(!IS_MOBILE && !PREFERS_REDUCED_MOTION);

  const handleMouseMove = useCallback(
    (event: globalThis.MouseEvent) => {
      // Perf: use cached rect instead of calling getBoundingClientRect every mouse move
      const rect = canvasRectRef.current;
      if (!rect) {
        mousePositionRef.current = { x: null, y: null };
        return;
      }
      mousePositionRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    },
    []
  );

  const createDots = useCallback(() => {
    const { width, height } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;

    const newDots: Dot[] = [];
    const newGrid: Record<string, number[]> = {};
    const cols = Math.ceil(width / DOT_SPACING);
    const rows = Math.ceil(height / DOT_SPACING);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2;
        const y = j * DOT_SPACING + DOT_SPACING / 2;
        const cellX = Math.floor(x / GRID_CELL_SIZE);
        const cellY = Math.floor(y / GRID_CELL_SIZE);
        const cellKey = `${cellX}_${cellY}`;

        if (!newGrid[cellKey]) {
          newGrid[cellKey] = [];
        }

        newGrid[cellKey].push(newDots.length);

        const baseOpacity =
          Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) +
          BASE_OPACITY_MIN;
        newDots.push({
          x,
          y,
          targetOpacity: baseOpacity,
          currentOpacity: baseOpacity,
          opacitySpeed: Math.random() * 0.005 + 0.002,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        });
      }
    }
    dotsRef.current = newDots;
    gridRef.current = newGrid;
  }, []); // Fix #3: no deps needed — all constants are module-level

  const handleResize = useCallback(() => {
    // Perf: debounce resize to avoid layout thrashing during drag-resize
    if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    resizeTimerRef.current = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const container = canvas.parentElement;
      const width = container ? container.clientWidth : window.innerWidth;
      const height = container ? container.clientHeight : window.innerHeight;

      if (
        canvasSizeRef.current.width !== width ||
        canvasSizeRef.current.height !== height
      ) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(dpr, dpr);
        }

        canvasSizeRef.current = { width, height };
        // Perf: update cached bounding rect
        canvasRectRef.current = canvas.getBoundingClientRect();
        createDots();
      }
    }, 100);
  }, [createDots]);

  const animateDots = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const dots = dotsRef.current;
    const grid = gridRef.current;
    const { width, height } = canvasSizeRef.current;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;

    if (!ctx || !dots || !grid || width === 0 || height === 0) {
      animationFrameId.current = requestAnimationFrame(animateDots);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const activeDotIndices = new Set<number>();
    if (mouseX !== null && mouseY !== null) {
      const mouseCellX = Math.floor(mouseX / GRID_CELL_SIZE);
      const mouseCellY = Math.floor(mouseY / GRID_CELL_SIZE);
      const searchRadius = Math.ceil(INTERACTION_RADIUS / GRID_CELL_SIZE);
      for (let i = -searchRadius; i <= searchRadius; i++) {
        for (let j = -searchRadius; j <= searchRadius; j++) {
          const cellKey = `${mouseCellX + i}_${mouseCellY + j}`;
          if (grid[cellKey]) {
            grid[cellKey].forEach((dotIndex) =>
              activeDotIndices.add(dotIndex)
            );
          }
        }
      }
    }

    dots.forEach((dot, index) => {
      dot.currentOpacity += dot.opacitySpeed;
      if (
        dot.currentOpacity >= dot.targetOpacity ||
        dot.currentOpacity <= BASE_OPACITY_MIN
      ) {
        dot.opacitySpeed = -dot.opacitySpeed;
        dot.currentOpacity = Math.max(
          BASE_OPACITY_MIN,
          Math.min(dot.currentOpacity, BASE_OPACITY_MAX)
        );
        dot.targetOpacity =
          Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) +
          BASE_OPACITY_MIN;
      }

      let interactionFactor = 0;
      dot.currentRadius = dot.baseRadius;

      if (
        mouseX !== null &&
        mouseY !== null &&
        activeDotIndices.has(index)
      ) {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const distSq = dx * dx + dy * dy;

        if (distSq < INTERACTION_RADIUS_SQ) {
          const distance = Math.sqrt(distSq);
          interactionFactor = Math.max(
            0,
            1 - distance / INTERACTION_RADIUS
          );
          interactionFactor *= interactionFactor;
        }
      }

      const finalOpacity = Math.min(
        1,
        dot.currentOpacity + interactionFactor * OPACITY_BOOST
      );
      dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

      // Fix #4: Use numeric constants directly — no regex parsing
      ctx.beginPath();
      ctx.fillStyle = `rgba(${DOT_R}, ${DOT_G}, ${DOT_B}, ${finalOpacity.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animateDots);
  }, []); // Fix #3: no deps — all constants are module-level, refs are stable

  useEffect(() => {
    if (!canvasEnabled) return;

    // Initial setup (bypass debounce)
    const canvas = canvasRef.current;
    if (canvas) {
      const container = canvas.parentElement;
      const width = container ? container.clientWidth : window.innerWidth;
      const height = container ? container.clientHeight : window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr); }
      canvasSizeRef.current = { width, height };
      canvasRectRef.current = canvas.getBoundingClientRect();
      createDots();
    }

    const handleMouseLeave = () => {
      mousePositionRef.current = { x: null, y: null };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    animationFrameId.current = requestAnimationFrame(animateDots);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, [canvasEnabled, handleResize, handleMouseMove, animateDots, createDots]);

  return (
    <div className="pt-20 sm:pt-24 lg:pt-[100px] pb-12 sm:pb-16 lg:pb-[80px] relative bg-white text-slate-900 w-full overflow-hidden">
      {/* Perf: skip canvas on mobile — saves battery and CPU */}
      {canvasEnabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
        />
      )}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, white 90%)",
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-4 pt-8 relative z-10">
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <span className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-sm">
            <Vote className="w-4 h-4" />
            Empowering Democracy Through Education
          </span>
        </motion.div>

        <motion.h1
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-extrabold text-slate-900 leading-tight max-w-4xl mb-4 tracking-tight"
        >
          Learn How Elections{" "}
          <span className="inline-block h-[1.2em] overflow-hidden align-bottom">
            <RotatingText
              texts={[
                "Work",
                "Matter",
                "Shape Democracy",
                "Empower You",
                "Create Change",
              ]}
              mainClassName="text-blue-600 mx-1"
              staggerFrom="last"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "110%", opacity: 0 }}
              staggerDuration={0.01}
              transition={{ type: "spring", damping: 18, stiffness: 250 }}
              rotationInterval={2200}
              splitBy="characters"
              auto
              loop
            />
          </span>
        </motion.h1>

        <motion.p
          variants={subHeadlineVariants}
          initial="hidden"
          animate="visible"
          className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-10 px-2"
        >
          Discover the complete election process from registration to results.
          Interactive guides, step-by-step tutorials, and real-time information
          to help you participate confidently in democracy.
        </motion.p>

        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full sm:w-auto"
        >
          {/* Fix #8: Buttons now scroll to content sections */}
          <Button
            className="group relative overflow-hidden w-full sm:w-auto min-w-[200px]"
            size="lg"
            onClick={() => scrollToSection("how-it-works")}
          >
            <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0 font-semibold">
              Start Learning
            </span>
            {/* Fix #9: Changed <i> to <span> */}
            <span className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-white/20 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
              <ChevronRight
                size={20}
                strokeWidth={2}
                aria-hidden="true"
                className="text-white"
              />
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group w-full sm:w-auto"
            onClick={() => scrollToSection("systems")}
          >
            <Users className="w-5 h-5 mr-2" />
            Explore Resources
          </Button>
        </motion.div>

        <motion.div
          variants={featuresVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto w-full"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 sm:p-8 hover:border-blue-400 hover:shadow-md transition-all">
            <Vote className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-slate-900">
              Voter Registration
            </h3>
            <p className="text-slate-600">
              Learn how to register and verify your voter status easily.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 sm:p-8 hover:border-blue-400 hover:shadow-md transition-all">
            <CheckCircle className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-slate-900">
              Voting Process
            </h3>
            <p className="text-slate-600">
              Understand the complete voting procedure step-by-step.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 sm:p-8 hover:border-blue-400 hover:shadow-md transition-all">
            <Users className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-slate-900">
              Election Results
            </h3>
            <p className="text-slate-600">
              Track and understand how results are counted and verified.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ElectionHero;
