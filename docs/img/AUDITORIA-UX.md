# Auditoría UX de app-notas

## Heurísticas de Nielsen

| Heurística | Problema en la pantalla original | Solución aplicada |
|------------|----------------------------------|-------------------|
| Visibilidad del estado | Al agregar o eliminar una nota no aparecía ningún mensaje. | Mensaje visible después de cada acción («Nota agregada», «Nota eliminada») con `role="status"`. |
| Coincidencia con el mundo real | El botón decía «ok» y el título «APP DE NOTAS» estaba en mayúsculas y en 12 px. | Botón «Agregar nota», título claro «Mis notas» y botón «Eliminar» con verbo. |
| Control y libertad | La «x» y «BORRAR TODO» eliminaban al instante, sin confirmar ni deshacer. | Botón «Deshacer» tras eliminar y confirmación antes de eliminar todas las notas. |
| Prevención de errores | Se podían agregar notas vacías. | El botón «Agregar nota» está desactivado mientras el campo esté vacío o solo tenga espacios. |
| Reconocer, no recordar | El campo solo tenía placeholder («Nota»), que desaparece al escribir, y el select no tenía etiqueta. | `<label>` visible en cada campo y bloques numerados con `<fieldset>`. |

## Leyes de usabilidad

- **Ley de Fitts:** el botón «ok» medía unos 9 px de letra y casi no se podía pulsar. Ahora «Agregar nota» ocupa todo el ancho y mide 44 px de alto; «Eliminar todas las notas» es secundario y está separado.
- **Ley de Hick:** el select tenía 10 categorías a la vez. Ahora tiene solo 3 (Estudio, Trabajo y Personal), así se decide más rápido.
- **Ley de Miller:** todos los controles estaban sueltos en una sola fila. Ahora el formulario se divide en 2 bloques cortos y numerados.

## Accesibilidad

- Antes: `outline: none` ocultaba el foco, el texto #b5b5b5 tenía menos de 2:1 de contraste, la «x» no explicaba qué eliminaba y el título era un `<h4>`.
- Ahora: `<label for>` en cada campo, foco visible con `:focus-visible`, contraste mayor a 4.5:1, botones de al menos 44 px, `aria-label` en cada «Eliminar» y un solo `<h1>`.
- Colores definidos con variables CSS en `:root` y espaciado en múltiplos de 8.

## Lighthouse (Accesibilidad)

| Antes | Después |
|-------|---------|
| ![Antes](img/Ligthouse.png) | ![Después](img/lighthouse-despues.png) |