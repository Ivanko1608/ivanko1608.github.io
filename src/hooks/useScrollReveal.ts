import { useEffect } from 'react';

/**
 * Attaches an IntersectionObserver that adds the `.visible` CSS class to any
 * element carrying the `.reveal` class once it enters the viewport.
 *
 * Usage: call once at the top of <App /> — no arguments needed.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
