// Optional motion enhancements only — the inspection-panel entrance and the
// process-section scroll emphasis. Both are pure additions on top of an
// already-complete static design (see components.css): if this file never
// ran, or throws, or is deleted outright, every affected element still
// renders in its finished, fully-understandable state.

(function () {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) return;

  document.documentElement.classList.add('js-motion');

  // Inspection panel — sequential tick entrance, plays once, no layout shift.
  const checks = document.querySelectorAll('.inspection-panel__check');
  if (checks.length) {
    checks.forEach((el) => el.classList.add('is-pending'));
    checks.forEach((el, i) => {
      setTimeout(() => el.classList.remove('is-pending'), 200 + i * 150);
    });
  }

  // Process section — progressive emphasis as each step enters view.
  const steps = document.querySelectorAll('.process-step');
  if (steps.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
    );
    steps.forEach((step) => observer.observe(step));
  }
})();
