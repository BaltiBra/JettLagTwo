/*
 * Novedades del mes
 * ------------------------------------------------------------
 * Para agregar una novedad, sumá un objeto al array NOVEDADES.
 * Campos:
 *   titulo       (obligatorio) nombre de la obra
 *   autor        (obligatorio)
 *   tomo         texto libre: "Volumen 1", "Tomo único", etc.
 *   descripcion  1 o 2 oraciones cortas
 *   precio       número, en pesos (se formatea solo)
 *   fecha        texto de salida, ej. "9 de diciembre"
 *   imagen       ruta relativa a index.html
 *   alt          texto alternativo de la imagen
 *   cta          (opcional) texto del botón. Por defecto "Reservar"
 *   link         (opcional) destino del botón. Por defecto, WhatsApp
 *                con un mensaje ya escrito sobre ese título.
 */

const WHATSAPP_NUMERO = '5492396594358'; // 2396 594358 (Pehuajó)
const CARGA_INMEDIATA = 6; // las primeras N tapas se cargan enseguida (están a la vista)

const NOVEDADES = [
  {
    titulo: 'Ningen Shikkaku',
    autor: 'Junji Ito',
    tomo: 'Volumen 1',
    descripcion: 'La adaptación de Junji Ito de "Indigno de ser humano", la novela de Osamu Dazai.',
    precio: 1500,
    fecha: '9 de diciembre',
    imagen: 'images/1.jpg',
    alt: 'Tapa de Ningen Shikkaku volumen 1, de Junji Ito',
  },
  {
    titulo: 'Mieruko-chan',
    autor: 'Tomoki Izumi',
    tomo: 'Volumen 4',
    descripcion: 'Miko puede ver espíritus aterradores y hace lo imposible para fingir que no los ve.',
    precio: 1200,
    fecha: '9 de diciembre',
    imagen: 'images/6.jpg',
    alt: 'Tapa de Mieruko-chan volumen 4, de Tomoki Izumi',
  },
  {
    titulo: 'Beyond the Bad Dream',
    autor: 'Sachiko Uguisu',
    tomo: 'Tomo único',
    descripcion: 'Historia autoconclusiva en un solo tomo, para leer de una sentada.',
    precio: 1500,
    fecha: '9 de diciembre',
    imagen: 'images/2.jpg',
    alt: 'Tapa de Beyond the Bad Dream, de Sachiko Uguisu',
  },
  {
    titulo: 'Wanted!',
    autor: 'Eiichiro Oda',
    tomo: 'Tomo único',
    descripcion: 'Las historias cortas que Eiichiro Oda dibujó antes de crear One Piece.',
    precio: 990,
    fecha: '9 de diciembre',
    imagen: 'images/3.jpg',
    alt: 'Tapa de Wanted!, de Eiichiro Oda',
  },
  {
    titulo: 'My Hero Academia: Team Up Mission',
    autor: 'Yoko Akiyama',
    tomo: 'Volumen 1',
    descripcion: 'Spin-off de My Hero Academia: estudiantes de distintas escuelas forman equipo en misiones.',
    precio: 990,
    fecha: '9 de diciembre',
    imagen: 'images/4.jpg',
    alt: 'Tapa de My Hero Academia Team Up Mission volumen 1, de Yoko Akiyama',
  },
  {
    titulo: 'Aku no Hana',
    autor: 'Shuzo Oshimi',
    tomo: 'Volumen 2',
    descripcion: 'Kasuga carga con un secreto que Nakamura conoce y está dispuesta a usar en su contra.',
    precio: 990,
    fecha: '9 de diciembre',
    imagen: 'images/5.jpg',
    alt: 'Tapa de Aku no Hana volumen 2, de Shuzo Oshimi',
  },
];

(function renderNovedades() {
  const lista = document.getElementById('novedades-lista');
  if (!lista) return;

  const formatoPrecio = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  });

  const crear = (tag, clase, texto) => {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto != null) el.textContent = texto;
    return el;
  };

  const linkWhatsapp = (n) => {
    const mensaje = `Hola! Quiero reservar ${n.titulo}${n.tomo ? ` (${n.tomo})` : ''}.`;
    return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
  };

  const fragmento = document.createDocumentFragment();

  NOVEDADES.forEach((n, i) => {
    const card = crear('article', 'novedad');
    card.id = `novedad-${i + 1}`;

    const figura = crear('div', 'novedad__media');
    const img = crear('img', 'novedad__img');
    img.src = n.imagen;
    img.alt = n.alt || `Tapa de ${n.titulo}`;
    img.width = 300;
    img.height = 300;
    img.loading = i < CARGA_INMEDIATA ? 'eager' : 'lazy';
    img.decoding = 'async';
    figura.appendChild(img);
    if (n.fecha) figura.appendChild(crear('span', 'novedad__fecha', n.fecha));

    const cuerpo = crear('div', 'novedad__body');
    cuerpo.appendChild(crear('h3', 'novedad__title', n.titulo));
    const meta = [n.tomo, n.autor && `de ${n.autor}`].filter(Boolean).join(' · ');
    if (meta) cuerpo.appendChild(crear('p', 'novedad__meta', meta));
    if (n.descripcion) cuerpo.appendChild(crear('p', 'novedad__desc', n.descripcion));

    const pie = crear('div', 'novedad__footer');
    if (typeof n.precio === 'number') {
      pie.appendChild(crear('span', 'novedad__precio', formatoPrecio.format(n.precio)));
    }
    const boton = crear('a', 'novedad__btn', n.cta || 'Reservar');
    boton.href = n.link || linkWhatsapp(n);
    if (!n.link) {
      boton.target = '_blank';
      boton.rel = 'noopener';
    }
    boton.setAttribute('aria-label', `${n.cta || 'Reservar'} ${n.titulo}`);
    pie.appendChild(boton);
    cuerpo.appendChild(pie);

    card.append(figura, cuerpo);
    fragmento.appendChild(card);
  });

  lista.replaceChildren(fragmento);
})();
