const { Schema, model } = require('mongoose');
const ProductoSchema = Schema({
    titulo: { type: String, required: true },
    slug: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    extracto: { type: String, required: true },
    portada: { type: String, required: true },
    stock: { type: Number, default: 0, required: true },
    str_variedad: { type: String, required: true },
    estado: { type: Boolean, required: true },
    descuento: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, required: false }
});

// UsuarioSchema.method('toJSON', function() {
//     const {__v, _id, ...object} = this.toObject()

//     object.uid = _id;
//     return object;
// });

module.exports = model('producto', ProductoSchema);