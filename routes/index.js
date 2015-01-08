var express = require('express');
var router = express.Router();

var juegos=[	{"juego":"El círculo de la muerte" },
				{"juego":"Mayor o menor"},
				{"juego":"Piramide"},
				{"juego":"Autobús"},
				{"juego":"Escalera"} ];

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' ,juegos : juegos});
});

module.exports = router;
