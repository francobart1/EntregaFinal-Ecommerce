const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller');
const jwtVerify = require('../middlewares/jwtVerify')
const isAdmin = require('../middlewares/isAdmin');



api.get('/users', jwtVerify , userController.getAllUsers)

api.post('/user', userController.postUser);

api.get('/user/:id', jwtVerify ,userController.getUser);

api.get('/user', userController.getAllUsers);

api.post('/login', userController.login)

api.delete('/users/:id', [ jwtVerify, isAdmin  ] ,userController.deleteUser);

api.put('/users/:id', userController.updateUser);

api.patch('/users/:id/password', userController.updatePassword);



module.exports = api;