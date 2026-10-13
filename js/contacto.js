/*
 * Formulario de contacto → WhatsApp
 * ------------------------------------------------------------
 * El sitio es estático (Vercel), así que no hay un servidor que
 * reciba el formulario. Al enviarlo se abre WhatsApp con la
 * consulta ya escrita, lista para mandar a la tienda.
 */
(function formularioContacto() {
  const WHATSAPP_NUMERO = '5492396594358'; // mismo número que las novedades

  const form = document.getElementById('form-contacto');
  if (!form) return;

  const estado = document.getElementById('form-estado');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validación nativa del navegador (campos required y email)
    if (!form.reportValidity()) return;

    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const mensaje = form.mensaje.value.trim();

    const texto = [
      `Hola! Soy ${nombre}.`,
      mensaje,
      correo ? `Mi email: ${correo}` : '',
    ].filter(Boolean).join('\n\n');

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
    const ventana = window.open(url, '_blank');
    if (ventana) ventana.opener = null;

    if (estado) {
      estado.textContent = ventana
        ? 'Abrimos WhatsApp con tu consulta. Solo falta tocar "Enviar".'
        : 'No pudimos abrir WhatsApp automáticamente.';
    }
    if (!ventana) window.location.href = url;
  });
})();
