const todosCuentos = [
  {
    id: 1,
    titulo: 'La tortuga y la liebre',
    tipo: 'tradicional',
    descripcion: 'Una fábula sobre la constancia y la humildad.',
    img: 'assets/img/liebre.jpg',
    link: 'conejo.html',
    categorias: ['fábula']
  },
  {
    id: 2,
    titulo: 'El patito feo',
    tipo: 'tradicional',
    descripcion: 'Un cuento de aceptación de sí mismo.',
    img: 'assets/img/cuento2.jpg',
    link: 'patito.html',
    categorias: ['fábula', 'fantasía']
  },
  {
    id: 3,
    titulo: 'Caperucita Roja',
    tipo: 'tradicional',
    descripcion: 'Una niña va a casa de su abuela y se encuentra con un lobo.',
    img: 'assets/img/caperucita.jpg',
    link: 'caperucita.html',
    categorias: ['fábula', 'aventura']
  },
  {
    id: 4,
    titulo: 'Los tres cerditos',
    tipo: 'tradicional',
    descripcion: 'Tres cerditos construyen casas y enfrentan a un lobo feroz.',
    img: 'assets/img/cerditos.jpeg',
    link: 'cerditos.html',
    categorias: ['fábula']
  },
  {
    id: 5,
    titulo: 'Aventura en la isla secreta',
    descripcion: 'Un grupo de niños descubre una isla llena de misterios.',
    img: 'assets/img/isla.jpeg',
    link: 'isla.html',
    categorias: ['aventura']
  },
  {
    id: 6,
    titulo: 'El guardián del planeta rojo',
    descripcion: 'Una misión espacial que cambia el destino de la humanidad.',
    img: 'assets/img/planeta.jpg',
    link: 'planeta.html',
    categorias: ['espacial', 'aventura']
  },
  {
    id: 7,
    titulo: 'La bruja del lago encantado',
    descripcion: 'Una historia mágica llena de hechizos y criaturas misteriosas.',
    img: 'assets/img/bruja.jpg',
    link: 'bruja.html',
    categorias: ['fantasía']
  },
  {
    id: 8,
    titulo: 'La ardilla sabia y el zorro travieso',
    tipo: 'tradicional',
    descripcion: 'Una fábula sobre la astucia y la sabiduría.',
    img: 'assets/img/ardilla.jpg',
    link: 'ardilla.html',
    categorias: ['fábula']
  },
  {
    id: 9,
    titulo: 'Exploradores de galaxias',
    descripcion: 'Viajes intergalácticos con descubrimientos increíbles.',
    img: 'assets/img/galaxia.jpg',
    link: 'galaxia.html',
    categorias: ['espacial']
  },
  {
    id: 10,
    titulo: 'El castillo invisible',
    descripcion: 'Un castillo que aparece solo a los valientes.',
    img: 'assets/img/castillo.jpg',
    link: 'castillo.html',
    categorias: ['fantasía']
  },
  {
    id: 11,
    titulo: 'La carrera del río veloz',
    descripcion: 'Animales compiten en una carrera por el río.',
    img: 'assets/img/rio.jpg',
    link: 'rio.html',
    categorias: ['fábula', 'aventura']
  },
  {
    id: 12,
    titulo: 'Misiones en la luna azul',
    descripcion: 'Niños astronautas enfrentan retos fuera de este mundo.',
    img: 'assets/img/luna.jpg',
    link: 'luna.html',
    categorias: ['espacial']
  }
];

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderCuentos(filter) {
  const contenedor = document.getElementById('lista-cuentos');
  contenedor.innerHTML = '';

  const cuentosFiltrados = filter && filter !== 'todos'
    ? todosCuentos.filter(c => c.tipo === filter)
    : todosCuentos;

  cuentosFiltrados.forEach(cuento => {
    const categoriasHTML = cuento.categorias && cuento.categorias.length
      ? `<p class="categorias"><strong>Categorías:</strong> ${cuento.categorias.join(', ')}</p>`
      : '';

    const card = document.createElement('div');
    card.className = 'story-card';
    card.innerHTML = `
      <img src="${cuento.img}" alt="${cuento.titulo}">
      <div class="card-content">
        <h2>${cuento.titulo}</h2>
        <p>${cuento.descripcion}</p>
        ${categoriasHTML}
        <a class="btn-leer" href="${cuento.link}">Leer</a>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

function leer(id) {
  alert(`Abriendo cuento con ID ${id}`);
}

document.addEventListener('DOMContentLoaded', () => {
  const tipo = getQueryParam('tipo') || 'todos';
  renderCuentos(tipo);

  document.querySelectorAll('#filtros button').forEach(btn => {
    btn.addEventListener('click', () => {
      const tipoSeleccionado = btn.dataset.tipo;

      if (tipoSeleccionado === 'ia') {
        window.location.href = 'cuentos-ia.html';
      } else {
        renderCuentos(tipoSeleccionado);
      }
    });
  });
});
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderCuentos(tipoFiltro = 'todos', categoriaFiltro = 'todas') {
  const contenedor = document.getElementById('lista-cuentos');
  contenedor.innerHTML = '';

  let cuentosFiltrados = todosCuentos;

  // Filtro por tipo si se aplica
  if (tipoFiltro !== 'todos') {
    cuentosFiltrados = cuentosFiltrados.filter(c => c.tipo === tipoFiltro);
  }

  // Filtro por categoría si se aplica
  if (categoriaFiltro !== 'todas') {
    cuentosFiltrados = cuentosFiltrados.filter(c =>
      c.categorias && c.categorias.includes(categoriaFiltro)
    );
  }

  // Mostrar resultados
  cuentosFiltrados.forEach(cuento => {
    const categoriasHTML = cuento.categorias && cuento.categorias.length
      ? `<p class="categorias"><strong>Categorías:</strong> ${cuento.categorias.join(', ')}</p>`
      : '';

    const card = document.createElement('div');
    card.className = 'story-card';
    card.innerHTML = `
      <img src="${cuento.img}" alt="${cuento.titulo}">
      <div class="card-content">
        <h2>${cuento.titulo}</h2>
        <p>${cuento.descripcion}</p>
        ${categoriasHTML}
        <a class="btn-leer" href="${cuento.link}">Leer</a>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

function leer(id) {
  alert(`Abriendo cuento con ID ${id}`);
}

document.addEventListener('DOMContentLoaded', () => {
  let tipo = getQueryParam('tipo') || 'todos';
  let categoria = 'todas';
  renderCuentos(tipo, categoria);

  // Botones de tipo
  document.querySelectorAll('#filtros button').forEach(btn => {
    btn.addEventListener('click', () => {
      tipo = btn.dataset.tipo;

      if (tipo === 'ia') {
        window.location.href = 'cuentos-ia.html';
      } else {
        renderCuentos(tipo, categoria); // filtramos usando tipo + categoría
      }
    });
  });

  // Select de categorías
  const selectCategoria = document.getElementById('select-categoria');
  selectCategoria.addEventListener('change', () => {
    categoria = selectCategoria.value;
    renderCuentos(tipo, categoria); // actualiza usando categoría y tipo actual
  });
});
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderCuentos(tipoFiltro = 'todos', categoriaFiltro = 'todas', palabraClave = '') {
  const contenedor = document.getElementById('lista-cuentos');
  contenedor.innerHTML = '';

  let cuentosFiltrados = todosCuentos;

  // Filtro por tipo
  if (tipoFiltro !== 'todos') {
    cuentosFiltrados = cuentosFiltrados.filter(c => c.tipo === tipoFiltro);
  }

  // Filtro por categoría
  if (categoriaFiltro !== 'todas') {
    cuentosFiltrados = cuentosFiltrados.filter(c =>
      c.categorias && c.categorias.includes(categoriaFiltro)
    );
  }

  // Filtro por palabra clave (en el título)
  if (palabraClave.trim() !== '') {
    const palabra = palabraClave.trim().toLowerCase();
    cuentosFiltrados = cuentosFiltrados.filter(c =>
      c.titulo.toLowerCase().includes(palabra)
    );
  }

  // Mostrar resultados
  cuentosFiltrados.forEach(cuento => {
    const categoriasHTML = cuento.categorias && cuento.categorias.length
      ? `<p class="categorias"><strong>Categorías:</strong> ${cuento.categorias.join(', ')}</p>`
      : '';

    const card = document.createElement('div');
    card.className = 'story-card';
    card.innerHTML = `
      <img src="${cuento.img}" alt="${cuento.titulo}">
      <div class="card-content">
        <h2>${cuento.titulo}</h2>
        <p>${cuento.descripcion}</p>
        ${categoriasHTML}
        <a class="btn-leer" href="${cuento.link}">Leer</a>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let tipo = getQueryParam('tipo') || 'todos';
  let categoria = 'todas';
  let palabraClave = '';

  renderCuentos(tipo, categoria, palabraClave);

  // Filtros por tipo
  document.querySelectorAll('#filtros button').forEach(btn => {
    btn.addEventListener('click', () => {
      tipo = btn.dataset.tipo;

      if (tipo === 'ia') {
        window.location.href = 'cuentos-ia.html';
      } else {
        renderCuentos(tipo, categoria, palabraClave);
      }
    });
  });

  // Filtro por categoría
  const selectCategoria = document.getElementById('select-categoria');
  selectCategoria.addEventListener('change', () => {
    categoria = selectCategoria.value;
    renderCuentos(tipo, categoria, palabraClave);
  });

  // Búsqueda por palabra clave
  const inputBusqueda = document.getElementById('input-busqueda');
  inputBusqueda.addEventListener('input', () => {
    palabraClave = inputBusqueda.value;
    renderCuentos(tipo, categoria, palabraClave);
  });
});
