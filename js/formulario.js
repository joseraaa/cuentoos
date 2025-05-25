document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cuento');
  const resultado = document.querySelector('.generar-cuento');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const personaje = document.getElementById('personaje').value;
    const lugar = document.getElementById('lugar').value;
    const tipo = document.getElementById('tipo-aventura').value;
    const mensaje = document.getElementById('mensaje').value;

    resultado.innerHTML = '🌀 Generando tu cuento mágico...';

    try {
      // Detectar entorno local o en producción
      const baseURL = window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : 'https://TUSERVIDORDEPLOY.com'; // <-- reemplaza con tu URL real

      const response = await fetch(`${baseURL}/api/crear-cuento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, personaje, lugar, tipo, mensaje })
      });

      const data = await response.json();

      if (data.cuento) {
        resultado.innerHTML = `<h2>📚 Tu cuento:</h2><p>${data.cuento.replace(/\n/g, '<br>')}</p>`;
      } else {
        resultado.innerHTML = '⚠️ No se pudo generar el cuento.';
      }
    } catch (error) {
      resultado.innerHTML = '❌ Error al conectar con el servidor.';
      console.error(error);
    }
  });
});
