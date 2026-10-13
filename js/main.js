/*
 * Menú móvil (sin jQuery)
 * ------------------------------------------------------------
 * Copia el menú del header dentro del panel lateral y lo abre o
 * cierra con el botón hamburguesa, la X, un clic afuera o Escape.
 */
(function menuMovil() {
  const body = document.body;
  const panel = document.querySelector('.site-mobile-menu');
  const destino = document.querySelector('.site-mobile-menu-body');
  const toggles = document.querySelectorAll('.js-menu-toggle');
  const ABIERTO = 'offcanvas-menu';
  const ANCHO_ESCRITORIO = 1200; // coincide con d-xl-none del botón

  if (!panel || !destino) return;

  // 1. Clonar el menú de escritorio dentro del panel
  document.querySelectorAll('.js-clone-nav').forEach((nav) => {
    const copia = nav.cloneNode(true);
    copia.className = 'site-nav-wrap';
    copia.removeAttribute('id');
    destino.appendChild(copia);
  });

  panel.id = panel.id || 'menu-movil';
  panel.setAttribute('aria-label', 'Menú');

  const abierto = () => body.classList.contains(ABIERTO);

  const setEstado = (abrir) => {
    body.classList.toggle(ABIERTO, abrir);
    panel.toggleAttribute('inert', !abrir);
    toggles.forEach((t) => {
      t.classList.toggle('active', abrir);
      if (t.tagName === 'A' || t.tagName === 'BUTTON') {
        t.setAttribute('aria-expanded', String(abrir));
        t.setAttribute('aria-controls', panel.id);
      }
    });
    if (abrir) {
      const primerLink = panel.querySelector('.site-nav-wrap a');
      if (primerLink) primerLink.focus();
    }
  };

  setEstado(false);

  // 2. Botón hamburguesa y X
  toggles.forEach((t) => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setEstado(!abierto());
    });
  });

  // 3. Clic afuera del panel
  document.addEventListener('click', (e) => {
    if (abierto() && !panel.contains(e.target)) setEstado(false);
  });

  // 4. Tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && abierto()) {
      setEstado(false);
      const boton = document.querySelector('.site-menu-toggle');
      if (boton) boton.focus();
    }
  });

  // 5. Al agrandar la ventana a tamaño escritorio, cerrar el panel
  window.addEventListener('resize', () => {
    if (window.innerWidth >= ANCHO_ESCRITORIO && abierto()) setEstado(false);
  });
})();
