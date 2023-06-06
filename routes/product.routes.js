const express = require('express');
const api = express.Router();
const productController = require('./../controllers/product.controller');
const uploadController = require('../controllers/upload.controller');
const jwtVerify = require('../middlewares/jwtVerify');
const isAdmin = require('../middlewares/isAdmin');


//obtener producto
api.get('/products', productController.getAllProducts);

//obtener un producto especifico
api.get('/product/:id', productController.getProduct);

//anadir un producto
api.post('/product', productController.addProduct);

//eliminar un producto
api.delete('/product/:id', [jwtVerify, isAdmin], productController.deleteProduct);


//api.post('/product',[jwtVerify, isAdmin], uploadController.uploadProduct, productController.addProduct);

//modificar un producto
api.put('/product/:id', [jwtVerify, isAdmin], productController.updateProduct);



module.exports = api;