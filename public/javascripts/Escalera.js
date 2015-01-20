//variables para cartas
var cartas = [];
var escalera = [];

//Variable que almacena el numero de cartas del mazo (para distintos mazos como la española, la de poker, etc...)                           
var numcartas=52;

//Posiciones de mis cartas en la foto
var posicioncarta=[{"x":0,"y":0},{"x":1,"y":0},{"x":0,"y":1},{"x":1,"y":1},{"x":0,"y":2},{"x":1,"y":2},{"x":0,"y":3},{"x":1,"y":3},{"x":0,"y":4},{"x":1,"y":4},{"x":9,"y":4},{"x":8,"y":5},{"x":9,"y":5},
                  {"x":2,"y":0},{"x":3,"y":0},{"x":2,"y":1},{"x":3,"y":1},{"x":2,"y":2},{"x":3,"y":2},{"x":2,"y":3},{"x":3,"y":3},{"x":2,"y":4},{"x":3,"y":4},{"x":9,"y":1},{"x":8,"y":2},{"x":9,"y":2},
                  {"x":4,"y":0},{"x":5,"y":0},{"x":4,"y":1},{"x":5,"y":1},{"x":4,"y":2},{"x":5,"y":2},{"x":4,"y":3},{"x":5,"y":3},{"x":4,"y":4},{"x":5,"y":4},{"x":8,"y":0},{"x":9,"y":0},{"x":8,"y":1},
                  {"x":6,"y":0},{"x":7,"y":0},{"x":6,"y":1},{"x":7,"y":1},{"x":6,"y":2},{"x":7,"y":2},{"x":6,"y":3},{"x":7,"y":3},{"x":6,"y":4},{"x":7,"y":4},{"x":8,"y":3},{"x":9,"y":3},{"x":8,"y":4}];

//Variables para hacer el tamaño escalable                             
var W=900;
var H=450;
var esp_x=5;
var esp_y=10;
var carta_x=106;
var carta_y=142.3;
var boton_x=(W-8*esp_x)/3;
var boton_y=H-(2*carta_y+6*esp_y);

//Varaibles para encontrar la foto de la carta en la baraja
var sx=75;
var sy=60;
var sW=146;
var sH=196;

//Varianle para las imagenes de las cartas
var imgc = new Image();
imgc.src = '/images/baraja.jpg';                                                           	//La imagen de mi cartavacia
var imgb = [new Image(),new Image(),new Image()];
imgb[0].src = '/images/boton1.jpg';
imgb[1].src = '/images/boton2.jpg';
imgb[2].src = '/images/boton3.jpg';

//Funcion para obtener la posicion del raton
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();                                                //Obtengo coordenadas de mi canvas
  return {
    x: evt.clientX - rect.left,                                                             //Obtengo coordenadas de mi evento
    y: evt.clientY - rect.top                                                               //La resta sera donde esta mi cursor en coordenadas absolutas
  };
}

//Funcion de comprobar carta
function comprobar(carta) {
  for(var i=0,tamano=cartas.length;i<tamano;i++)                                            //Recorro mis cartas salidas
  {
    if(carta==cartas[i])                                                                    //Si hay una que es igual
    {
      return true;                                                                          //Es cierto que esta repetida
    }
  }
  return false;                                                                             //Y devuelvo que no esta repetida
}

//Funcion que devuelve una carta
function obtenerCarta()
{
	var carta;                                                                              //Variable para la nueva carta
	  
	if(cartas.length==numcartas)															//Si he gastado la baraja reinicio y quito las que ya estan puestas
	{
		cartas=[];
		cartas=escalera.slice(0);
	}

	do{
		carta=parseInt(Math.floor(Math.random()*(numcartas)));                               //Obtengo la nueva carta
	}while(comprobar(carta));                                                                //Compruebo si mi carta ya ha salido 
	cartas.push(carta);                                                                      //Meto mi carta en el mazo
	return carta;
}

//Meter carta
function meterCarta(contexto)
{
	escalera.push(obtenerCarta());
	var i=escalera.length-1;
	var numero=escalera[i];
	dibujarCarta(i,contexto,posicioncarta[numero]["x"],posicioncarta[numero]["y"])
}

