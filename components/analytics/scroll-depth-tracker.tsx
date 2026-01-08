"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

const THRESHOLDS = [25, 50, 75, 100] as const;
type ScrollThreshold = (typeof THRESHOLDS)[number];

export function ScrollDepthTracker() {
  const pathname = usePathname();
  const firedThresholds = useRef<Set<ScrollThreshold>>(new Set());

  useEffect(() => {
    // Reset thresholds on route change
    firedThresholds.current.clear();

    function getScrollPercentage(): number {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollableHeight = docHeight - winHeight;

      if (scrollableHeight <= 0) return 100;

      return Math.round((scrollTop / scrollableHeight) * 100);
    }

    function handleScroll() {
      const currentPercentage = getScrollPercentage();

      for (const threshold of THRESHOLDS) {
        if (
          currentPercentage >= threshold &&
          !firedThresholds.current.has(threshold)
        ) {
          firedThresholds.current.add(threshold);
          track("scroll_depth", {
            depth: threshold,
            page: pathname,
          });
        }
      }
    }

    // Throttle scroll events to avoid noise
    let ticking = false;
    function throttledScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    // Check initial scroll position (for pages that start scrolled)
    handleScroll();

    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [pathname]);

  return null;
}
