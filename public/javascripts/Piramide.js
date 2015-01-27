//Constantes para encontrar la foto de la carta en la baraja
const sx=75;
const sy=60;
const sW=146;
const sH=196;
const posicioncarta=[{"x":0,"y":0},{"x":1,"y":0},{"x":0,"y":1},{"x":1,"y":1},{"x":0,"y":2},{"x":1,"y":2},{"x":0,"y":3},{"x":1,"y":3},{"x":0,"y":4},{"x":1,"y":4},{"x":9,"y":4},{"x":8,"y":5},{"x":9,"y":5},
                  {"x":2,"y":0},{"x":3,"y":0},{"x":2,"y":1},{"x":3,"y":1},{"x":2,"y":2},{"x":3,"y":2},{"x":2,"y":3},{"x":3,"y":3},{"x":2,"y":4},{"x":3,"y":4},{"x":9,"y":1},{"x":8,"y":2},{"x":9,"y":2},
                  {"x":4,"y":0},{"x":5,"y":0},{"x":4,"y":1},{"x":5,"y":1},{"x":4,"y":2},{"x":5,"y":2},{"x":4,"y":3},{"x":5,"y":3},{"x":4,"y":4},{"x":5,"y":4},{"x":8,"y":0},{"x":9,"y":0},{"x":8,"y":1},
                  {"x":6,"y":0},{"x":7,"y":0},{"x":6,"y":1},{"x":7,"y":1},{"x":6,"y":2},{"x":7,"y":2},{"x":6,"y":3},{"x":7,"y":3},{"x":6,"y":4},{"x":7,"y":4},{"x":8,"y":3},{"x":9,"y":3},{"x":8,"y":4}];

//Constantes relativas al juego
const cartasjugadores=3;

//Funcion para obtener la posicion del raton
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();                                                //Obtengo coordenadas de mi canvas
  return {
    x: evt.clientX - rect.left,                                                             //Obtengo coordenadas de mi evento
    y: evt.clientY - rect.top                                                               //La resta sera donde esta mi cursor en coordenadas absolutas
  };
}

//Mi clase mazo
/*****************************************************************/
function Mazo(numero)
{
	var numcartas = numero;
	var cartas = [];
	var cartasRestantes = function()
	{
		return numcartas-cartas.length;
	}
	var reiniciar = function()
	{
		cartas=[];
	}
	var sacarCarta = function(){
		var carta;
		if(cartasRestantes()==0)                                                                                
			return false;
		do{
			carta=parseInt(Math.floor(Math.random()*numcartas));                                              
		}while((function(){
			for(var i=0,tamano=cartas.length;i<tamano;i++)                                            //Recorro mis cartas salidas
			{
				if(carta==cartas[i])                                                                    //Si hay una que es igual
			    {
			    	return true;                                                                          //Es cierto que esta repetida
			    }
			}
			return false; 
		})());

		cartas.push(carta);                                                                       
		return carta;
	};

	return {
		cartasRestantes: cartasRestantes,
		reiniciar: reiniciar,
		sacarCarta: sacarCarta
	}
}

