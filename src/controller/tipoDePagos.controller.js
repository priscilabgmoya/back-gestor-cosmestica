const { request, response } = require('express');
const tipoDePago = require('../model/TipoDePago');
const { existeTipoDePago, modificarTipoDePago, buscarId } = require('../service/tipoDePago.service')

async function obtenerTipoDePago(req = request, res = response) {
  const query = { state: true };
  const tipoDePagoGet = await tipoDePago.find(query);

  if (tipoDePagoGet.length == 0) return res.status(404).json({ msg: "Estados no disponibles " });

  return res.status(200).json({ msg: "lista de Tipo de Pago", data: tipoDePagoGet });
}

async function crearNuevoTipoDePago(req = request, res = response) {
  const { name, state } = req.body;

  const estado_encontrado = await existeTipoDePago(name);
  if (estado_encontrado) return res.status(409).json({ msg: "Ya existe el tipo de pago ingresado!" });

  const nuevoTipoDePago = new tipoDePago({ name, state });
  await nuevoTipoDePago.save()
    .then(data => {
      if (data !== null) {
        return res.status(201).json({ msg: "Nuevo Estado creado", data: data });
      } else {
        return res.status(500).json({ msg: "Falló al agregar el nuevo estado !!!" });
      }
    })
}
async function modificarTiposDePago(req = request, res = response) {

  const { id, ...tipoDePagoModificado } = req.body;

  const tipoDePagoEncontrado = await buscarId(id);
  if (!tipoDePagoEncontrado) return res.status(404).json({ msg: "Tipo de Pago no encontrado" });

  const isUpdateOk = await modificarTipoDePago(id, tipoDePagoModificado);
  if (isUpdateOk) {
    return res.status(200).json({ msg: "Tipo de Pago Modificado", data: isUpdateOk })
  } else {
    return res.status(500).json({ msg: "Falló al modificar el Tipo de Pago !!!" });
  }

}
async function eliminarTiposDePago(req = request, res = response) {
  const { id, ...tipoDePagoModificado } = req.body;

  const tipoDePagoEncontrado = await buscarId(id);
  if (!tipoDePagoEncontrado) return res.status(404).json({ msg: "Tipo de Pago no encontrado" });

  const isDeleteOk = await modificarTipoDePago(id, tipoDePagoModificado);
  if (isDeleteOk) {
    return res.status(200).json({ msg: "Tipo de Pago Eliminado logicamente", data: isDeleteOk })
  } else {
    return res.status(500).json({ msg: "Falló al eliminar el Tipo de Pago !!!" });
  }
}
module.exports = {
  obtenerTipoDePago,
  crearNuevoTipoDePago,
  modificarTiposDePago,
  eliminarTiposDePago
}