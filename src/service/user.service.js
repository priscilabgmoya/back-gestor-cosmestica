const usuarios = require('../model/User'); 

module.exports.buscarId = async function (id){
    const usuarioExistente = await usuarios.findById(id).populate('rol', 'rol').populate('state', 'name'); 
    if(usuarioExistente){
        return usuarioExistente; 
    }else{
        return null; 
    }
}
module.exports.modificaUsuario = async function(id, modificacion){
    debugger
    const usuarioModficado = await usuarios.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(usuarioModficado){
        return usuarioModficado;
    }else{
        return null; 
    }
}