//Mi clase carta
/*****************************************************************/
function Carta(posicion_x,posicion_y){
	var carta_x = 0;
	var carta_y = 0;
	var pos_x = posicion_x;
	var pos_y = posicion_y;
	var posicioncarta_x=12;
	var posicioncarta_y=6;
	var miestado=1;
	var micarta=-1;
	var imgc = new Image();
	imgc.src = '/images/baraja.jpg';

	var setTamano = function(tamcart_x,tamcart_y)
	{
		carta_x=tamcart_x;
		carta_y=tamcart_y;
	}

	var setCarta = function(numero)
	{
		if(numero < 0)
		{
			posicioncarta_x=12;
		    posicioncarta_y=6;
		}else{
		    posicioncarta_x=posicioncarta[numero]["x"];
		    posicioncarta_y=posicioncarta[numero]["y"];
		}
		micarta=numero;
		miestado=0;
	}

	var setPosicion = function(pos)
	{
		pos_x=pos["x"];
		pos_y=pos["y"];
	}

  	var dibuja = function(contexto){
		if(contexto)
		{
		  	contexto.drawImage(imgc , sx+sW*posicioncarta_x, sy+sH*posicioncarta_y, sW, sH, pos_x, pos_y, carta_x, carta_y);
		}
	};

	var destapar = function(numero,contexto)
	{
		if(numero < 0)
		{
			posicioncarta_x=12;
		    posicioncarta_y=6;
		}else{
		    posicioncarta_x=posicioncarta[numero]["x"];
		    posicioncarta_y=posicioncarta[numero]["y"];
		}
		micarta=numero;
		miestado=0;
		dibuja(contexto);
	}

	var comprueba = function(carta)
	{
		var aux=carta-13*Math.floor(carta/13);
		var aux2=micarta-13*Math.floor(micarta/13);
		if(aux==aux2)
			return true;
		return false;
	}

  	var dentro = function(x,y)
	{
		if(miestado)
		{
	  		if(x>pos_x && y>pos_y && x<(pos_x+carta_x) && y<(pos_y+carta_y))
    			return true;
    	}
  		return false;
	};
  	
  	return {
  		carta: micarta,
  		setTamano: setTamano,
  		setCarta: setCarta,
  		setPosicion: setPosicion,
  		dibuja: dibuja,
  		destapar: destapar,
  		comprueba: comprueba,
  		dentro: dentro
  	}
} 

