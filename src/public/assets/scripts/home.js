const socket = io()

let nombre =prompt('Ingrese su nombre')

socket.on("bienvenida", data=>{
    console.log(data.message)
    socket.emit("identificacion", nombre)
})

socket.on('idCorrecto', data=>{
    console.log(data.message)
})

socket.on('nuevoUsuario', nombre =>{
    console.log(`${nombre} se ha unido al server`)
})

socket.on('nuevaTemperatura', (temperatura, fecha)=>{
    console.log(`${fecha} temperatura asciende a ${temperatura}°` )
    let pTemperatura = document.getElementById('temperatura')
    pTemperatura.innerHTML = `La temperatura es de ${temperatura} °`;
})