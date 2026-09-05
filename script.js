const navLinks = document.querySelectorAll('.site-header nav:not(.mobile-nav) a');
const sections = [...document.querySelectorAll('main section[id]')];
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

const closeMenu = () => {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('is-open');
};

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    mobileNav.classList.toggle('is-open', !open);
  });

  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.removeAttribute('aria-current'));
    const active = document.querySelector(`.site-header nav:not(.mobile-nav) a[href="#${entry.target.id}"]`);
    if (active) active.setAttribute('aria-current', 'location');
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => navObserver.observe(section));
