import { useEffect, useCallback, RefObject } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  delay?: number;
  once?: boolean;
  selector?: string;
}

/**
 * Custom hook for revealing elements on scroll with smooth animations
 * Uses IntersectionObserver for better performance
 * 
 * @param targetRef Optional ref to limit the scope (defaults to document)
 * @param options Configuration options
 */
const useScrollReveal = (
  targetRef?: RefObject<HTMLElement>,
  options: ScrollRevealOptions = {}
) => {
  const {
    threshold = 0.15,
    root = null,
    rootMargin = '0px',
    delay = 0,
    once = true,
    selector = '.scroll-reveal'
  } = options;

  const revealCallback = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      // Skip if not intersecting
      if (!entry.isIntersecting) {
        if (!once) {
          // If not using "once" mode, we can hide elements again when they leave viewport
          entry.target.classList.remove('revealed');
        }
        return;
      }

      // Add a small delay for staggered animation if specified in data attribute
      const elementDelay = entry.target.getAttribute('data-reveal-delay');
      const totalDelay = elementDelay 
        ? delay + parseInt(elementDelay, 10) 
        : delay;

      // Apply delay if specified
      if (totalDelay > 0) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, totalDelay);
      } else {
        entry.target.classList.add('revealed');
      }

      // If once is true, unobserve after revealing
      if (once) {
        observer.unobserve(entry.target);
      }
    });
  }, [delay, once]);

  useEffect(() => {
    // Create IntersectionObserver
    const observer = new IntersectionObserver((entries) => revealCallback(entries, observer), {
      root,
      rootMargin,
      threshold,
    });

    // Get all elements to observe
    const container = targetRef?.current || document;
    const elements = container.querySelectorAll(selector);

    // Observe each element
    elements.forEach((el) => observer.observe(el));

    // Cleanup function to disconnect observer
    return () => {
      observer.disconnect();
    };
  }, [targetRef, threshold, root, rootMargin, revealCallback, selector]);
};

export default useScrollReveal;