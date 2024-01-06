const {Router} = require ('express');
const {obtenerRolesUsuarios, crearNuevoRol , modificarRol , eliminarRol} = require('../controller/rolUser.controller'); 
const { validarRolNuevo, validarRolModificar, validarRolEliminar , validarRolUser} = require('../helpers/validacionRolUser');
const router = Router(); 

router.get('/api/V1/rolesUsuario', validarRolUser(), obtenerRolesUsuarios); 
router.post('/api/V1/nuevoRol', validarRolNuevo() ,crearNuevoRol);
router.put('/api/V1/modificarRol',  validarRolModificar(), modificarRol); 
router.delete('/api/V1/eliminarRol', validarRolEliminar(), eliminarRol); 

module.exports = router; 