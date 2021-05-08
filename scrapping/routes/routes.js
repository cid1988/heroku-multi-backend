const express = require('express');
const router = express.Router();

const fravega = require('../controllers/fravega.controller');

router.get('/', fravega.getFravega);

module.exports = router;