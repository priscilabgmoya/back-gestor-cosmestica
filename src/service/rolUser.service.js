const rolusuarios = require('../model/RolUser.js');

module.exports.existeRol = async function(rol){
    const rolExistente = await rolusuarios.findOne({rol: rol}); 
    if(rolExistente){
        return rolExistente; 
    }else{
        return null; 
    }
}
module.exports.buscarId = async function (id){
    const rolExistente = await rolusuarios.findById(id);
    if(rolExistente){
        return rolExistente; 
    }else{
        return null; 
    }
}
module.exports.modificaRoles = async function(id, modificacion){
    const rolModificado = await rolusuarios.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(rolModificado){
        return rolModificado;
    }else{
        return null; 
    }
}
module.exports.validarRol = async function (rol){
    const rolExistente = await rolusuarios.findOne({rol: rol});
    if(!rolExistente)  throw new Error(`El rol ${rol} no existe en la base de datos`);
}