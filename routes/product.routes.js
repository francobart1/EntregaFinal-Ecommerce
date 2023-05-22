const express = require('express');
const api = express.Router();
const productController = require('./../controllers/product.controller');
const uploadController = require('../controllers/upload.controller.js');
//obtener producto
api.get('/products', productController.getAllProducts);

api.get('/products/:id', productController.getProduct);
//obtener un producto especifico
//anadir un producto
api.post('/product', productController.addProduct);
//eliminar un producto
api.delete('/products/:id', productController.deleteProduct);
//modificar un producto

api.post('/product', uploadController.uploadProduct);

api.get('/product', productController.updateProduct);



module.exports = api;