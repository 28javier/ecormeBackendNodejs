const express = require('express');
const productoControllers = require('../controllers/producto.controllers');
const authenticate = require('../middleware/autenticacion.middleware');
var multipart = require('connect-multiparty');



var path = multipart({ uploadDir: './uploads/productos' });
const route = express.Router();

route.post('/registro_producto_admin', [authenticate.decodeToken, path], productoControllers.registro_producto_admin);
route.get('/listar_productos_admin/:filtro?', [authenticate.decodeToken], productoControllers.listar_productos_admin);
route.get('/obtener_portada_producto/:img', productoControllers.obtener_portada_producto);
// obtener_producto_admin
route.get('/obtener_producto_admin/:id', [authenticate.decodeToken], productoControllers.obtener_producto_admin);
route.put('/editar_producto_admin/:id', [authenticate.decodeToken, path], productoControllers.editar_producto_admin);

// variedad
// registro_variedad_producto
route.post('/registro_variedad_producto', [authenticate.decodeToken], productoControllers.registro_variedad_producto);
route.get('/obtener_variedad_producto/:id', [authenticate.decodeToken], productoControllers.obtener_variedad_producto);
route.delete('/eliminar_variedad_producto/:id', [authenticate.decodeToken], productoControllers.eliminar_variedad_producto);





module.exports = route;