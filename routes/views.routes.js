const express = require('express');
const api = express.Router();
const viewsController = require('../controllers/views.controller');


//la definicion de todas las rutas vistas y sus respectivos controladores
api.get('/', (req, res) => res.render('index'));

api.get('/contact', (req, res) => res.render('contact'));

api.get('/about-us', (req, res) => res.render('about-us'));

api.get('/admin-product', (req, res) => res.render('admin-product'));

api.get('/login', (req, res) => res.render('login'));

api.get('/order', (req, res) => res.render('order'));

api.get('/product-detail', (req, res) => res.render('product-detail'));

api.get('/register', (req, res) => res.render('register'));

api.get('/user-product', (req, res) => res.render('/user-product'));




module.exports = api;