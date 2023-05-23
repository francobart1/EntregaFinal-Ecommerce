const express = require('express');
const api = express.Router();
const ordersController = require('../controllers/order.controller');

//obtener ordenes
api.get('/orders', ordersController.getOrders);

//obetener orden
api.get('/orders/:id', ordersController.getOrderByID);

//obtener por ID de usuario
api.get('/orders/user/:id', ordersController.getOrderByID);

//crear orden
api.post('/orders', ordersController.createOrder);

//modificar orden
api.put('/orders/:id', ordersController.UpdateOrder);

//eliminar orden
api.delete('/orders/:id', ordersController.deleteOrder);



module.exports = api;