const express = require('express');
const api = express.Router();
const uploadController = require('../controllers/upload.controller.js');

//cargar imagen de productos
api.post('/product/upload/image', uploadController.uploadProduct);


module.exports = api