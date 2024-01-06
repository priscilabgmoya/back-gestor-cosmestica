const {Schema, model} =require('mongoose');

const CategoriaSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoria de producto es requerido']
    },
    state:{
        type: Boolean,
        required: [true, 'El valor del estado es requerido']
    }
});
CategoriaSchema.methods.toJSON = function() {
    const {__v, ...estadoUsuario} = this.toObject();
    return estadoUsuario;
}
module.exports= model('CategoriasProductos', CategoriaSchema);