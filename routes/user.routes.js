const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller');
const jwtVerify = require('../middlewares/jwtVerify')
const isAdmin = require('../middlewares/isAdmin');


//leer usuarios
api.get('/users', jwtVerify , userController.getAllUsers)

//Crear usuario
api.post('/user', userController.postUser);

//leer usuario
api.get('/user/:id', jwtVerify, userController.getUser);

api.get('/user', userController.getAllUsers);

//Inicio
api.post('/login', userController.login)

//Eliminar usuario
api.delete('/users/:id', [ jwtVerify, isAdmin  ] ,userController.deleteUser);

//Modificar usuario
api.put('/users/:id/password', userController.updateUser);

//Modificar password
api.patch('/users/:id/password', userController.updatePassword);



module.exports = api;