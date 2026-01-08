"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

type ContactType = "phone" | "email" | "cta";

function getContactType(element: HTMLElement): ContactType | null {
  const href = element.getAttribute("href") || "";

  if (href.startsWith("tel:")) {
    return "phone";
  }

  if (href.startsWith("mailto:")) {
    return "email";
  }

  // Check for CTA tracking attribute
  if (element.hasAttribute("data-track-cta")) {
    return "cta";
  }

  // Check for schedule/contact CTA patterns
  const text = element.textContent?.toLowerCase() || "";
  const ctaPatterns = [
    "schedule",
    "book",
    "contact us",
    "get started",
    "request",
    "tour",
    "consultation",
    "free",
    "speak with",
    "talk to",
    "call now",
  ];

  if (ctaPatterns.some((pattern) => text.includes(pattern))) {
    return "cta";
  }

  return null;
}

function isOutboundLink(href: string): boolean {
  if (!href || href.startsWith("/") || href.startsWith("#")) return false;
  if (href.startsWith("tel:") || href.startsWith("mailto:")) return false;

  try {
    const url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function getOutboundDomain(href: string): string | null {
  try {
    const url = new URL(href);
    return url.hostname;
  } catch {
    return null;
  }
}

export function ContactClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;

      // Find the closest anchor or button element
      const clickable = target.closest("a, button") as HTMLElement | null;
      if (!clickable) return;

      const href = clickable.getAttribute("href") || "";

      // Track outbound links
      if (clickable.tagName === "A" && isOutboundLink(href)) {
        const domain = getOutboundDomain(href);
        track("outbound_click", {
          domain: domain || "unknown",
          page: pathname,
          label: clickable.textContent?.trim().slice(0, 50) || undefined,
        });
        return;
      }

      // Track contact clicks
      const contactType = getContactType(clickable);
      if (!contactType) return;

      track("contact_click", {
        type: contactType,
        page: pathname,
        label: clickable.textContent?.trim().slice(0, 50) || undefined,
      });
    }

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [pathname]);

  return null;
}
