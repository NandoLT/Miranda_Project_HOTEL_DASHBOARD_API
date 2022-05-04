var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('ENTRANDO');
  res.status(200).json({status: 'OK'}); 
});

module.exports = router;
