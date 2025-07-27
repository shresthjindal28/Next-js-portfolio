// Utility function to scroll to sections using Lenis
export const scrollToSection = (sectionId: string, offset: number = -80): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + offset;

    // Use Lenis scrollTo method if available, otherwise fallback to window.scrollTo
    const win = window as typeof window & { lenis?: { scrollTo: (y: number, options?: { duration?: number; easing?: (t: number) => number }) => void } };
    if (win.lenis && typeof win.lenis.scrollTo === 'function') {
      win.lenis.scrollTo(offsetPosition, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
};
