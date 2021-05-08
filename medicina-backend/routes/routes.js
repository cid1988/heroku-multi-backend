const express = require('express');
const router = express.Router();

const consultasCtrl = require('../controllers/consultas.controller');

router.get('/', consultasCtrl.getConsultas);

module.exports = router;