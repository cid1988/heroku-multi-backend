// module.exports = function(app) {
//     const productos = require('./productos.controller.js');
    
//     // Retrieve all Customer
//     app.get('/', productos.findAll);
// }

const express = require('express');
const router = express.Router();

const productosCtrl = require('./productos.controller');

router.get('/', productosCtrl.findAll);
router.post('/', productosCtrl.create);

module.exports = router;