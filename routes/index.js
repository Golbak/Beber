var express = require('express');
var router = express.Router();
var fs = require('fs');

//Mi json que contendra el nombre de los juegos sus normas y sus modos
var juegos=[	{"juego":"El círculo de la muerte" , 	"normas":fs.readFileSync('public/documents/El círculo de la muerte.txt'), 	"modos":"1"},
				{"juego":"Mayor o menor" , 				"normas":fs.readFileSync('public/documents/Mayor o menor.txt'), 			"modos":"1"},
				{"juego":"Piramide" , 					"normas":fs.readFileSync('public/documents/Piramide.txt'), 					"modos":"1"},
				{"juego":"Autobús" , 					"normas":fs.readFileSync('public/documents/Autobús.txt'), 					"modos":"1"},
				{"juego":"Escalera" , 					"normas":fs.readFileSync('public/documents/Escalera.txt'), 					"modos":"1"}];

/* GET home page. */

//Cuando me pidan un get de la pagina principal mostrare la lista de juegos
router.get('/', function(req, res) {
	res.render('menu', { title: 'Express' ,juegos : juegos});	//devuelvo mi pagina menu con mi lista de juegos
});

//Cuando me pidan un get de las normas presupongo que me han pasado el juego que quieren jugar y buscare sus normas y modos
router.get('/normas', function(req, res) {
	var juego=req.param("juego");					//obtengo el juego del que quieren las normas
	var normas;										//variable para las normas del juego
	var modos;										//variable para los modos del juego

	var error=0;									//creo un flag para saber si he obtenido un error
	for(var i=0,tamano=juegos.length;i<tamano;i++)	//recorro mi objeto json
	{
		if(juego==juegos[i]["juego"])				//si el nombre del juego coincide obtengo el indice
		{
			normas=juegos[i]["normas"];				//usando el indice obtengo las normas del juego
			modos=juegos[i]["modos"];				//usando el indice obtengo los modos del juego
			break;									//como he tenido cuidado de no repetir juegos salgo
		}
	}
	
	if(normas!=undefined && modos!=undefined)		//si existe normas y modos
	{
		res.render('normas', { title: 'Normas', juego: juego, normas: normas, modos: modos});		//devuelvo mi pagina a la que paso las normas y los modos del juego seleccionado	
	}else{																							//sino existe devuelvo a la pagina anterior (puede cambiarse en el futuro)
		res.render('menu', { title: 'App Beber' ,juegos : juegos});									//devuelvo mi pagina menu con mi lista de juegos
	}
});

//Cuando me pidan un get con el juego presupongo que me han pasado el juego que quieren jugar y buscare su pagina y la enviare
router.get('/jugar',function(req,res){
	var juego=req.param("juego");
	if(juego!=undefined)																			//si existe el juego
	{
		res.render(juego,{title: juego, juego: juego});												//devuelvo mi pagina a la que le paso lo que necesita
	}else{																							//sino existe el juego
		res.render('menu', { title: 'App Beber' ,juegos : juegos});									//devuelvo mi pagina menu con mi lista de juegos
	}
});

module.exports = router;
