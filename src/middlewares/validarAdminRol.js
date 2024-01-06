const {request, response} = require('express');


const esAdminRol = (req = request, res = response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg:"Se quiere validar el rol sin validar el token"
        })
    }

    const {rol, user} = req.usuario

    if(rol.rol !== "ADMINISTRADOR"){
        return res.status(401).json({
            msg:`${user} no es administrador`
        })
    }
    
    next();
}

module.exports = {
    esAdminRol
}