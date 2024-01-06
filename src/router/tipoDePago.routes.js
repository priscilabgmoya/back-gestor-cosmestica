const {Router} = require ('express');
const {crearNuevoTipoDePago, eliminarTiposDePago,modificarTiposDePago,obtenerTipoDePago}  = require("../controller/tipoDePagos.controller")
const {validarTipoDePagoNuevo, validarTipoDePagoModificar, validarTipoDePagoEliminar, validarTipoDePago} = require("../helpers/validacionTipoDePago")
const router = Router(); 

router.get('/api/V1/tiposDePago', validarTipoDePago(),  obtenerTipoDePago);
router.post('/api/V1/nuevoTipoDePago' , validarTipoDePagoNuevo(), crearNuevoTipoDePago); 
router.put('/api/V1/modificarTipoDePago', validarTipoDePagoModificar(), modificarTiposDePago); 
router.delete('/api/V1/eliminarTipoDePago', validarTipoDePagoEliminar(), eliminarTiposDePago);


module.exports = router; 