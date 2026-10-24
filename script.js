const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '✕' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));
}
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const filterButtons = document.querySelectorAll('[data-filter]');
const workCards = document.querySelectorAll('[data-category]');
function applyFilter(filter) {
  workCards.forEach(card => card.classList.toggle('filtered-out', filter !== 'all' && card.dataset.category !== filter));
  filterButtons.forEach(button => button.classList.toggle('active', button.dataset.filter === filter));
  const count = document.getElementById('workCount');
  if (count) count.textContent = [...workCards].filter(card => !card.classList.contains('filtered-out')).length;
}
filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));

const form = document.getElementById('contactForm');
if (form) {
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get('service');
  if (requestedService) {
    const select = form.querySelector('select');
    [...select.options].forEach(option => {
      if (option.text.toLowerCase() === requestedService.toLowerCase()) select.value = option.value;
    });
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.name.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();
    const text = `Hello GEDASXH, my name is ${name}. I'm interested in: ${service}. Project details: ${message}`;
    window.open(`https://wa.me/255741755436?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
}

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