//Funcion que dibuja carta gracias a un indice
function dibujarCarta(i,contexto,x,y)
{
	if(i>2 && i<6)
	{
		contexto.drawImage(imgc ,sx+sW*x,sy+sH*y,sW,sH, i*carta_x+(i+1)*esp_x, esp_y, carta_x, carta_y);         	//Dibujo la imagen de mi carta 		
	}else{
		contexto.drawImage(imgc ,sx+sW*x,sy+sH*y,sW,sH, i*carta_x+(i+1)*esp_x, carta_y+2*esp_y, carta_x, carta_y);         	//Dibujo la imagen de mi carta		
	}
}
//Funcion para repartir
function repartir(contexto)
{
	for(var i=0;i<8;i++)
		{
			var x,y;
			if(escalera[i])
			{
				x=posicioncarta[escalera[i]]["x"];
				y=posicioncarta[escalera[i]]["y"];
			}else{
				x=12;
				y=6;
			}
			dibujarCarta(i,contexto,x,y);
		}	
		for(var i=0,tamano=imgb.length;i<tamano;i++)
  		{
      		contexto.drawImage(imgb[i], i*boton_x+(2+(i*2))*esp_x, H-boton_y-esp_y ,boton_x,boton_y);          //Dibujo mi nuevo boton  		
      	}
}

//Funtion Beber
function Beber(flag,contexto)
{
	if(flag)
	{
		alert('no bebes');
		
		if(escalera.length==8)
		{
			alert('Ganaste');
			cartas=[];
			escalera=[];
			repartir(contexto);
			meterCarta(contexto);
		}else if(escalera.length==7 || escalera.length==4){
			alert('Bebes');
		}

	}else{
		alert('bebes');
		
		dibujarCarta(escalera.length-1,contexto,12,6)
		escalera.pop();
		if(escalera.length>1)
		{
			dibujarCarta(escalera.length-1,contexto,12,6)
			escalera.pop();
		}

		if(escalera.length==6 || escalera.length==3){
			alert('Bebes');
		}
		
	}
}
//Funcion proceso
function proceso(flag,contexto)
{
	meterCarta(contexto);
	var actual=escalera[escalera.length-1];                                                       //Mi actual esta al final del array
  	var anterior=escalera[escalera.length-2];                                                     //Mi anterior esta en la antepenultima

  	actual=actual-13*Math.floor(actual/13);                                                   //
  	anterior=anterior-13*Math.floor(anterior/13);

	switch(flag){
		case 'mayor':                                                                           //Si me han dado mayor   
	    	Beber(actual>anterior,contexto);                                                               //Mi condicion sera que la ultima que he sacado sea mayor que la anterior
	      	break;
	    case 'igual':                                                                           //Si me han dado igual
	      	Beber(actual==anterior,contexto);                                                              //Mi condicion sera que la ultima sea igual que la anterior
	      	break;
	    case 'menor':                                                                           //Si me han dado menor
	      	Beber(actual<anterior,contexto);                                                               //Mi condicion sera que la ultima sea menor que la anterior
	      	break;
	  }
}

//Cuando cargo la pagina empiezo el juego
window.onload = function(){
	//Obtengo mediante mi id el Canvas
	var canvas = document.getElementById('micanvas');
	//Obtengo contexto mediante mi canvas
	var contexto = canvas.getContext('2d');
	if(canvas && contexto)
	{
		repartir(contexto);
		meterCarta(contexto);	
	}

	canvas.addEventListener("click", function (evt){  
		//Obtengo la posicion del ratón
		var mousePos = getMousePos(canvas, evt);
		//Si mi raton esta encima de unos de los botones
	    if(mousePos.x>(2*esp_x) && mousePos.x<(boton_x+2*esp_x) && mousePos.y>(H-boton_y-esp_y) && mousePos.y<(H-esp_y)){
	    	proceso('mayor',contexto);
	    }else if(mousePos.x>(boton_x+4*esp_x) && mousePos.x<(2*boton_x+4*esp_x) && mousePos.y>(H-boton_y-esp_y) && mousePos.y<(H-esp_y)){
	    	proceso('igual',contexto);
	    }else if(mousePos.x>(2*boton_x+6*esp_x) && mousePos.x<(W-2*esp_x) && mousePos.y>(H-boton_y-esp_y) && mousePos.y<(H-esp_y)){
	    	proceso('menor',contexto);
	    }
	     
	}); 
}