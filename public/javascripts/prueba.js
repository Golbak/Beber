//Constantes para encontrar la foto de la carta en la baraja
const sx=75;
const sy=60;
const sW=146;
const sH=196;
const posicioncarta=[{"x":0,"y":0},{"x":1,"y":0},{"x":0,"y":1},{"x":1,"y":1},{"x":0,"y":2},{"x":1,"y":2},{"x":0,"y":3},{"x":1,"y":3},{"x":0,"y":4},{"x":1,"y":4},{"x":9,"y":4},{"x":8,"y":5},{"x":9,"y":5},
                  {"x":2,"y":0},{"x":3,"y":0},{"x":2,"y":1},{"x":3,"y":1},{"x":2,"y":2},{"x":3,"y":2},{"x":2,"y":3},{"x":3,"y":3},{"x":2,"y":4},{"x":3,"y":4},{"x":9,"y":1},{"x":8,"y":2},{"x":9,"y":2},
                  {"x":4,"y":0},{"x":5,"y":0},{"x":4,"y":1},{"x":5,"y":1},{"x":4,"y":2},{"x":5,"y":2},{"x":4,"y":3},{"x":5,"y":3},{"x":4,"y":4},{"x":5,"y":4},{"x":8,"y":0},{"x":9,"y":0},{"x":8,"y":1},
                  {"x":6,"y":0},{"x":7,"y":0},{"x":6,"y":1},{"x":7,"y":1},{"x":6,"y":2},{"x":7,"y":2},{"x":6,"y":3},{"x":7,"y":3},{"x":6,"y":4},{"x":7,"y":4},{"x":8,"y":3},{"x":9,"y":3},{"x":8,"y":4}];

//Constantes para la dibujar la carta todo referido al ancho o altura (que deberan ser las mismas)
const margen=0.05;
const margen_x_superior=0.20;
const margen_x_inferior=0.01;
const margen_y_superior=0.20;
const margen_y_inferior=0.01;
//estos decrementos son los que se aplicaran cuando ya solo queden 3, los intermedios son todos iguales (proporcionales a 49 avances)
const decremento_x_superior=0.20-5/30;
const decremento_x_inferior=0.009-5/30;
const decremento_y_superior=0.20+5/30;
const decremento_y_inferior=0.009+5/30;

//Constantes para el mazo
const numcartasmazo=52;

//Variable global para la imagen de la carta
var imgc;

//Funcion para obtener la posicion del raton
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();                                                //Obtengo coordenadas de mi canvas
  return {"x": evt.clientX - rect.left,                                                             //Obtengo coordenadas de mi evento
    	  "y": evt.clientY - rect.top}                                                               //La resta sera donde esta mi cursor en coordenadas absolutas
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
		numcartas: numcartas,
		cartasRestantes: cartasRestantes,
		reiniciar: reiniciar,
		sacarCarta: sacarCarta
	}
}


