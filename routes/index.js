var express = require('express');
var router = express.Router();
const dbConnect = require('../libs/DBConnections/mySQL_MDashboard');

/* controlador para generar pruebas de uso */
router.get('/', function(req, res, next) {
  console.log('ENTRANDO');
  dbConnect.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err;
  
    console.log('The solution is: ', rows[0].solution)
  });

  res.status(200).json({status: 'OK'}); 
});

module.exports = router;
