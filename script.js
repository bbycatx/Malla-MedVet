// Datos de prerrequisitos (usa los ids de los botones)
const prerequisitos = {
  "bioquímica": ["biología-celular", "laboratorio-biología-celular"],
  "agresión-y-defensa-orgánica-1": ["biología-celular", "laboratorio-biología-celular"],
  "cuerpo-animal-1": ["biología-celular", "laboratorio-biología-celular", "zoología"],

  "función-y-disfunción-orgánica-1": ["cuerpo-animal-1"],
  "agresión-y-defensa-orgánica-2": ["bioquímica", "agresión-y-defensa-orgánica-1"],
  "cuerpo-animal-2": ["cuerpo-animal-1"],
  "métodos-cuantitativos-rrnn": ["matemáticas-general"],
  "inglés-2": ["inglés-1"],

  "función-y-disfunción-orgánica-2": ["función-y-disfunción-orgánica-1", "agresión-y-defensa-orgánica-2"],
  "genética": ["métodos-cuantitativos-rrnn"],
  "ecología-general": ["métodos-cuantitativos-rrnn"],
  "anatomía-clínica": ["cuerpo-animal-2", "función-y-disfunción-orgánica-1"],
  "inglés-3": ["inglés-2"],

  "biología-de-la-conservación": ["ecología-general"],
  "anatomía-patológica": ["cuerpo-animal-2", "función-y-disfunción-orgánica-2"],
  "enfermedades-de-organismos-acuáticos": ["agresión-y-defensa-orgánica-2"],
  "farmacología": ["función-y-disfunción-orgánica-2"],
  "nutrición-y-alimentación-animal": ["genética"],
  "inglés-4": ["inglés-3"],

  "epidemiología-y-salud-pública": ["función-y-disfunción-orgánica-2", "métodos-cuantitativos-rrnn"],
  "imagenología": ["anatomía-patológica"],
  "patología-clínica": ["anatomía-clínica", "función-y-disfunción-orgánica-2"],
  "reproducción": ["función-y-disfunción-orgánica-1", "cuerpo-animal-2"],
  "razonamiento-cientifico-y-tics": ["habilidades-comunicativas"],

  "inocuidad-de-los-alimentos": ["epidemiología-y-salud-pública"],
  "manejo-de-fauna-silvestre": ["biología-de-la-conservación", "función-y-disfunción-orgánica-1"],
  "legislación-y-evaluación-de-impacto-ambiental": ["ecología-general", "biología-de-la-conservación"],
  "medicina": ["función-y-disfunción-orgánica-2", "anatomía-clínica", "farmacología"],
  "sistema-de-producción-animal": ["nutrición-y-alimentación-animal", "reproducción", "enfermedades-de-organismos-acuáticos"],

  "zoonosis-y-enfermedades-emergentes": ["inocuidad-de-los-alimentos"],
  "patología-molecular": ["patología-clínica"],
  "cirugía": ["medicina", "imagenología"],
  "formulación-y-evaluación-de-proyectos-de-rrnn": ["legislación-y-evaluación-de-impacto-ambiental"],
  "integrador-1-práctica-profesional": ["medicina", "imagenología"],

  "ética-y-bienestar-animal": ["sistema-de-producción-animal", "manejo-de-fauna-silvestre"],
  "innovación-y-transferencia-tecnológica": ["formulación-y-evaluación-de-proyectos-de-rrnn"],
  "clínica": ["cirugía", "patología-clínica"],
  "pensamiento-crítico": ["razonamiento-cientifico-y-tics", "habilidades-comunicativas"],
  "proyecto-de-título": ["zoonosis-y-enfermedades-emergentes", "cirugía", "patología-molecular", "formulación-y-evaluación-de-proyectos-de-rrnn", "integrador-1-práctica-profesional"],

  "electivo-profesional-1": ["zoonosis-y-enfermedades-emergentes", "patología-molecular", "clínica", "cirugía", "integrador-1-práctica-profesional", "formulación-y-evaluación-de-proyectos-de-rrnn"],
  "electivo-profesional-2": ["zoonosis-y-enfermedades-emergentes", "patología-molecular", "clínica", "cirugía", "integrador-1-práctica-profesional", "formulación-y-evaluación-de-proyectos-de-rrnn"],
  "responsabilidad-social": ["pensamiento-crítico"],
  "integrador-2-internado": ["clínica", "ética-y-bienestar-animal"],
};

// Función para cargar aprobados desde localStorage
function cargarAprobados() {
  const data = localStorage.getItem("aprobados");
  return data ? JSON.parse(data) : {};
}

// Guardar aprobados en localStorage
function guardarAprobados(aprobados) {
  localStorage.setItem("aprobados", JSON.stringify(aprobados));
}

// Verificar si los prerrequisitos están aprobados
function prerrequisitosCumplidos(ramo, aprobados) {
  const pre = prerequisitos[ramo];
  if (!pre) return true; // Sin prerrequisitos
  return pre.every(p => aprobados[p]);
}

// Actualizar el estado visual y bloqueo
function actualizarEstados() {
  const aprobados = cargarAprobados();

  document.querySelectorAll(".ramo").forEach(boton => {
    const id = boton.id;
    const cumple = prerrequisitosCumplidos(id, aprobados);

    if (!cumple) {
      boton.classList.add("bloqueado");
      boton.classList.remove("aprobado");
      boton.disabled = true;
    } else {
      boton.classList.remove("bloqueado");
      boton.disabled = false;

      if (aprobados[id]) {
        boton.classList.add("aprobado");
      } else {
        boton.classList.remove("aprobado");
      }
    }
  });
}

// Evento para cambiar estado aprobado al hacer click
function clickRamo(event) {
  const boton = event.target;
  if (boton.classList.contains("bloqueado")) return;

  const id = boton.id;
  const aprobados = cargarAprobados();

  aprobados[id] = !aprobados[id]; // Alternar estado
  guardarAprobados(aprobados);
  actualizarEstados();
}

// Inicialización
function init() {
  // Añadir evento click a cada ramo
  document.querySelectorAll(".ramo").forEach(boton => {
    boton.addEventListener("click", clickRamo);
  });

  actualizarEstados();
}

// Ejecutar cuando la página cargue
window.addEventListener("DOMContentLoaded", init);
