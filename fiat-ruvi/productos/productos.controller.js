const db = require('../config/db.config.js');
const Producto = db.productos;

exports.findAll = (req, res) => {
    Producto.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }
    })
    .then(productos => {
      res.json(productos);
    })
    .catch(error => res.status(400).send(error))
  };