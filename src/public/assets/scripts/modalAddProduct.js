// Obtén referencias a los elementos HTML
const agregarProductoBtn = document.getElementById("agregarProducto");
const modal = document.getElementById("modal");
const cerrarModalBtn = document.getElementById("cerrarModal");

// Muestra la ventana modal cuando se hace clic en "Agregar Producto"
agregarProductoBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Oculta la ventana modal cuando se hace clic en el botón de cierre
cerrarModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// También, puedes ocultar la ventana modal si se hace clic fuera de ella
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
