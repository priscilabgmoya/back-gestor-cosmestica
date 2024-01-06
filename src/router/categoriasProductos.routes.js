const {Router} = require ('express');
const {crearNuevaCategoriaProducto, eliminarCategoriaProducto,modificarCategoriaProductos,obtenerCategoriasProducto}  = require("../controller/categoriasProductos.controller")
const {validarCategoriaProductoNuevo, validarCategoriaProductoModificar, validarCategoriaProductoEliminar, validarCategoriaProducto} = require("../helpers/validacionCategoriaProducto")
const router = Router(); 

router.get('/api/V1/obtenerCategoriaProducto', validarCategoriaProducto(), obtenerCategoriasProducto);
router.post('/api/V1/nuevoCategoriaProducto' , validarCategoriaProductoNuevo(), crearNuevaCategoriaProducto); 
router.put('/api/V1/modificarCategoriaProducto', validarCategoriaProductoModificar(), modificarCategoriaProductos); 
router.delete('/api/V1/eliminarCategoriaProducto', validarCategoriaProductoEliminar(), eliminarCategoriaProducto);


module.exports = router; 