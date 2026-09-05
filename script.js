const navLinks = document.querySelectorAll('.site-header nav a');
const sections = [...document.querySelectorAll('main section[id]')];

// Active-section navigation keeps the interface oriented without a heavy animation library.
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.removeAttribute('aria-current'));
    const active = document.querySelector(`.site-header nav a[href="#${entry.target.id}"]`);
    if (active) active.setAttribute('aria-current', 'page');
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => navObserver.observe(section));
