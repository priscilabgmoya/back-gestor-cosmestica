const {Schema, model} =require('mongoose');

const UsuarioSchema = Schema ({
    user: {
        type: String,
        required: [true, 'El usuario es requerido'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'La contraseña es requerido']
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

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}
module.exports = model("User",UsuarioSchema); 