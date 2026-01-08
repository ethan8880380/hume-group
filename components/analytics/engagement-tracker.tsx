"use client";

import { ScrollDepthTracker } from "./scroll-depth-tracker";
import { ContactClickTracker } from "./contact-click-tracker";

export function EngagementTracker() {
  return (
    <>
      <ScrollDepthTracker />
      <ContactClickTracker />
    </>
  );
}
