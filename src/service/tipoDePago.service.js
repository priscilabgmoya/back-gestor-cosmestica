const tipoDePago = require('../model/TipoDePago');

module.exports.existeTipoDePago = async function(name){
    const estadoExistente = await tipoDePago.findOne({name: name}); 
    if(estadoExistente){
        return estadoExistente; 
    }else{
        return null; 
    }
}
module.exports.buscarId = async function (id){
    const estadoExistente = await tipoDePago.findById(id);
    if(estadoExistente){
        return estadoExistente; 
    }else{
        return null; 
    }
}
module.exports.modificarTipoDePago = async function(id, modificacion){
    const estadoModificado = await tipoDePago.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(estadoModificado){
        return estadoModificado;
    }else{
        return null; 
    }
}
module.exports.validarTipoDePago = async function (name){
    const estadoExistente = await tipoDePago.findOne({name: name});
    if(!estadoExistente)  throw new Error(`El tipo de pago:  ${name} no existe en la base de datos`);
}