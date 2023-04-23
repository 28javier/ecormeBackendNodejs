const { Schema, model } = require('mongoose');
const IngresoSchema = Schema({
    proveedor: { type: String, required: true }, //f
    ncomprobante: { type: String, required: true }, //f
    documento: { type: String, required: true }, //f
    monto_total: { type: String, required: true }, //f
    serie: { type: Number, required: true }, //nf
    monto_resultante: { type: String, required: true }, //nf
    usuario: { type: Schema.ObjectId, ref: 'usuarioC', required: true }, //nf

    createdAt: { type: Date, default: Date.now }
});

// UsuarioSchema.method('toJSON', function() {
//     const {__v, _id, ...object} = this.toObject()

//     object.uid = _id;
//     return object;
// });

module.exports = model('ingreso', IngresoSchema);