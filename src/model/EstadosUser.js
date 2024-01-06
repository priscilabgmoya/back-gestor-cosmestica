const {Schema, model} =require('mongoose');

const EstadoSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre del estado es requerido']
    },
    state:{
        type: Boolean,
        required: [true, 'El valor del estado  es requerido']
    }
});
EstadoSchema.methods.toJSON = function() {
    const {__v, ...estadoUsuario} = this.toObject();
    return estadoUsuario;
}
module.exports= model('EstadosUser', EstadoSchema);