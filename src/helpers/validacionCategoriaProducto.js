const { body } = require('express-validator'); 
const ER = require('./expRegulares');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarToken');
const { esSuperAdmin } = require('../middlewares/validarSuperAdmin');

module.exports.validarCategoriaProducto = function () {
    return [
        validarJWT,
        esSuperAdmin,
        validarCampos
    ]
}
module.exports.validarCategoriaProductoNuevo = function () {
    return [
        validarJWT,
        esSuperAdmin,
        body ("name", 'El nombre de la categoria de producto es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("state", 'El estado es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarCategoriaProductoModificar = function() {
    return [
        validarJWT,
        esSuperAdmin,
        body ("id","id Invalido!").isMongoId(),
        body ("name", 'El nombre de la categoria de producto  es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("state", 'El estado  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarCategoriaProductoEliminar = function() {
    return [
        validarJWT,
        esSuperAdmin,
        body ("id","id Invalido!").isMongoId(),
        body("state", 'El estado  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}