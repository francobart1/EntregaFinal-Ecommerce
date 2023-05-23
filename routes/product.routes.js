const express = require('express');
const api = express.Router();
const productController = require('./../controllers/product.controller');
//const uploadController = require('../controllers/upload.controller.js');


//obtener producto
api.get('/products', productController.getAllProducts);

//obtener un producto especifico
api.get('/product/:id', productController.getProduct);

//anadir un producto
api.post('/product', productController.addProduct);

//eliminar un producto
api.delete('/product/:id', productController.deleteProduct);


//api.post('/product', uploadController.uploadProduct);

//modificar un producto
api.put('/product/', productController.updateProduct);



module.exports = api;