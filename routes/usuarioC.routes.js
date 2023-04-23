const express = require('express');
const usuariocControllers = require('../controllers/usuarioC.controllers');
const authenticate = require('../middleware/autenticacion.middleware');

const route = express.Router();


route.post('/registro_usuario_admin', authenticate.decodeToken, usuariocControllers.registro_usuario_admin);
route.post('/login_usuario', usuariocControllers.login_usuario);
route.get('/listar_usuario_admin/:filtro?', authenticate.decodeToken, usuariocControllers.listar_usuario_admin);
route.get('/obtener_usuario_admin/:id', authenticate.decodeToken, usuariocControllers.obtener_usuario_admin);
route.put('/editar_usuario_admin/:id', authenticate.decodeToken, usuariocControllers.editar_usuario_admin);
route.put('/cambiar_estado_usuario_admin/:id', authenticate.decodeToken, usuariocControllers.cambiar_estado_usuario_admin);
// 







module.exports = route;