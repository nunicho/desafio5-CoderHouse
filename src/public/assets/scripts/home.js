const socket = io()

// PARA TRAER LA LISTA ACTUALIZADA DE PRODUCTOS
socket.on("productosActualizados", (productos) => {
    actualizarListaProductos(productos);
});
function actualizarListaProductos(productos) {
  const listaProductos = document.getElementById("realTimeProductsList");  
  listaProductos.innerHTML = "";
  productos.forEach((producto) => {
    const listItem = document.createElement("li");
    
    // Crear un contenedor para el elemento y el botón de eliminación
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("product-item-container");

    // Agregar información del producto al elemento
    listItem.textContent = `Prod: id ${producto.id}, ${producto.title}, Precio: ${producto.price}, Stock ${producto.stock}`;

    // Crear la imagen y aplicar estilos
    const imagen = document.createElement("img");
    imagen.src = producto.thumbnail;
    imagen.alt = "Descripción de la imagen";
    imagen.style.maxWidth = "300px"; // Ancho máximo de 300px
    imagen.style.border = "2px solid red";
    imagen.style.margin = "10px";

    // Agregar la imagen al contenedor
    itemContainer.appendChild(imagen);

    // Crear el botón de eliminación
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete-button");

    // Agregar un evento de clic al botón de eliminación
    deleteButton.addEventListener("click", () => {
      // Emitir un evento de eliminación para el producto
      socket.emit("eliminarProducto", producto.id);
    });

    // Agregar el botón de eliminación al contenedor
    itemContainer.appendChild(deleteButton);

    // Agregar el contenedor al elemento de la lista
    listItem.appendChild(itemContainer);

    listaProductos.appendChild(listItem);
  });
}




