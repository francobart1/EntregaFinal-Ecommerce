const express = require('express');
const api = express.Router();
const productController = require('./../controllers/product.controller');
const uploadController = require('../controllers/upload.controller');
const jwtVerify = require('../middlewares/jwtVerify');
const isAdmin = require('../middlewares/isAdmin');


//obtener producto
api.get('/products', productController.getAllProducts);

//obtener un producto especifico
api.get('/products/:id', productController.getProduct);

//anadir un producto
api.post('/products', productController.addProduct);

//eliminar un producto
api.delete('/products/:id', [jwtVerify, isAdmin], productController.deleteProduct);


api.put("/products/:id/image",[jwtVerify,isAdmin],uploadController.uploadProduct,productController.updateProduct)

//modificar un producto
api.put('/products/:id', [jwtVerify, isAdmin], productController.updateProduct);



module.exports = api;