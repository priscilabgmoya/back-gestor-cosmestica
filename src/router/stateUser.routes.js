const {Router} = require ('express');
const { obtenerEstadosUsuarios, crearNuevoEstado, modificarEstado, eliminarEstado } = require('../controller/stateUser.controller');
const { validarEstadoNuevo, validarEstadoModificar, validarEstadoEliminar, validarStateUser } = require('../helpers/validacionStateUser');
const router = Router(); 

router.get('/api/V1/estadoUsuarios',validarStateUser(), obtenerEstadosUsuarios);
router.post('/api/V1/nuevoEstado' , validarEstadoNuevo(), crearNuevoEstado); 
router.put('/api/V1/modificarEstado', validarEstadoModificar(), modificarEstado); 
router.delete('/api/V1/eliminarEstado', validarEstadoEliminar(), eliminarEstado);





module.exports = router; 