import { useState, useEffect, useRef } from "react";

export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.pageYOffset;
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate if element is in viewport
        if (
          scrolled + windowHeight > elementTop &&
          scrolled < elementTop + elementHeight
        ) {
          const progress =
            (scrolled + windowHeight - elementTop) /
            (windowHeight + elementHeight);
          setOffset(progress * speed * 100);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}

export function useTypewriter(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  const reset = () => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsComplete(false);
  };

  return { displayText, isComplete, reset };
}

export function useGlitch(interval: number = 3000) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, interval);

    return () => clearInterval(glitchInterval);
  }, [interval]);

  return isGlitching;
}
