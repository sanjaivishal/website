const navLinks = document.querySelectorAll('.site-header nav a');
const sections = [...document.querySelectorAll('main section[id]')];

// Active-section navigation: keeps the interface oriented without adding a heavy library.
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.removeAttribute('aria-current'));
    const active = document.querySelector(`.site-header nav a[href="#${entry.target.id}"]`);
    if (active) active.setAttribute('aria-current', 'location');
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => navObserver.observe(section));

// Progressive enhancement: the page is fully readable without JS; motion is only added when JS is available.
const motionTargets = document.querySelectorAll('.section-heading, .about-grid, .article-card, .case-feature, .project-grid article, .timeline-item, .resume-banner > div, .resume-banner > a, .contact-section > div');
motionTargets.forEach((element) => element.classList.add('reveal'));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  motionTargets.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${Math.min(index * 35, 210)}ms`);
    revealObserver.observe(element);
  });
} else {
  motionTargets.forEach((element) => element.classList.add('is-visible'));
}
