const express = require('express');
const router = express.Router();

const {
  index
} = require('../controllers/index.controller');

/* Ruta para generar pruebas de uso */
router.get('/', index);

module.exports = router;
