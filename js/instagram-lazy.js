/*
 * Carga diferida del embed de Instagram
 * ------------------------------------------------------------
 * El script de Instagram (embed.js) pesa y hace varias conexiones.
 * En vez de cargarlo al abrir la página, se carga recién cuando el
 * <blockquote class="instagram-media"> está por entrar en pantalla.
 * Mientras tanto se ve la tarjeta estática con el link al posteo.
 */
(function instagramLazy() {
  const embeds = document.querySelectorAll('blockquote.instagram-media');
  if (!embeds.length) return;

  const SRC = 'https://www.instagram.com/embed.js';
  let cargado = false;

  const cargar = () => {
    if (cargado) return;
    cargado = true;
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
      return;
    }
    const s = document.createElement('script');
    s.src = SRC;
    s.async = true;
    document.body.appendChild(s);
  };

  if (!('IntersectionObserver' in window)) {
    window.addEventListener('load', cargar, { once: true });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        cargar();
      }
    },
    { rootMargin: '300px 0px' }
  );

  embeds.forEach((el) => observer.observe(el));
})();
