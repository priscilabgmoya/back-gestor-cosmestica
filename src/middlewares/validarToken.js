const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/User')

const validarJWT = async (req = request, res = response, next) =>{

    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg:"No hay token en la petición"
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);


        const usuario = await Usuario.findById(uid).populate('rol', 'rol').populate('state', 'name');


        if(!usuario){
            return res.status(401).json({
                msg:"Token no válido, usuario no existe"
            })
        }

        //Verificar si el usuario está activo
        if(usuario.state.name == 'inactivo'){
            return res.status(401).json({
                msg:"Usuario inactivo"
            })
        }

        req.usuario = usuario;

        next();
        
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg:"Token no válido"
        })
    }

}

module.exports = {
    validarJWT
}