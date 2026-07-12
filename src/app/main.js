const nav = document.getElementById('mainNav');
const topBtn = document.getElementById('scrollTop');
const floatCta = document.getElementById('floatCta');
const onScroll = () => {
  const active = window.scrollY > 24;
  nav.classList.toggle('nav-scrolled', active);
  topBtn.classList.toggle('show', window.scrollY > 420);
  floatCta.classList.toggle('show', window.scrollY > 420);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    const instance = bootstrap.Collapse.getInstance(menu);
    if (instance) instance.hide();
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
