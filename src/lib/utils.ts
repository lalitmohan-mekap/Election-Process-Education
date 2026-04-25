import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Splits a string into grapheme clusters using Intl.Segmenter when available,
 * falling back to simple string split.
 */
export function splitIntoCharacters(text: string): string[] {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    try {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    } catch {
      return text.split("");
    }
  }
  return text.split("");
}
