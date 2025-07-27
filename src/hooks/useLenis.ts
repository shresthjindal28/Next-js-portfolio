import { useEffect } from 'react';
import Lenis from 'lenis';

// Extend the Window interface to include lenis
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export const useLenis = (): void => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.1,
      syncTouch: true,
      autoResize: true,
    });

   
    window.lenis = lenis;

    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

   
    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);
};
