const express = require('express')
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js')
const vistasRouter = require("./routes/vistas.router.js");

const http = require("http"); // Importa el módulo http para crear el servidor HTTP.
const socketIO = require("socket.io");



// HANDLEBARS - importación
const handlebars = require('express-handlebars')

const PORT=8080;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/products',productsRouter)
app.use("/api/carts", cartsRouter);

// HANDLEBARS - inicialización

const hbs = handlebars.create({
  helpers: {
    add: function (value, addition) {
      return value + addition;
    },
    subtract: function (value, subtraction) {
      return value - subtraction;
    },
  },
});



app.engine('handlebars', hbs.engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', vistasRouter)

app.use(express.static(__dirname+'/public'))

const serverExpress=app.listen(PORT,()=>{
console.log(`Server escuchando en puerto ${PORT}`);
})

const serverSocket = socketIO(serverExpress);

serverSocket.on('connection', socket=>{
  console.log(`Se ha conectado un cliente con un id ${socket.id}`)

  socket.emit('bienvenida', {message:'Bienvenido al server...!!! Por favor identifíquese'})
  socket.on('identificacion', nombre=>{
    console.log(`se ha conectado ${nombre}`)
    socket.emit('idCorrecto', {message:`Hola  ${nombre}, bienvenido`})
    socket.broadcast.emit('nuevoUsuario', nombre)
  })
  
})
setInterval(()=>{
  let temperatura = Math.floor(Math.random()*(4)+27)
serverSocket.emit("nuevaTemperatura", temperatura, new Date().toUTCString());
},3000)

