const express = require('express')
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js')
const arrayProducts = require('./archivos/productos.json')


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



app.get("/", (req, res) => {
  let index = parseInt(req.query.index) || 0;
  const array = arrayProducts;
  const totalProducts = array.length;

   const lastIndex = array.length - 1;

  if (index < 0) {
    index = lastIndex;
  } else if (index >= totalProducts) {
    index = 0;
  }

  const product = array[index];

  res.header("Content-type", "text/html");
  res.status(200).render("products", {
    product: product,
    index: index,
  });
});

app.use(express.static(__dirname+'/public'))

const server=app.listen(PORT,()=>{
console.log(`Server escuchando en puerto ${PORT}`);
})


/*
const express = require('express')
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js')
const arrayProducts = require('./archivos/productos.json')


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



app.get("/", (req, res) => {
  let index = parseInt(req.query.index) || 0;
  const array = arrayProducts;
  const totalProducts = array.length;



  if (index < 0) {
    index = 0;
  } else if (index >= totalProducts) {
    index = totalProducts - 1;
  }

  const product = array[index];

  res.header("Content-type", "text/html");
  res.status(200).render("products", {
    product: product,
    index: index,
  });
});

app.use(express.static(__dirname+'/public'))

const server=app.listen(PORT,()=>{
console.log(`Server escuchando en puerto ${PORT}`);
})

*/