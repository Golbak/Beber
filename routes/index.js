var express = require('express');
var router = express.Router();

//Mi json que contendra el nombre de los juegos sus normas y sus modos
var juegos=[	{"juego":"El círculo de la muerte" , "normas":"Me besas el cipote" },
				{"juego":"Mayor o menor" , "normas":"Me besas el pie"},
				{"juego":"Piramide" , "normas":"Puto vago del joserra"},
				{"juego":"Autobús" , "normas":"pfff"},
				{"juego":"Escalera" , "normas":"Ahora vas y lo cuentas"} ];

/* GET home page. */

//Cuando me pidan un get de la pagina principal mostrare la lista de juegos
router.get('/', function(req, res) {
	res.render('menu', { title: 'Express' ,juegos : juegos});	//devuelvo mi pagina menu con mi lista de juegos
});

//Cuando me pidan un get de las normas presupongo que me han pasado el juego que quieren jugar y buscare sus normas y modos
router.get('/normas', function(req, res) {
	var juego=req.param("juego");					//obtengo el juego del que quieren las normas
	var normas=juegos.								//obtengo las normas del juego
	var modos=juegos.								//obtengo los modos del juego
	res.render('index', { title: juego});			//devuelvo mi pagina a la que paso las normas y los modos del juego seleccionado
});

module.exports = router;
