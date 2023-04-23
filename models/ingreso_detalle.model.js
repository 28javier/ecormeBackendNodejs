const { Schema, model } = require('mongoose');
const Ingreso_detalleSchema = Schema({
    cantidad: { type: Number, required: true },
    precio_unidad: { type: Number, required: true },
    ingreso: { type: Schema.ObjectId, ref: 'ingreso', required: true },
    producto: { type: Schema.ObjectId, ref: 'producto', required: true },
    createdAt: { type: Date, default: Date.now }
});

// UsuarioSchema.method('toJSON', function() {
//     const {__v, _id, ...object} = this.toObject()

//     object.uid = _id;
//     return object;
// });

module.exports = model('ingreso_detalle', Ingreso_detalleSchema);