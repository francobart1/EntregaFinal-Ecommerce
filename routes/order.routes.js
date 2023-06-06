const express = require('express');
const api = express.Router();
const ordersController = require('../controllers/order.controller');

//obtener todas las ordenes
api.get("/orders/:idUser/user",ordersController.getOrders)

//obtener una Orden por su id
api.get("/orders/:id",ordersController.getOrder)

//agregar una Orden
api.post("/orders",ordersController.addOrder)

//Borrar una Orden
api.delete("/orders/:id",ordersController.deleteOrder)

//actualizar una order
api.put("/orders/",ordersController.updateOrder)



module.exports = api;