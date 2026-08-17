const views = document.querySelectorAll('.view');
const homeButton = document.querySelector('.home-button');
const viewTriggers = document.querySelectorAll('[data-view]');
const portals = document.querySelectorAll('.portal');
const demoLinks = document.querySelectorAll('[data-demo]');
const toast = document.querySelector('.toast');
let toastTimer;

function showView(viewName) {
  const target = document.getElementById(viewName);
  if (!target) return;

  views.forEach(view => view.classList.remove('active'));
  target.classList.add('active');
  homeButton.style.display = viewName === 'home' ? 'none' : 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', viewName === 'home' ? window.location.pathname : `#${viewName}`);
}

viewTriggers.forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    showView(trigger.dataset.view);
  });
});

portals.forEach(portal => {
  portal.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showView(portal.dataset.view);
    }
  });
});

demoLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    clearTimeout(toastTimer);
    toast.querySelector('b').textContent = link.dataset.demo;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  });
});

const initialView = window.location.hash.slice(1);
if (initialView && document.getElementById(initialView)) showView(initialView);
