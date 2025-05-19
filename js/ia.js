document.getElementById('form-cuento').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const personaje = document.getElementById('personaje').value;
    const lugar = document.getElementById('lugar').value;
    const tipo = document.getElementById('tipo-aventura').value;
    const mensaje = document.getElementById('mensaje').value;

    const emojiPorTipo = {
      fantasia: "🧚‍♀️🏰🐉",
      espacial: "🚀🌌🪐",
      animales: "🐾🦁🐰",
      comico: "🤡🎈😂",
      misterio: "🕵️‍♀️🔎🌙"
    };

    let emojis = emojiPorTipo[tipo] || "🌟📖";

    let cuento = `${emojis}\n\nHabía una vez un niñ@ llamado ${nombre} que conoció a ${personaje}. ` +
      `Juntos se embarcaron en una aventura ${tipo} en el mágico lugar llamado ${lugar}. ` +
      `En su camino, vivieron momentos increíbles, vencieron desafíos y aprendieron el valor de la amistad.`;

    if (mensaje.trim() !== "") {
      cuento += `\n\n💌 ${nombre} nos dejó un mensaje especial: "${mensaje}".`;
    }

    cuento += `\n\n${emojis}\n\nY así terminó su gran aventura. ¡Hasta la próxima!`;

    // Ocultar el formulario
    document.getElementById('form-cuento').style.display = 'none';

    // Mostrar el cuento
    const resultado = document.createElement('div');
    resultado.style.marginTop = '2rem';
    resultado.style.background = '#fff8e1';
    resultado.style.padding = '1.5rem';
    resultado.style.borderRadius = '20px';
    resultado.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    resultado.style.fontFamily = "'Comic Neue', cursive";
    resultado.style.whiteSpace = 'pre-wrap';
    resultado.classList.add('cuento-generado');
    resultado.innerText = cuento;

    const container = document.querySelector('.generar-cuento');
    const existente = document.querySelector('.cuento-generado');
    if (existente) {
      existente.remove();
    }
    container.appendChild(resultado);

    // Mostrar botones
    const botonesDiv = document.querySelector('.botones-opciones');
    botonesDiv.innerHTML = `
      <button onclick="descargarCuento('${nombre}')" style="margin: 0.5rem;">📥 Descargar</button>
      <button onclick="guardarCuento()" style="margin: 0.5rem;">💾 Guardar</button>
      <button onclick="crearNuevo()" style="margin: 0.5rem;">🔁 Crear otro cuento</button>
    `;
    botonesDiv.style.display = 'block';

    // Guardar el texto del cuento para futuras funciones
    window.cuentoGenerado = cuento;
  });

  function descargarCuento(nombre) {
    const blob = new Blob([window.cuentoGenerado], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${nombre}_cuento.pdf`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  function guardarCuento() {
    alert("📚 ¡Cuento guardado en la memoria temporal! (Puedes integrar un backend luego)");
    // Aquí podrías guardar a localStorage, enviar a backend, etc.
  }

  function crearNuevo() {
    document.getElementById('form-cuento').reset();
    document.getElementById('form-cuento').style.display = 'block';

    const cuento = document.querySelector('.cuento-generado');
    if (cuento) cuento.remove();

    const botonesDiv = document.querySelector('.botones-opciones');
    botonesDiv.style.display = 'none';
    botonesDiv.innerHTML = '';
  }