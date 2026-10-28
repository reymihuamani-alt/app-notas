const lista = document.getElementById("lista");

document.getElementById("agregar").addEventListener("click", function () {
  const nota = document.getElementById("nota").value;
  const categoria = document.getElementById("categoria").value;

  const li = document.createElement("li");
  li.textContent = nota + " (" + categoria + ") ";

  const x = document.createElement("a");
  x.href = "#";
  x.textContent = "x";
  x.addEventListener("click", function (e) {
    e.preventDefault();
    li.remove();
  });

  li.appendChild(x);
  lista.appendChild(li);
});

document.getElementById("borrar").addEventListener("click", function (e) {
  e.preventDefault();
  lista.innerHTML = "";
});