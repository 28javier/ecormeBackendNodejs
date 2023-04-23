const jwt = require('jwt-simple');
const moment = require('moment');
const secreKey = process.env.SECRETKEY;

exports.createToken = function (usuario) {
    const payload = {
        sub: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        email: usuario.email,
        rol: usuario.rol,
        int: moment().unix(),
        exp: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, secreKey);
}