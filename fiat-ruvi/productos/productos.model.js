module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define('producto', {
    nombre: {
      type: Sequelize.STRING
    },
    precio: {
      type: Sequelize.DOUBLE
    },
    /*active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }*/
  });

  return Producto;
}