const formulario = document.getElementById("formulario");
const campoNota = document.getElementById("nota");
const categoria = document.getElementById("categoria");
const botonAgregar = document.getElementById("agregar");
const botonBorrarTodo = document.getElementById("borrar-todo");
const lista = document.getElementById("lista");
const vacio = document.getElementById("vacio");
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");

let notas = [];
let copiaAnterior = [];
let siguienteId = 1;
let temporizador = null;

function mostrarMensaje(texto, tipo, conDeshacer) {
  clearTimeout(temporizador);
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;

  if (conDeshacer) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton-enlace";
    boton.textContent = "Deshacer";
    boton.addEventListener("click", deshacer);
    mensaje.appendChild(boton);
  }

  temporizador = setTimeout(function () {
    mensaje.textContent = "";
    mensaje.className = "mensaje";
  }, 8000);
}

function renderizar() {
  lista.innerHTML = "";

  notas.forEach(function (nota) {
    const item = document.createElement("li");
    item.className = "nota";

    const texto = document.createElement("span");
    texto.textContent = nota.texto + " ";

    const etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta";
    etiqueta.textContent = nota.categoria;
    texto.appendChild(etiqueta);

    const eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.className = "boton-secundario";
    eliminar.textContent = "Eliminar";
    eliminar.setAttribute("aria-label", "Eliminar la nota: " + nota.texto);
    eliminar.addEventListener("click", function () {
      eliminarNota(nota.id);
    });

    item.appendChild(texto);
    item.appendChild(eliminar);
    lista.appendChild(item);
  });

  contador.textContent = notas.length === 1 ? "1 nota" : notas.length + " notas";
  vacio.hidden = notas.length > 0;
  botonBorrarTodo.disabled = notas.length === 0;
}

function actualizarBoton() {
  botonAgregar.disabled = campoNota.value.trim() === "";
}

function eliminarNota(id) {
  copiaAnterior = notas.slice();
  notas = notas.filter(function (nota) { return nota.id !== id; });
  renderizar();
  mostrarMensaje("Nota eliminada.", "info", true);
}

function deshacer() {
  notas = copiaAnterior.slice();
  renderizar();
  mostrarMensaje("Acción deshecha: tus notas volvieron.", "exito", false);
}

campoNota.addEventListener("input", actualizarBoton);

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const texto = campoNota.value.trim();

  if (texto === "") {
    mostrarMensaje("Escribe algo antes de agregar la nota.", "error", false);
    return;
  }

  notas.push({ id: siguienteId++, texto: texto, categoria: categoria.value });
  formulario.reset();
  actualizarBoton();
  renderizar();
  mostrarMensaje("Nota agregada.", "exito", false);
  campoNota.focus();
});

botonBorrarTodo.addEventListener("click", function () {
  if (!confirm("¿Seguro que quieres eliminar todas tus notas?")) {
    return;
  }
  copiaAnterior = notas.slice();
  notas = [];
  renderizar();
  mostrarMensaje("Todas las notas fueron eliminadas.", "info", true);
});

renderizar();