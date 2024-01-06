const {Schema, model} =require('mongoose');

const ClientesSchema = Schema ({
    name: {
        type: String, 
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    state: {
        type: Schema.Types.ObjectId,
        ref:"EstadosUser",
        required: [true, 'El estado es requerido']
    }, 
    rol:{
        type: Schema.Types.ObjectId,
        ref:"RolUser",
        required: [true, 'El rol es requerido']
    }
})

ClientesSchema.methods.toJSON = function() {
    const {__v, _id, ...cliente} = this.toObject();
    cliente.uid = _id;
    return cliente;
}
module.exports = model("Clientes",ClientesSchema); 