const Producto = require('../models/producto.model');
const Variedad = require('../models/variedad.model');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');


slugify('some string', '_');



const registro_producto_admin = async function (req, resp) {
    if (req.user) {

        let data = req.body;
        let productos = await Producto.find({ titulo: data.titulo });
        console.log(productos.length);
        // resp.status(200).send({ usuario, message: 'Listado de Usuarios' });
        if (productos.length >= 1) {
            resp.status(200).send({ data: undefined, message: 'El titulo ya existe cambie por otro' });
        } else {
            // registro productos
            let img_patch = req.files.portada.path;
            let str_img = img_patch.split('\\');
            let str_portada = str_img[2];
            // console.log(req.files);
            // console.log(img_patch);
            console.log(str_portada);
            ////
            data.portada = str_portada;
            data.slug = slugify(data.titulo);
            console.log(data);
            try {
                let producto = await Producto.create(data);
                resp.status(200).send({ data: producto });
            } catch (error) {
                resp.status(200).send({ data: undefined, message: 'No se pudo guardar el producto' });
            }

        }

    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }
}

const listar_productos_admin = async function (req, resp) {
    if (req.user) {
        let filtro = req.params['filtro'];
        let productos = await Producto.find({
            $or: [
                { titulo: new RegExp(filtro, 'i') },
                { categoria: new RegExp(filtro, 'i') }
            ]
        }).sort({ createdAt: -1 });
        resp.status(200).send({ data: productos, message: 'Listado de Usuarios' });

    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }
}

const obtener_portada_producto = async function (req, resp) {
    let img = req.params['img'];
    fs.stat('./uploads/productos/' + img, function (err) {
        if (err) {
            let path_img = './uploads/default.jpg';
            resp.status(200).sendFile(path.resolve(path_img));
        } else {
            let path_img = './uploads/productos/' + img;
            resp.status(200).sendFile(path.resolve(path_img));
        }
    })
}

const obtener_producto_admin = async function (req, resp) {
    if (req.user) {
        let id = req.params['id'];
        try {
            let producto = await Producto.findById({ _id: id })
            resp.status(200).send(producto);
        } catch (error) {
            resp.status(400).send(undefined);
        }

    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }
}

const editar_producto_admin = async function (req, resp) {
    if (req.user) {
        let data = req.body;
        let id = req.params['id'];
        let productos = await Producto.find({ titulo: data.titulo });
        // console.log(productos.length);
        if (productos.length >= 1) {
            // resp.status(200).send({ data: undefined, message: 'El titulo ya existe cambie por otro' });
            if (productos[0]._id == id) {
                if (req.files) {
                    // registro productos
                    let img_patch = req.files.portada.path;
                    let str_img = img_patch.split('\\');
                    let str_portada = str_img[2];
                    // console.log(req.files);
                    // console.log(img_patch);
                    console.log(str_portada);
                    ////
                    data.portada = str_portada;
                    data.slug = slugify(data.titulo);
                    console.log(data);
                    try {
                        let producto = await Producto.findByIdAndUpdate({ _id: id }, {
                            titulo: data.titulo,
                            categoria: data.categoria,
                            extracto: data.extracto,
                            estado: data.estado,
                            str_variedad: data.str_variedad,
                            descuento: data.descuento,
                            portada: data.portada
                        });
                        resp.status(200).send({ data: producto, message: 'Produccto Modificado correctamente' });
                    } catch (error) {
                        resp.status(200).send({ data: undefined, message: 'No se pudo guardar el producto' });
                    }
                } else {
                    data.slug = slugify(data.titulo);
                    console.log(data);
                    try {
                        let producto = await Producto.findByIdAndUpdate({ _id: id }, {
                            titulo: data.titulo,
                            categoria: data.categoria,
                            extracto: data.extracto,
                            estado: data.estado,
                            str_variedad: data.str_variedad,
                            descuento: data.descuento
                        });
                        resp.status(200).send({ data: producto });
                    } catch (error) {
                        resp.status(200).send({ data: undefined, message: 'No se pudo guardar el producto' });
                    }
                }
            } else {
                resp.status(200).send({ data: undefined, message: 'El titulo ya existe cambie por otro' });
            }
        } else {
            if (req.files) {
                // registro productos
                let img_patch = req.files.portada.path;
                let str_img = img_patch.split('\\');
                let str_portada = str_img[2];
                // console.log(req.files);
                // console.log(img_patch);
                console.log(str_portada);
                ////
                data.portada = str_portada;
                data.slug = slugify(data.titulo);
                console.log(data);
                try {
                    let producto = await Producto.findByIdAndUpdate({ _id: id }, {
                        titulo: data.titulo,
                        categoria: data.categoria,
                        extracto: data.extracto,
                        estado: data.estado,
                        str_variedad: data.str_variedad,
                        descuento: data.descuento,
                        portada: data.portada
                    });
                    resp.status(200).send({ data: producto, message: 'Produccto Modificado correctamente' });
                } catch (error) {
                    resp.status(200).send({ data: undefined, message: 'No se pudo guardar el producto' });
                }
            } else {
                data.slug = slugify(data.titulo);
                console.log(data);
                try {
                    let producto = await Producto.findByIdAndUpdate({ _id: id }, {
                        titulo: data.titulo,
                        categoria: data.categoria,
                        extracto: data.extracto,
                        estado: data.estado,
                        str_variedad: data.str_variedad,
                        descuento: data.descuento
                    });
                    resp.status(200).send({ data: producto });
                } catch (error) {
                    resp.status(200).send({ data: undefined, message: 'No se pudo guardar el producto' });
                }
            }
        }
    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }
}

// seccion variedades

const registro_variedad_producto = async function (req, resp) {
    if (req.user) {
        let data = req.body;
        let variedad = await Variedad.create(data)
        resp.status(200).send({ data: variedad });
    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }
}
const obtener_variedad_producto = async function (req, resp) {
    if (req.user) {
        let id = req.params['id'];
        let variedades = await Variedad.find({ producto: id }).sort({ stock: -1 });
        resp.status(200).send({ variedades });
    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }
}

const eliminar_variedad_producto = async function (req, resp) {
    if (req.user) {
        let id = req.params['id'];
        let reg = await Variedad.findById({ _id: id });
        if (reg.sctok == 0) {
            let variedad = await Variedad.findOneAndRemove({ _id: id });
            resp.status(200).send({ variedad });
        } else {
            resp.status(200).send({ data: undefined, message: 'No se puede eliminar esta Variedad' });
        }
    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }
}


module.exports = {
    registro_producto_admin,
    listar_productos_admin,
    obtener_portada_producto,
    obtener_producto_admin,
    editar_producto_admin,
    registro_variedad_producto,
    obtener_variedad_producto,
    eliminar_variedad_producto
}