let intervalo;

// Función para iniciar cronómetro en la página de configuración (padres.html)
function iniciarCronometro(minutos) {
  clearInterval(intervalo);

  let tiempoRestante = minutos * 60;
  const minutosElemento = document.getElementById("minutos");
  const segundosElemento = document.getElementById("segundos");

  if (minutosElemento && segundosElemento) {
    function actualizarDisplay() {
      const mins = Math.floor(tiempoRestante / 60).toString().padStart(2, '0');
      const secs = (tiempoRestante % 60).toString().padStart(2, '0');
      minutosElemento.textContent = mins;
      segundosElemento.textContent = secs;
    }

    actualizarDisplay();

    intervalo = setInterval(() => {
      tiempoRestante--;
      actualizarDisplay();

      if (tiempoRestante <= 0) {
        clearInterval(intervalo);
        Swal.fire({
          title: "¡Tiempo finalizado!",
          text: "Se acabó el tiempo de lectura.",
          icon: "info",
          confirmButtonText: "Aceptar"
        });
      }
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const formConfig = document.getElementById('form-config');

  // Si estamos en padres.html (con el formulario)
  if (formConfig) {
    formConfig.addEventListener('submit', e => {
      e.preventDefault();
      const tiempo = parseInt(document.getElementById('tiempo-max').value);
      const edad = document.getElementById('edad-nino').value;

      Swal.fire({
        title: 'Configuración guardada',
        html: `Tiempo: <strong>${tiempo} min</strong><br>Edad: <strong>${edad}</strong>`,
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(() => {
        iniciarCronometro(tiempo);

        // Guardar tiempo y marca de inicio en localStorage
        localStorage.setItem("tiempoLectura", tiempo);
        localStorage.setItem("inicioLectura", Date.now());

        // Redirigir a index.html después de 1s
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      });
    });
  }

  // Si estamos en index.html (sin formulario)
  else {
    const tiempoGuardado = parseInt(localStorage.getItem("tiempoLectura"));
    const inicio = parseInt(localStorage.getItem("inicioLectura"));

    if (tiempoGuardado && inicio) {
      const alerta = document.getElementById("alerta-bootstrap");
      const btnVolver = document.getElementById("btn-volver");
      const minutosElemento = document.getElementById("minutos");
      const segundosElemento = document.getElementById("segundos");
      const totalSegundos = tiempoGuardado * 60;

      const actualizarCronometro = () => {
        const tiempoTranscurrido = Math.floor((Date.now() - inicio) / 1000);
        let tiempoRestante = totalSegundos - tiempoTranscurrido;

        if (tiempoRestante < 0) tiempoRestante = 0;

        const mins = Math.floor(tiempoRestante / 60).toString().padStart(2, '0');
        const secs = (tiempoRestante % 60).toString().padStart(2, '0');

        if (minutosElemento && segundosElemento) {
          minutosElemento.textContent = mins;
          segundosElemento.textContent = secs;
        }

        if (tiempoRestante <= 60 && alerta && alerta.style.display === "none") {
          alerta.style.display = "block";
          alerta.classList.add("show");
        }

        if (tiempoRestante === 0) {
          clearInterval(intervalo);
          localStorage.removeItem("tiempoLectura");
          localStorage.removeItem("inicioLectura");
          Swal.fire({
            title: "¡Tiempo finalizado!",
            text: "Se acabó el tiempo de lectura.",
            icon: "info",
            confirmButtonText: "Volver"
          }).then(() => {
            window.location.href = "padres.html";
          });
        }
      };

      actualizarCronometro();
      intervalo = setInterval(actualizarCronometro, 1000);

      if (btnVolver) {
        btnVolver.addEventListener("click", () => {
          window.location.href = "padres.html";
        });
      }
    }
  }
});
