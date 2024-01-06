const {request, response} = require('express'); 
const Cliente = require('../model/Clientes');
async function crearNuevoCliente( req= request, res = response){
    const bodyRequest = req.body; 
    const {name, email, state, rol } = bodyRequest; 
    
     const existeCliente = await Cliente.findOne({email}); 
     if(existeCliente) return res.status(409).json({msg: 'El correo se encuentra Asociado'})
     
     const nuevoCliente = new Cliente({name, email, state, rol}); 

    await nuevoCliente.save()
            .then(data => {
                if(data !== null){
                    return res.status(201).json({mensaje: 'Cliente Creado', data: data})
                }else{
                    return  res.status(500).json({msg: "Falló al agregar el nuevo cliente !!!"});
                }
    })
}
module.exports ={
    crearNuevoCliente
}