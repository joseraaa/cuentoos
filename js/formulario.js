document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cuento');
  const resultado = document.querySelector('.generar-cuento');
  const modal = document.getElementById("modal-lector");
  const cerrar = document.getElementById("cerrar-modal");
  const textoCuento = document.getElementById("texto-cuento");

  let utterance;
  let textoOriginal;
  let palabras = [];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const personaje = document.getElementById('personaje').value;
    const lugar = document.getElementById('lugar').value;
    const tipo = document.getElementById('tipo-aventura').value;
    const mensaje = document.getElementById('mensaje').value;

    resultado.innerHTML = '🌀 Generando tu cuento mágico...';

    try {
   const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://generador-cuentos.onrender.com';
 // <-- reemplaza con tu URL real

      const response = await fetch(`${baseURL}/api/crear-cuento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, personaje, lugar, tipo, mensaje })
      });

      const data = await response.json();

      if (data.cuento) {
        const cuentoTexto = data.cuento;

        resultado.innerHTML = `
          <h2>📚 Tu cuento:</h2>
          <p>${cuentoTexto.replace(/\n/g, '<br>')}</p>
          <div class="botones-opciones">
            <button id="descargar-pdf">📄 Descargar PDF</button>
          </div>
        `;

        // Activar botón de descarga
        document.getElementById('descargar-pdf').addEventListener('click', () => {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();

          const marginLeft = 15;
          const marginTop = 20;
          const lineHeight = 10;
          const pageHeight = doc.internal.pageSize.height;

          const cuentoFormateado = doc.splitTextToSize(cuentoTexto, 180);
          let y = marginTop;

          cuentoFormateado.forEach(linea => {
            if (y > pageHeight - marginTop) {
              doc.addPage();
              y = marginTop;
            }
            doc.text(linea, marginLeft, y);
            y += lineHeight;
          });

          doc.save(`cuento-${nombre}.pdf`);
        });

        // Mostrar botón de lectura
        const leerBtn = document.getElementById("leer-cuento");
        if (leerBtn) leerBtn.style.display = "inline-block";

      } else {
        resultado.innerHTML = '⚠️ No se pudo generar el cuento.';
      }
    } catch (error) {
      resultado.innerHTML = '❌ Error al conectar con el servidor.';
      console.error(error);
    }
  });

  // Modal lector
  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
    detenerCuento();
  });

  const leerBtn = document.getElementById("leer-cuento");
  if (leerBtn) {
    leerBtn.addEventListener("click", () => {
      const resultado = document.getElementById("resultadoCuento");
      const texto = resultado.innerText || resultado.textContent;

      if (texto && texto.includes("Tu cuento")) {
        const cuento = texto.replace("📚 Tu cuento:", "").trim();
        textoCuento.innerText = cuento;
        modal.style.display = "flex";
      }
    });
  }

  function narrarCuento() {
    detenerCuento(); // Reinicia si ya hay algo en reproducción

    textoOriginal = textoCuento.innerText;
    palabras = textoOriginal.split(/\s+/);

    // Envuelve cada palabra en un span
    textoCuento.innerHTML = palabras.map((palabra, i) =>
      `<span id="palabra-${i}">${palabra}</span>`
    ).join(" ");

    utterance = new SpeechSynthesisUtterance(textoOriginal);
    utterance.lang = 'es-ES';
    utterance.rate = 1;

    utterance.onboundary = (event) => {
      if (event.name === "word" && typeof event.charIndex !== "undefined") {
        const index = getWordIndex(textoOriginal, event.charIndex);
        const spans = document.querySelectorAll('#texto-cuento span');
        spans.forEach(span => span.classList.remove('highlight'));
        const actual = document.getElementById(`palabra-${index}`);
        if (actual) actual.classList.add('highlight');
      }
    };

    utterance.onend = () => {
      const spans = document.querySelectorAll('#texto-cuento span');
      spans.forEach(span => span.classList.remove('highlight'));
    };

    speechSynthesis.speak(utterance);
  }

  function pausarCuento() {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
    }
  }

  function reanudarCuento() {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  }

  function detenerCuento() {
    if (speechSynthesis.speaking || speechSynthesis.paused) {
      speechSynthesis.cancel();
    }
    const spans = document.querySelectorAll('#texto-cuento span');
    spans.forEach(span => span.classList.remove('highlight'));
  }

  function getWordIndex(text, charIndex) {
    const before = text.slice(0, charIndex);
    return before.trim().split(/\s+/).length - 1;
  }

  // Expone funciones para botones del HTML
  window.narrarCuento = narrarCuento;
  window.pausarCuento = pausarCuento;
  window.reanudarCuento = reanudarCuento;
  window.detenerCuento = detenerCuento;
});
