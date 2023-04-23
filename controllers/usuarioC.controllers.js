const UsuarioCModel = require('../models/usuarioC.model');
// const bcrypt = require('bcrypt');
const bcryptjs = require('bcrypt-nodejs');
const saltRounds = 10;
const jwt = require('../helpers/jwt');


const registro_usuario_admin = async function (req, resp) {
    // console.log(req.user);
    if (req.user) {
        let data = req.body;
        //validar email
        let usuarios = await UsuarioCModel.find({ email: data.email })
        if (usuarios.length >= 1) {
            resp.status(200).send({ data: undefined, message: 'El email ya existe' });
        } else {
            // bcrypt.genSalt(saltRounds, function (err, salt) {
            bcryptjs.hash('123456', null, null, async function (err, hash) {
                if (err) {
                    console.log(err);
                    resp.status(200).send({ data: undefined, message: 'No se pudo encriptar la contraseña' });
                } else {
                    // console.log(hash);
                    data.password = hash;
                    let usuarioDB = await UsuarioCModel.create(data);
                    resp.status(200).send({ data: usuarioDB });
                }
                // })
            })
        }
    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }

};

const login_usuario = async function (req, resp) {
    let data = req.body;
    let usuarios = await UsuarioCModel.find({ email: data.email });
    // existe correo
    if (usuarios.length >= 1) {
        // validar usuario activo
        if (usuarios[0].status) {
            bcryptjs.compare(data.password, usuarios[0].password, async function (err, check) {
                if (check) {
                    resp.status(200).send({ token: jwt.createToken(usuarios[0]), usuario: usuarios[0] });

                } else {
                    resp.status(200).send({ data: undefined, message: 'La contraseña es incorrecta' });

                }
            })
        } else {
            // cuenta descativada
            resp.status(200).send({ data: undefined, message: 'Su cuenta esta desactivada comunicarse con el administrador' });
        }
    } else {
        // no existe correo
        resp.status(200).send({ data: undefined, message: 'No se encontro el correo electronico' });
    }
    // console.log(data);
}

const listar_usuario_admin = async function (req, resp) {
    if (req.user) {
        let filtro = req.params['filtro'];
        let usuario = await UsuarioCModel.find({
            $or: [
                { nombres: new RegExp(filtro, 'i') },
                { apellidos: new RegExp(filtro, 'i') },
                { email: new RegExp(filtro, 'i') },
            ]
        });
        resp.status(200).send({ usuario, message: 'Listado de Usuarios' });

    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }
}

const obtener_usuario_admin = async function (req, resp) {
    if (req.user) {
        let id = req.params['id'];
        try {
            let usuario = await UsuarioCModel.findById({ _id: id })
            resp.status(200).send(usuario);
        } catch (error) {
            resp.status(400).send(undefined);
        }

    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }
}

const editar_usuario_admin = async function (req, resp) {
    if (req.user) {
        let id = req.params['id'];
        let data = req.body;
        let usuario = await UsuarioCModel.findByIdAndUpdate({ _id: id }, {
            nombres: data.nombres,
            apellidos: data.apellidos,
            rol: data.rol,
            email: data.email,
        });
        resp.status(200).send(usuario);

    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }
}

const cambiar_estado_usuario_admin = async function (req, resp) {
    if (req.user) {
        let id = req.params['id'];
        let data = req.body;
        let nuevo_status = false;
        if (data.status) {
            nuevo_status = false;
        } else {
            nuevo_status = true;
        }
        let usuario = await UsuarioCModel.findByIdAndUpdate({ _id: id }, {
            status: nuevo_status
        });
        resp.status(200).send(usuario);

    } else {
        resp.status(500).send({ data: undefined, message: 'Error Token revisar Logs' });
    }
}

module.exports = {
    registro_usuario_admin,
    login_usuario,
    listar_usuario_admin,
    obtener_usuario_admin,
    editar_usuario_admin,
    cambiar_estado_usuario_admin
}