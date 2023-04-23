const jwt = require('jwt-simple');
const moment = require('moment');
const secreKey = process.env.SECRETKEY;

exports.decodeToken = function (req, resp, next) {
    if (!req.headers.authorization) {
        return resp.status(403).send({ message: 'No existe token en la petición' });
    }
    let token = req.headers.authorization;
    let segment = token.split('.');
    if (segment.length != 3) {
        return resp.status(403).send({ message: 'Token Invalido' });
    } else {
        try {
            var payload = jwt.decode(token, secreKey);
            console.log(payload);
        } catch (error) {
            return resp.status(403).send({ message: 'Error Token' });
        }
    }
    req.user = payload;
    next();
}