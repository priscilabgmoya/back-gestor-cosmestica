const { body } = require('express-validator'); 
const ER = require('./expRegulares.js');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarToken');
const { esSuperAdmin } = require('../middlewares/validarSuperAdmin');

module.exports.validarRolUser = function () {
    return [
        validarJWT,
        esSuperAdmin,
        validarCampos
    ]
}
module.exports.validarRolNuevo = function () {
    return [
        validarJWT,
        esSuperAdmin,
        body ("rol", 'El tipo de rol es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("state", 'El estado del rol  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarRolModificar = function() {
    return [
        validarJWT,
        esSuperAdmin,
        body ("id","id Invalido!").isMongoId(),
        body ("rol", 'El tipo de rol es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("state", 'El estado del rol  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarRolEliminar = function() {
    return [
        validarJWT,
        esSuperAdmin,
        body ("id","id Invalido!").isMongoId(),
        body("state", 'El estado del rol  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}