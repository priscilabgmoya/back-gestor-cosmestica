const { body } = require('express-validator'); 
const ER = require('./expRegulares');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarToken');
const { esSuperAdmin } = require('../middlewares/validarSuperAdmin');

module.exports.validarStateUser = function () {
    return [
        validarJWT,
        esSuperAdmin,
        validarCampos
    ]
}
module.exports.validarEstadoNuevo = function () {
    return [
        validarJWT,
        esSuperAdmin,
        body ("name", 'El nombre de estado es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("state", 'El estado   es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarEstadoModificar = function() {
    return [
        validarJWT,
        esSuperAdmin,
        body ("id","id Invalido!").isMongoId(),
        body ("name", 'El nombre del estado es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("state", 'El estado  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarEstadoEliminar = function() {
    return [
        validarJWT,
        esSuperAdmin,
        body ("id","id Invalido!").isMongoId(),
        body("state", 'El estado  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}