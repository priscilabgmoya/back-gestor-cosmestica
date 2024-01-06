const {Router} = require ('express');
const {crearNuevoUsuario, obtenerUsuarios, eliminarUsuario, modificarUsuario}  = require("../controller/user.controller");
const {validarUserNuevo, validarUserModificar, validarUserEliminar, validarUser} = require("../helpers/validacionUser"); 
const router = Router(); 

router.get('/api/V1/obtenerUsuarios', validarUser(),  obtenerUsuarios);
router.post('/api/V1/nuevoUsuario',validarUserNuevo(), crearNuevoUsuario);
router.put('/api/V1/modificarUsuario', validarUserModificar(), modificarUsuario); 
router.delete('/api/V1/eliminarUsuario', validarUserEliminar(), eliminarUsuario);

module.exports = router; 