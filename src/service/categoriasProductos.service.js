const categoriaProducto = require('../model/TipoDePago');

module.exports.existeCategoriaProducto = async function(name){
    const categoriaProductosExistente = await categoriaProducto.findOne({name: name}); 
    if(categoriaProductosExistente){
        return categoriaProductosExistente; 
    }else{
        return null; 
    }
}
module.exports.buscarId = async function (id){
    const categoriaProductosExistente = await categoriaProducto.findById(id);
    if(categoriaProductosExistente){
        return categoriaProductosExistente; 
    }else{
        return null; 
    }
}
module.exports.modificarCategoriaProducto = async function(id, modificacion){
    const categoriaProductoModificado = await categoriaProducto.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(categoriaProductoModificado){
        return categoriaProductoModificado;
    }else{
        return null; 
    }
}
module.exports.validarCategoriaProducto = async function (name){
    const categoriaProductosExistente = await categoriaProducto.findOne({name: name});
    if(!categoriaProductosExistente)  throw new Error(`La categoria:  ${name} no existe en la base de datos`);
}