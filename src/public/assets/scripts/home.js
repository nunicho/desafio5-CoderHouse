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
    listItem.textContent = `Prod: id ${producto.id}, ${producto.title}, Precio: ${producto.price}, Stock ${producto.stock}`;

    // Crear la imagen y aplicar estilos
    const imagen = document.createElement("img");
    imagen.src = producto.thumbnail;
    imagen.alt = "Descripción de la imagen";
    imagen.style.maxWidth = "50px"; 
    imagen.style.border = "2px solid red";
    imagen.style.margin = "5px";

    // Agregar la imagen al elemento de la lista
    listItem.appendChild(imagen);

    listaProductos.appendChild(listItem);
  });
}



socket.on('nuevaTemperatura', (temperatura, fecha)=>{
    console.log(`${fecha} temperatura asciende a ${temperatura}°` )
    let pTemperatura = document.getElementById('temperatura')
    pTemperatura.innerHTML = `La temperatura es de ${temperatura} °`;
})

socket.on("productoAgregado", (nuevoProducto) => {
  // Obtén el nombre del nuevo producto
  const nuevoProductoNombre = nuevoProducto.title; // Asegúrate de que esta propiedad sea correcta

  // Actualiza el contenido del párrafo 'ultimoProductoAgregado'
  let pAgregado = document.getElementById("ultimoProductoAgregado");
  pAgregado.innerHTML = `El último producto agregado es: ${nuevoProductoNombre}`;
});