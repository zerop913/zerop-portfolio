"use client";

import { useEffect, useRef } from "react";
import { useElementTracking } from "./AnalyticsTracker";

interface ScrollTrackerProps {
  sectionId: string;
  children: React.ReactNode;
  threshold?: number; // Процент видимости для триггера
}

export function ScrollTracker({
  sectionId,
  children,
  threshold = 50,
}: ScrollTrackerProps) {
  const { trackScroll } = useElementTracking();
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            const visibilityPercentage = Math.round(
              entry.intersectionRatio * 100
            );

            if (visibilityPercentage >= threshold) {
              trackScroll(sectionId, visibilityPercentage);
              hasTracked.current = true;
            }
          }
        });
      },
      {
        threshold: [0.1, 0.25, 0.5, 0.75, 1.0],
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionId, threshold, trackScroll]);

  return (
    <div ref={sectionRef} id={sectionId}>
      {children}
    </div>
  );
}
