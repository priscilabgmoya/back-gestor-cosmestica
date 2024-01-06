const { body } = require('express-validator'); 
const ER = require('./expRegulares.js');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarToken');
const { esSuperAdmin } = require('../middlewares/validarSuperAdmin');

module.exports.validarUser = function () {
    return [
        validarJWT,
        esSuperAdmin,
        validarCampos
    ]
}
module.exports.validarUserNuevo = function () {
    return [
        validarJWT,
        esSuperAdmin,
        body ("user", 'El usuario es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("password", 'La contaseña es requerida').isBoolean().notEmpty().matches(ER.ExpRegPass),
        body ("rol", 'El tipo de usuario es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("state", 'El estado del rol  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarUserModificar = function() {
    return [
        validarJWT,
        esSuperAdmin,
        body ("id","id Invalido!").isMongoId(),
        body ("rol", 'El tipo de usuario es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("state", 'El estado del usuario es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarUserEliminar = function() {
    return [
        validarJWT,
        esSuperAdmin,
        body ("id","id Invalido!").isMongoId(),
        body("state", 'El estado del usuario es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}