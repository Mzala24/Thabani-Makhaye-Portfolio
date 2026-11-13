const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Highlight the current page in the navigation.
const currentPage = document.querySelector('main')?.dataset.currentPage;
navLinks?.querySelectorAll('a[data-page]').forEach(link => {
  link.classList.toggle('active', link.dataset.page === currentPage);
});

// Project filters are active only on the Projects page.
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    projectCards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

// Screenshot galleries: thumbnails swap the main image.
document.querySelectorAll('.shots').forEach(g => {
  const main = g.querySelector('.shot-main');
  g.querySelectorAll('.shot-thumb').forEach(t => t.addEventListener('click', () => {
    main.src = t.dataset.src; main.alt = t.dataset.alt;
    g.querySelectorAll('.shot-thumb').forEach(o => o.classList.toggle('active', o === t));
  }));
});

// Reveal content as it enters the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
