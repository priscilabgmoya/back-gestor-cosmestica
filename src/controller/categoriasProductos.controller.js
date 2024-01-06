const { request, response } = require('express');
const categoriasProductos = require('../model/CategoriaProductos');
const { existeCategoriaProducto, modificarCategoriaProducto, buscarId } = require('../service/categoriasProductos.service')

async function obtenerCategoriasProducto(req = request, res = response) {
  const query = { state: true };
  const categoriaProductosget = await categoriasProductos.find(query);

  if (categoriaProductosget.length == 0) return res.status(404).json({ msg: "Categorias De Producto no disponibles " });

  return res.status(200).json({ msg: "lista de categoria de Productos", data: categoriaProductosget });
}

async function crearNuevaCategoriaProducto(req = request, res = response) {
  const { name, state } = req.body;

  const categoriaProducto_encontrada = await existeCategoriaProducto(name);
  if (categoriaProducto_encontrada) return res.status(409).json({ msg: "Ya existe la categoria ingresada!" });

  const nuevoEstado = new categoriasProductos({ name, state });
  await nuevoEstado.save()
    .then(data => {
      if (data !== null) {
        return res.status(201).json({ msg: "Nueva categoria de producto creada", data: data });
      } else {
        return res.status(500).json({ msg: "Falló al agregar la nueva categoria de producto !!!" });
      }
    })

}
async function modificarCategoriaProductos(req = request, res = response) {

  const { id, ...categoriaModificada } = req.body;

  const categoriaProducto_encontrada = await buscarId(id);
  if (!categoriaProducto_encontrada) return res.status(404).json({ msg: "categoria no encontrada" });

  const isUpdateOk = await modificarCategoriaProducto(id, categoriaModificada);
  if (isUpdateOk) {
    return res.status(200).json({ msg: "Categoria de Producto Modificado", data: isUpdateOk })
  } else {
    return res.status(500).json({ msg: "Falló al modificar la categoria !!!" });
  }

}
async function eliminarCategoriaProducto(req = request, res = response) {
  const { id, ...categoriaModificada } = req.body;

  const categoriaProducto_encontrada = await buscarId(id);
  if (!categoriaProducto_encontrada) return res.status(404).json({ msg: "Categoria De Producto no encontrado" });

  const isDeleteOk = await modificarCategoriaProducto(id, categoriaModificada);
  if (isDeleteOk) {
    return res.status(200).json({ msg: "Categoria de Producto Eliminado logicamente", data: isDeleteOk })
  } else {
    return res.status(500).json({ msg: "Falló al eliminar la categoria !!!" });
  }
}
module.exports = {
  obtenerCategoriasProducto,
  crearNuevaCategoriaProducto,
  modificarCategoriaProductos,
  eliminarCategoriaProducto
}