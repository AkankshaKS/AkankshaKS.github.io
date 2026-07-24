document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.nav-links');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) {
      siteNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const filterButtons = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');
    projectCards.forEach((card) => {
      const categories = card.getAttribute('data-category') || '';
      const show = filter === 'all' || categories.includes(filter);
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

const tabs = document.querySelectorAll('.tab-btn');
const archVisual = document.getElementById('arch-visual');
const archCopy = document.getElementById('arch-copy');
const architectureContent = {
  mvvm: {
    title: 'MVVM architecture',
    text: 'State is separated from presentation, enabling testability, clear UI ownership, and easy evolution as product requirements grow.',
    nodes: ['UI', 'ViewModel', 'Repository', 'Data Source']
  },
  clean: {
    title: 'Clean Architecture',
    text: 'Domain logic remains independent from UI and data layers, making the mobile product easier to evolve and maintain over time.',
    nodes: ['Presentation', 'Domain', 'Data', 'Platform']
  },
  offline: {
    title: 'Offline-first sync',
    text: 'Local persistence and optimistic update patterns keep the experience reliable even when connectivity is inconsistent.',
    nodes: ['Cache', 'Sync Layer', 'API', 'Queue']
  }
};

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((btn) => btn.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.getAttribute('data-tab');
    const content = architectureContent[key];
    archVisual.innerHTML = content.nodes.map((node) => `<div class="arch-node">${node}</div>`).join('');
    archCopy.innerHTML = `<h3>${content.title}</h3><p>${content.text}</p>`;
  });
});

const counters = document.querySelectorAll('.count');
if ('IntersectionObserver' in window) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number(entry.target.getAttribute('data-target'));
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            entry.target.textContent = target;
            clearInterval(timer);
          } else {
            entry.target.textContent = current;
          }
        }, 40);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((counter) => countObserver.observe(counter));
} else {
  counters.forEach((counter) => {
    counter.textContent = counter.getAttribute('data-target');
  });
}

const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
