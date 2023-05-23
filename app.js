const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");

const user_routes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
//const upload_routes = require('./routes/upload.routes');




app.set('view engine', 'ejs');

app.use(express.static("public"));
//Habilito realizar peticiones desde el navegador a mi backend
app.use(cors());
//Poder leer el body de una petición cuando es un json
app.use(express.json());
app.use(express.urlencoded({extended: true}))



app.use('/api', [
    user_routes,
    productRoutes,
    orderRoutes,
    //upload_routes,
    
]);

module.exports = app;
