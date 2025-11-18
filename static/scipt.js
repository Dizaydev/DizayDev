
// Carrusel robusto con autoplay + flechas + pausa al hover
(function initCarousel(rootSelector, { interval = 4000 } = {}) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const track = root.querySelector('.carousel__track');
  const slides = Array.from(root.querySelectorAll('.carousel__slide'));
  const btnPrev = root.querySelector('.carousel__btn.prev');
  const btnNext = root.querySelector('.carousel__btn.next');

  if (!track || slides.length === 0) return;

  let index = 0;
  let timer = null;

  const total = slides.length;

  function goTo(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(${-index * 100}%)`;
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function start() {
    if (timer) return;
    timer = setInterval(next, interval);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  // Controles
  btnNext?.addEventListener('click', () => { stop(); next(); start(); });
  btnPrev?.addEventListener('click', () => { stop(); prev(); start(); });

  // Pausar al hacer hover (mejor UX)
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  // Accesibilidad: flechas del teclado cuando el carrusel tiene foco
  root.setAttribute('tabindex', '0');
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { stop(); next(); start(); }
    if (e.key === 'ArrowLeft')  { stop(); prev(); start(); }
  });

  // Iniciar
  goTo(0);
  start();
})('#carousel-1', { interval: 4000 });

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});