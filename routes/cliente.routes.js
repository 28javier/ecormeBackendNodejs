const express = require('express');
const clienteControllers = require('../controllers/cliente.controllers');

const route = express.Router();


route.get('/testing', clienteControllers.testing);




module.exports = route;