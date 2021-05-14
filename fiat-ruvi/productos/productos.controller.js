const db = require('../config/db.config.js');
const Producto = db.productos;

const productosCtrl = {};

productosCtrl.findAll = async (req, res, next) => {
  Producto.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] }
  })
  .then(productos => {
    res.json(productos);
  })
  .catch(error => res.status(400).send(error))
};

productosCtrl.create = async (req, res, next) => {
  const { nombre, precio } = req.body;
  Producto.create({
    nombre: nombre,
    precio: precio,
    attributes: { exclude: ["createdAt", "updatedAt"] }
  })
  .then(productos => {
    res.json(productos);
  })
  .catch(error => res.status(400).send(error))
};

module.exports = productosCtrl;