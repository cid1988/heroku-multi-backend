module.exports = function(app) {
    const productos = require('./productos.controller.js');
 
    // Retrieve all Customer
    app.get('/api/productos', productos.findAll);
}