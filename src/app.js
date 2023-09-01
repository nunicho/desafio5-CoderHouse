const express = require('express')
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js')

const PORT=8080;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products',productsRouter)
app.use("/api/carts", cartsRouter);

app.use(express.static(__dirname+'/public'))

const server=app.listen(PORT,()=>{
console.log(`Server escuchando en puerto ${PORT}`);
})


