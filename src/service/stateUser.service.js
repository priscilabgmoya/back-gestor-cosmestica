const estadousuario = require('../model/EstadosUser');

module.exports.existeEstado = async function(name){
    const estadoExistente = await estadousuario.findOne({name: name}); 
    if(estadoExistente){
        return estadoExistente; 
    }else{
        return null; 
    }
}
module.exports.buscarId = async function (id){
    const estadoExistente = await estadousuario.findById(id);
    if(estadoExistente){
        return estadoExistente; 
    }else{
        return null; 
    }
}
module.exports.modificarRoles = async function(id, modificacion){
    const estadoModificado = await estadousuario.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(estadoModificado){
        return estadoModificado;
    }else{
        return null; 
    }
}
module.exports.validarEstado = async function (name){
    const estadoExistente = await estadousuario.findOne({name: name});
    if(!estadoExistente)  throw new Error(`El estado ${name} no existe en la base de datos`);
}