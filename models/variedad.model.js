const { Schema, model } = require('mongoose');
const VariedadSchema = Schema({
    variedad: { type: String, required: true },
    sku: { type: String, required: true },
    proveedor: { type: String, required: true },
    producto: { type: Schema.ObjectId, ref: 'producto', required: true },
    stock: { type: Number, default: 0, required: true },
    createdAt: { type: Date, default: Date.now },
});

// UsuarioSchema.method('toJSON', function() {
//     const {__v, _id, ...object} = this.toObject()

//     object.uid = _id;
//     return object;
// });

module.exports = model('variedad', VariedadSchema);