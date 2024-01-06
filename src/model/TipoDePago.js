const {Schema, model} =require('mongoose');

const TipoPagoSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre del tipo de pago es requerido']
    },
    state:{
        type: Boolean,
        required: [true, 'El valor del estado es requerido']
    }
});
TipoPagoSchema.methods.toJSON = function() {
    const {__v, ...estadoUsuario} = this.toObject();
    return estadoUsuario;
}
module.exports= model('TipoDePago', TipoPagoSchema);