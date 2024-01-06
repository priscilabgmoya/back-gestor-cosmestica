const { body } = require('express-validator'); 
const ER = require('./expRegulares');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarToken');
const { esSuperAdmin } = require('../middlewares/validarSuperAdmin');

module.exports.validarTipoDePago = function () {
    return [
        validarJWT,
        esSuperAdmin,
        validarCampos
    ]
}
module.exports.validarTipoDePagoNuevo = function () {
    return [
        validarJWT,
        esSuperAdmin,
        body ("name", 'El nombre del tipo de pago  es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("state", 'El estado del rol  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarTipoDePagoModificar = function() {
    return [
        validarJWT,
        esSuperAdmin,
        body ("id","id Invalido!").isMongoId(),
        body ("name", 'El nombre del tipo de pago es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("state", 'El estado  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarTipoDePagoEliminar = function() {
    return [
        validarJWT,
        esSuperAdmin,
        body ("id","id Invalido!").isMongoId(),
        body("state", 'El estado  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}