//Mi clase carta
/*****************************************************************/
function Carta(posicion_x,posicion_y){
	var mipos = {"x":posicion_x,"y":posicion_y};
	var migiro = {"angulo":0,"cx":0,"cy":0}
	var miposicioncarta={"x":12,"y":6};
	var mitamano = {"x":0,"y":0};
	var miestado=1;
	var micarta=-1;

	var setPosicion = function(posicion)
	{
		mipos["x"]=posicion["x"];
		mipos["y"]=posicion["y"];
	}

	var setGiro = function(giro)
	{
		migiro["angulo"]=giro["angulo"];
		migiro["cx"]=giro["cx"];
		migiro["cy"]=giro["cy"];
	}

	var setTamano = function(tamcart)
	{
		mitamano["x"]=tamcart["x"];
		mitamano["y"]=tamcart["y"];
	}

	var setCarta = function(numero)
	{
		if(numero < 0)
		{
			miposicioncarta["x"]=12;
		    miposicioncarta["y"]=6;
		}else{
		    miposicioncarta["x"]=posicioncarta[numero]["x"];
		    miposicioncarta["y"]=posicioncarta[numero]["y"];
		}
		micarta=numero;
		miestado=0;
	}	

  	var dibuja = function(contexto){
		if(contexto)
		{
			if(migiro["angulo"]!=0)
			{
				contexto.save();
				contexto.translate(migiro["cx"],migiro["cy"]);	
				contexto.rotate(migiro["angulo"]);	
			}
			/*console.log("hola");
			console.log(posicioncarta);
			console.log(mipos);
			console.log(mitamano);*/
		  	contexto.drawImage(imgc , sx+sW*miposicioncarta["x"], sy+sH*miposicioncarta["y"], sW, sH, mipos["x"], mipos["y"], mitamano["x"], mitamano["y"]);
		  	if(migiro["angulo"]!=0)
			{
		  		contexto.restore();
		  	}
		}
	};

	var destapar = function(numero,contexto)
	{
		if(numero < 0)
		{
			miposicioncarta["x"]=12;
		    miposicioncarta["y"]=6;
		}else{
		    miposicioncarta["x"]=posicioncarta[numero]["x"];
		    miposicioncarta["y"]=posicioncarta[numero]["y"];
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

  	var dentro = function(pos)
	{
		var x=pos["x"];
		var y=pos["y"];
		
		if(migiro["angulo"]!=0)
		{
			x-=migiro["cx"];
			y-=migiro["cy"];
			var x2 =parseInt( (Math.cos(-migiro["angulo"])*x) - (Math.sin(-migiro["angulo"])*y) );
			y=parseInt( (Math.sin(-migiro["angulo"])*x) + (Math.cos(-migiro["angulo"])*y) );
			x=x2;
			
		}
		if(x>=mipos["x"] && y>=mipos["y"] && x<=(mipos["x"]+mitamano["x"]) && y<=(mipos["y"]+mitamano["y"]))
    		return true;
    	
  		return false;
	};
  	
  	return {
  		carta: micarta,
  		giro: migiro,
  		setPosicion: setPosicion,
  		getPosicion: mipos,
  		setGiro: setGiro,
  		getGiro: migiro,
  		setTamano: setTamano,
  		setCarta: setCarta,
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

	var anadirCarta = function(indice,carta)
	{
		cartas[indice]=carta;
	}

	var eliminarCarta = function(indice)
	{
		if(cartas[indice])
			cartas.splice(indice,1);
	}

	var is = function(indice)
	{
		if(cartas[indice])
			return true;
		return false;
	}
	var setTamano = function(tamcart)
	{
		for(var i=0,tamano=cartas.length;i<tamano;i++)
			cartas[i].setTamano(tamcart);
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

	var getPosicion = function()
	{
		var res;
		for(var i=0,tamano=cartas.length;i<tamano;i++)
				res.push(cartas[i].getPosicion());
		return res;
	}

	var setGiro = function(giros)
	{
		if(giros.length==cartas.length)
		{
			for(var i=0,tamano=cartas.length;i<tamano;i++)
				cartas[i].setGiro(giros[i]);
		}
	}

	var getGiro = function()
	{
		var res;
		for(var i=0,tamano=cartas.length;i<tamano;i++)
				res.push(cartas[i].getGiro());
		return res;
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

	var dentro = function(pos)
	{
		for(var i=0,tamano=cartas.length;i<tamano;i++)
		{
			if(cartas[i].dentro(pos))
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

	var dentro2 = function(pos)
	{
		for(var i=cartas.length-1;i>=0;i--)
		{
			if(cartas[i].dentro(pos))
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
		anadirCarta: anadirCarta,
		eliminarCarta: eliminarCarta,
		is: is,
		setTamano: setTamano,
		setPosicion: setPosicion,
		getPosicion: getPosicion,
		setGiro: setGiro,
		getGiro: getGiro,
		dibuja: dibuja,
		destapar: destapar,
		comprueba: comprueba,
		dentro: dentro,
		dentro2: dentro2
	}
}

//Mi clase croupier
function croupier(canvas,contexto)
{
	var miMazo = new Mazo(numcartasmazo);
	var milista_Cartas = new lista_Cartas();
	var micanvas = canvas;
	var micontexto = contexto;
	var giros = [];
	var margenes ={	"margen":0,
					"x":{"superior":micanvas.width*margen_x_superior,"inferior":micanvas.width*margen_x_inferior},
					"y":{"superior":micanvas.width*margen_y_superior,"inferior":micanvas.width*margen_y_inferior}};
	var limite={"x":{"superior":0,"inferior":0},"y":{"superior":0,"inferior":0}};
	var estado;
	
	var dibuja = function()
	{
		micanvas.width=micanvas.width;
		milista_Cartas.dibuja(micontexto);
	}
	var cargarImagen = function (callback)
	{
		imgc = new Image();
		imgc.onload = callback;
		imgc.src = '/images/baraja.jpg';
	}
	var inicia = function()
	{
		cargarImagen(function(canvas,contexto){
		miMazo.reiniciar();
  		giros = [];
  		estado = 0;
		for(var i=0,tamano=miMazo.numcartas;i<tamano;i++)
	  	{
	  		//Genero aleatorio para que unas cartas esten encima de otras
	  		var aleatorio;
	  		do
	  		{
	  			aleatorio=parseInt(Math.floor(Math.random()*(miMazo.numcartas)));
	  		}while(milista_Cartas.is(aleatorio));
	  		//Meto de izquierda a derecha mis cartas en el array
	  		var x=parseInt(Math.floor(Math.random()*(margenes["x"]["superior"]-margenes["x"]["inferior"])+margenes["x"]["inferior"]));
	  		var y=parseInt(Math.floor(Math.random()*(margenes["y"]["superior"]-margenes["y"]["inferior"])+margenes["y"]["inferior"]));
	  		milista_Cartas.anadirCarta(aleatorio,new Carta(x,y));
	  		giros[aleatorio]={"angulo":2*(i+1)*Math.PI/(tamano),"cx":0,"cy":0,"x":x,"y":y};
	  	}
		//Aqui mi condigo para redimensionar mi Canvas
		resize(micanvas,1);
			//Añadimos evento de resize
  			window.addEventListener("resize", function (evt){  
	  			micanvas.width= window.innerWidth;
  				micanvas.height= window.innerHeight;
	    		resize(micanvas,1);
	  		},false);
  			//Añadimos un addEventListener al canvas, para reconocer el click
  			micanvas.addEventListener("click", function (evt){  
	  			//Obtengo la posicion del ratón
	    		click(getMousePos(micanvas, evt));
	  		}, false);	
  		});
	}

	var resize = function(canvas,flag)
	{
		var tamano=giros.length;
		if(flag==1)
		{
			if(window.innerWidth<window.innerHeight)
			{
				micanvas.width = window.innerWidth;
			  	micanvas.height = window.innerWidth;
			}else{
				micanvas.width = window.innerHeight;
			  	micanvas.height = window.innerHeight;
			}
	  		var tamanos={"x":0,"y":0};
	  		margenes["margen"]=micanvas.width*margen;
	  		margenes["x"]["superior"]=micanvas.width*margen_x_superior;
	  		margenes["x"]["inferior"]=micanvas.width*margen_x_inferior;
	  		margenes["y"]["superior"]=micanvas.width*margen_y_superior;
	  		margenes["y"]["inferior"]=micanvas.width*margen_y_inferior;
			
			limite["x"]["superior"]=margenes["x"]["superior"]-micanvas.width*decremento_x_superior*(numcartasmazo-tamano)/(numcartasmazo-3);
			limite["x"]["inferior"]=margenes["x"]["inferior"]-micanvas.width*decremento_x_inferior*(numcartasmazo-tamano)/(numcartasmazo-3);
			limite["y"]["superior"]=margenes["y"]["superior"]-micanvas.width*decremento_y_superior*(numcartasmazo-tamano)/(numcartasmazo-3);
			limite["y"]["inferior"]=margenes["y"]["inferior"]-micanvas.width*decremento_y_inferior*(numcartasmazo-tamano)/(numcartasmazo-3);

			var hipotenusa = (micanvas.width/2) - (margenes["margen"]+margenes["y"]["superior"]);
			tamanos["y"]= Math.sqrt( Math.pow(hipotenusa,2)/ (1+Math.pow(sW/sH,2)) );
	  		tamanos["x"]= (sW/sH)*tamanos["y"];
	  		milista_Cartas.setTamano(tamanos);
		}
		
		var limitenuevo={	"x":{	"superior":margenes["x"]["superior"]-micanvas.width*decremento_x_superior*(numcartasmazo-tamano)/(numcartasmazo-3),
									"inferior":margenes["x"]["inferior"]-micanvas.width*decremento_x_inferior*(numcartasmazo-tamano)/(numcartasmazo-3)},
							"y":{	"superior":margenes["y"]["superior"]-micanvas.width*decremento_y_superior*(numcartasmazo-tamano)/(numcartasmazo-3),
									"inferior":margenes["y"]["inferior"]-micanvas.width*decremento_y_inferior*(numcartasmazo-tamano)/(numcartasmazo-3)}};

		var rango={	"x":(limitenuevo["x"]["superior"]-limitenuevo["x"]["inferior"])/(limite["x"]["superior"]-limite["x"]["inferior"]),
					"y":(limitenuevo["y"]["superior"]-limitenuevo["y"]["inferior"])/(limite["y"]["superior"]-limite["y"]["inferior"])};

		for(var i=0;i<tamano;i++)
		{
			giros[i]["angulo"]=(2*(i+1)*Math.PI/(tamano));
			giros[i]["cx"]=micanvas.width/2;
			giros[i]["cy"]=micanvas.height/2;
			giros[i]["x"]=(rango["x"]*giros[i]["x"]-limite["x"]["inferior"])+limitenuevo["x"]["inferior"];
			giros[i]["y"]=(rango["y"]*giros[i]["y"]-limite["y"]["inferior"])+limitenuevo["y"]["inferior"];
		}
		console.log(giros);
		limite=limitenuevo;		
		milista_Cartas.setPosicion(giros);
		milista_Cartas.setGiro(giros);
		dibuja();
	}

	var click = function(pos)
	{
		var click = milista_Cartas.dentro2(pos);
		if(click.boolean)
		{
			milista_Cartas.eliminarCarta(click.i);
			giros.splice(click.i,1);
			estado--;
			resize(micanvas,0);
		}
		
	}
	return{
		inicia: inicia,
	}
}

//Cuando cargo mi pagina por primera vez
window.onload = function(){
	//Obtengo mediante mi id el Canvas
  	var canvas = document.getElementById('micanvas');
  	if(window.innerWidth<window.innerHeight)
		{
			micanvas.width = window.innerWidth;
		  	micanvas.height = window.innerWidth;
		}else{
			micanvas.width = window.innerHeight;
		  	micanvas.height = window.innerHeight;
		}
  	//Obtengo contexto mediante mi canvas
  	var contexto = canvas.getContext('2d');
  	//
  	if(canvas && contexto)
  	{
  		var microupier = new croupier(canvas,contexto);
  		microupier.inicia();
	}
}