//Mi clase lista carta
/*****************************************************************/
function lista_Cartas()
{
	var cartas=[];

	var inicia = function(numcartas,json_posiciones)
	{
		cartas=[];
		if(numcartas==json_posiciones.length)
		{
			cartas=[];
			for(var i=0;i<numcartas;i++)
				cartas.push(new Carta(json_posiciones[i]["x"],json_posiciones[i]["y"]));
		}else{
			console.log("Se ha introducido datos erroneos");
		}
	}

	var inicia2 = function(numcartas,json_posiciones,cartasr)
	{
		cartas=[];
		if(numcartas==json_posiciones.length && numcartas==cartasr.length)
		{
			cartas=[];
			for(var i=0;i<numcartas;i++)
			{
				cartas.push(new Carta(json_posiciones[i]["x"],json_posiciones[i]["y"]));
				cartas[i].setCarta(cartasr[i]);
			}
		}else{
			console.log("Se ha introducido datos erroneos");
		}
	}

	var setTamano = function(tamcart_x,tamcart_y)
	{
		for(var i=0,tamano=cartas.length;i<tamano;i++)
			cartas[i].setTamano(tamcart_x,tamcart_y);
	}

	var setPosicion = function(pos)
	{
		if(pos)
		{
			var tamano=cartas.length;
			if(pos.length==tamano)
			{
				for(var i=0;i<tamano;i++)
					cartas[i].setPosicion(pos[i]);
			}
		}
	}

	var dibuja = function(contexto)
	{
		for(var i=0,tamano=cartas.length;i<tamano;i++)
			cartas[i].dibuja(contexto);
	}

	var destapar = function(carta,indice,contexto)
	{
		cartas[indice].destapar(carta,contexto);
	}

	var comprueba = function(carta)
	{
		for(var i=0,tamano=cartas.length;i<tamano;i++)
		{
			if(cartas[i].comprueba(carta))
				return  true;
		}
		return false;
	}

	var dentro = function(x,y)
	{
		for(var i=0,tamano=cartas.length;i<tamano;i++)
		{
			if(cartas[i].dentro(x,y))
			{
				return {
					boolean: true,
					i: i
				}
			}
		}
		return {
				boolean: false
		}
	}

	return {
		inicia: inicia,
		inicia2: inicia2,
		setTamano: setTamano,
		setPosicion: setPosicion,
		dibuja: dibuja,
		destapar: destapar,
		comprueba: comprueba,
		dentro: dentro
	}
}
//Mi clase jugador
function jugador(jugador,cartas)
{
	var minombre = jugador;
	var mitamano = {"x":0,"y":0};
	var milista_Cartas = new lista_Cartas();
	(function(){
		milista_Cartas.inicia2(cartasjugadores,[{"x":0,"y":0},{"x":mitamano["x"],"y":0},{"x":mitamano["x"]*2,"y":0}],cartas);
	})()
	

	var setTamano = function(tamcart_x,tamcart_y)
	{
		milista_Cartas.setTamano(tamcart_x,tamcart_y);
		mitamano["x"]=tamcart_x;
		mitamano["y"]=tamcart_y;
	}

	var setPosicion = function(pos)
	{
		milista_Cartas.setPosicion(pos);
	}

	var comprueba = function(carta)
	{
		if(milista_Cartas.comprueba(carta))
			return true;
		return false;
		
	}

	var getNombre = function()
	{
		return minombre;
	}

	var dibuja = function(contexto)
	{
		milista_Cartas.dibuja(contexto);
	}

	return{
		setTamano: setTamano,
		setPosicion: setPosicion,
		comprueba: comprueba,
		getNombre: getNombre,
		dibuja: dibuja
	}
}
//Mi clase lista_Jugadores
function lista_Jugadores()
{
	var jugadores =[];
	var mitamano = {"x":0,"y":0};
	var posicion = {"x":0,"y":0};

	var inicia = function(numjugadores,listanombres,cartas)
	{
		jugadores = [];
		if( (numjugadores*cartasjugadores)==cartas.length)
		{
			for(var i=0;i<numjugadores;i++)
				jugadores.push(new jugador(listanombres[i],cartas.slice(i*3,(i+1)*3)));
		}else{
			console.log("Se ha introducido datos erroneos");
			console.log(cartas.length);
			console.log(numjugadores);
		}
	}

	var setTamano = function(tamcart_x,tamcart_y)
	{
		for(var i=0,tamano=jugadores.length;i<tamano;i++)
			jugadores[i].setTamano(tamcart_x,tamcart_y);
		setPosicionJugadores([{"x":0,"y":0},{"x":tamcart_x,"y":0},{"x":tamcart_x*2,"y":0}])
		mitamano["x"]=tamcart_x*cartasjugadores;
		mitamano["y"]=tamcart_y;

	}

	var setPosicionJugadores = function (pos)
	{
		for(var i=0,tamano=jugadores.length;i<tamano;i++)
			jugadores[i].setPosicion(pos);
	}

	var setPosicion = function(pos)
	{
		posicion["x"]=pos["x"];
		posicion["y"]=pos["y"];
	}

	var comprueba = function(carta)
	{
		var coincidencias=[];
		for(var i=0,tamano=jugadores.length;i<tamano;i++)
		{
			if(jugadores[i].comprueba(carta))
				coincidencias.push(i);
		}
		return coincidencias;
	}

	var getNombre = function(indice)
	{
		var respuesta;
		for(var i=0,tamano=indice.length;i<tamano;i++)
		{
			if(respuesta==undefined)
				respuesta=jugadores[indice[i]].getNombre();
			else
				respuesta+=" "+jugadores[indice[i]].getNombre();
		}
			
		return respuesta;
	}

	var dibuja = function(canvas,contexto)
	{
		contexto.save();
		contexto.translate(posicion["x"],posicion["y"]);
		for(var i=0,tamano=jugadores.length;i<tamano;i++)
		{
			contexto.save();
			contexto.translate(0,i*mitamano["y"]);
			jugadores[i].dibuja(contexto);
			contexto.restore();

		}
		contexto.restore();
	}

	return{
		inicia: inicia,
		setTamano: setTamano,
		setPosicion: setPosicion,
		comprueba: comprueba,
		getNombre: getNombre,
		dibuja: dibuja
	}
}
//Mi clase croupier
function croupier(canvas,contexto)
{
	var miMazo = new Mazo(52);
	var milista_Cartas = new lista_Cartas();
	var milista_Jugadores = new lista_Jugadores();
	var micanvas = canvas;
	var micontexto = contexto;
	var estado;
	var cartasdestapadas;
	var limite={"inferior":0,"superior":0};
	
	var dibuja = function()
	{
		milista_Cartas.dibuja(micontexto);
		milista_Jugadores.dibuja(micanvas,micontexto);
	}
	var inicia = function(canvas,contexto)
	{
		estado=0;
		cartasdestapadas=0;
		miMazo.reiniciar();

		var posiciones=[];
		var numerocartas=0;
		for(var i=0;i<7;i++)
		{

			for(var j=0,tamano=(7-i);j<tamano;j++)
			{
				posiciones[numerocartas]={"x":0,"y":0};
				numerocartas++;
			}
		}
		milista_Cartas.inicia(numerocartas,posiciones);

		limite["superior"]=6;
		limite["inferior"]=0;
		
		(function(){
			//CAMBIAR POR UNA FORMA DE OBTENER QUIENES VAN A JUGAR
			var numjugadores=4;
			var nombres = [];
			var cartas = [];	
			console.log("meto mis jugadores");
			nombres.push("Primero");
			nombres.push("Segundo");
			nombres.push("Tercero");
			nombres.push("Cuarto");
			for(var i=0;i<numjugadores;i++)
			{
				cartas.push(miMazo.sacarCarta(),miMazo.sacarCarta(),miMazo.sacarCarta());
			}
			milista_Jugadores.inicia(numjugadores,nombres,cartas);
		})();
		resize(micanvas,micontexto);
		dibuja();
	}

	var resize = function(canvas,contexto)
	{
		var posiciones=[];
		var numerocartas=0;
		var esp_x=5;
		var esp_y=5;
		var carta_x=(canvas.width-esp_x*8)/10;
		var carta_y=(canvas.height-esp_x*8)/7;
		for(var i=0;i<7;i++)
		{

			for(var j=0,tamano=(7-i);j<tamano;j++)
			{
				posiciones[numerocartas]={"x":(j+1)*esp_x+j*carta_x+i*(carta_x+esp_y)/2,"y":tamano*esp_y+(tamano-1)*carta_y};
				numerocartas++;
			}
		}
		milista_Cartas.setTamano(carta_x,carta_y);
		milista_Cartas.setPosicion(posiciones);
		milista_Jugadores.setTamano(carta_x,carta_y);
		milista_Jugadores.setPosicion({"x":7*carta_x+8*esp_x,"y":0});
		dibuja();
	}

	var click = function(x,y)
	{
		var click = milista_Cartas.dentro(x,y);
		if(click.boolean && click.i>=limite["inferior"] && click.i<=limite["superior"])
		{
			var carta=miMazo.sacarCarta();
			milista_Cartas.destapar(carta,click.i,micontexto);
			cartasdestapadas++;
			var comprobacion=milista_Jugadores.comprueba(carta);
			if(comprobacion.length>0)
			{
				if(estado%2 != 0 )
				{
					alert("Manda beber : "+milista_Jugadores.getNombre(comprobacion));

				}else{
					alert("Bebe: "+milista_Jugadores.getNombre(comprobacion));
				}
			}else{
				console.log("No hay coincidencias");
			}
			if(cartasdestapadas==(7-estado))
			{
				limite["inferior"]+=(7-estado);
				limite["superior"]+=(6-estado);
				cartasdestapadas=0;
				estado++;
				if(estado==7)
				{
					alert("Se ha terminado el juego");
					inicia(micanvas,micontexto);
					return;
				}
			}
		}
		
	}
	return{
		inicia: inicia,
		resize: resize,
		click: click
	}
}

var microupier;
//Cuando cargo mi pagina por primera vez
window.onload = function(){
  	//Obtengo mediante mi id el Canvas
  	var canvas = document.getElementById('micanvas');
  	//Aqui mi condigo para redimensionar mi Canvas
  	//
  	//
  	canvas.width=window.innerWidth;
  	canvas.height=window.innerHeight;
  	//Obtengo contexto mediante mi canvas
  	var contexto = canvas.getContext('2d');
  	//
  	if(canvas && contexto)
  	{
  		microupier = new croupier(canvas,contexto);
  		microupier.inicia(canvas);
  		//Añadimos evento de resize
  		window.addEventListener("resize", function (evt){  
	  		console.log("paso poraqui");
	  		canvas.width=window.innerWidth;
  			canvas.height=window.innerHeight;
	    	microupier.resize(canvas,contexto);
	  	},false);
  		//Añadimos un addEventListener al canvas, para reconocer el click
  		canvas.addEventListener("click", function (evt){  
	  		//Obtengo la posicion del ratón
	    	var mousePos = getMousePos(canvas, evt);
	    	microupier.click(mousePos.x,mousePos.y);
	  	}, false);	
	}
}