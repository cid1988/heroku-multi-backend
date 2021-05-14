module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define('producto', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    precio: {
      type: Sequelize.DECIMAL
    },
    /*active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }*/
  },{
    timestamps: false
  });

  return Producto;
}