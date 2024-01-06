const {request, response} = require('express'); 
const bcrypt = require('bcryptjs'); 
const User = require('../model/User');
const {buscarId, modificaUsuario} = require('../service/user.service')
async function crearNuevoUsuario( req= request, res = response){
    const bodyRequest = req.body; 
    const {user, password, state, rol } = bodyRequest; 
    
     const existeUsuario = await User.findOne({user}); 
     if(existeUsuario) return res.status(409).json({msg: 'El correo se encuentra Asociado'})
     
     const nuevoUsuario = new User({user,password,state,rol}); 
     
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    nuevoUsuario.password = hash;

    await nuevoUsuario.save()
            .then(data => {
                if(data !== null){
                    return res.status(201).json({mensaje: 'Usuario Creado', data: data})
                }else{
                    return  res.status(500).json({msg: "Falló al agregar el nuevo usuario !!!"});
                }
    })
}
async function obtenerUsuarios(req= request, res = response){
    debugger
    const query = {estado:"6595f7d817a7e9ade9ebd4ce"};
    const usuariosget = await Usuario.find(query).populate('rol', 'rol').populate('state', 'name');
    console.log(usuariosget)
    if(usuariosget.length  == 0 ) return res.status(404).json({msg: "Usuarios no disponibles "});
    
    return res.status(200).json({msg: "lista de usuarios", data: usuariosget});
}
async function eliminarUsuario(req= request, res = response){
    const {id, ...usuarioEliminado} = req.body;

    const usuario_encontrado = await buscarId(id); 
    if(!usuario_encontrado)  return res.status(404).json({msg: "Usuario no encontrado"});
  
    const isDeleteOk = await modificaUsuario(id,usuarioEliminado); 
    if(isDeleteOk){
     return  res.status(200).json({msg: "Usuario Eliminado logicamente",data: isDeleteOk})
    }else {
      return  res.status(500).json({msg: "Falló al eliminar el usuario !!!"});
    }
}
async function modificarUsuario(req= request, res = response){
    const {id, ...usuarioModificado} = req.body;

    const usuario_encontrado = await buscarId(id); 
    if(!usuario_encontrado)  return res.status(404).json({msg: "Usuario no encontrado"});
  
    const isUpdateOk = await modificarRoles(id,usuarioModificado); 
    if(isUpdateOk){
     return  res.status(200).json({msg: "Estado Modificado",data: isUpdateOk})
    }else {
      return  res.status(500).json({msg: "Falló al modificar el estado !!!"});
    }
  
}
module.exports={
    crearNuevoUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    modificarUsuario
}