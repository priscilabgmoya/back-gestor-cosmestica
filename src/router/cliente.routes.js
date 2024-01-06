const {Router} = require ('express');
const {crearNuevoCliente}  = require("../controller/cliente.controller")
const router = Router(); 

router.post('/api/V1/nuevoCliente', crearNuevoCliente);

module.exports = router; 