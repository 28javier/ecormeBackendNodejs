const { Schema, model } = require('mongoose');
const UsuarioCSchema = Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, require: true },
    status: { type: Boolean, default: true, require: true },
    createdAt: { type: Date, default: Date.now }
});

// UsuarioSchema.method('toJSON', function() {
//     const {__v, _id, ...object} = this.toObject()

//     object.uid = _id;
//     return object;
// });

module.exports = model('usuarioC', UsuarioCSchema);