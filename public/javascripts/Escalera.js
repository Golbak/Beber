//variables para cartas
var cartas = [];
var escalera = [];

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
imgc.src = '/images/baraja.jpg';                                                           					//La imagen de mi cartavacia
var imgb = [new Image(),new Image(),new Image()];
imgb[0].src = '/images/boton1.jpg';
imgb[1].src = '/images/boton2.jpg';
imgb[2].src = '/images/boton3.jpg';

//Funcion que devuelve una carta
function obtenerCarta()
{
  var carta;                                                                                //Variable para la nueva carta
  do{
    carta=parseInt(Math.floor(Math.random()*(numcartas)));                                              //Obtengo la nueva carta
  }while(comprobar(carta));                                                                 //Compruebo si mi carta ya ha salido 
  cartas.push(carta);                                                                       //Meto mi carta en el mazo
  return carta;
}

//Meter carta
function meterCarta(contexto)
{
	alert('hola');
	escalera.push(obtenerCarta());
	var i=escalera.length-1;
	if(i>2 && i<6)
	{
		contexto.drawImage(imgc ,sx+sW*12,sy+sH*6,sW,sH, i*carta_x+(i+1)*esp_x, esp_y, carta_x, carta_y);         	//Dibujo la imagen de mi carta 		
	}else{
		contexto.drawImage(imgc ,sx+sW*12,sy+sH*6,sW,sH, i*carta_x+(i+1)*esp_x, carta_y+2*esp_y, carta_x, carta_y);         	//Dibujo la imagen de mi carta		
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
		for(var i=1;i<8;i++)
		{
			if(i>2 && i<6)
			{
				contexto.drawImage(imgc ,sx+sW*12,sy+sH*6,sW,sH, i*carta_x+(i+1)*esp_x, esp_y, carta_x, carta_y);         	//Dibujo la imagen de mi carta 		
			}else{
				contexto.drawImage(imgc ,sx+sW*12,sy+sH*6,sW,sH, i*carta_x+(i+1)*esp_x, carta_y+2*esp_y, carta_x, carta_y);         	//Dibujo la imagen de mi carta		
			}
		}	
		for(var i=0,tamano=imgb.length;i<tamano;i++)
  		{
      		contexto.drawImage(imgb[i], i*boton_x+(2+(i*2))*esp_x, H-boton_y-esp_y ,boton_x,boton_y);          //Dibujo mi nuevo boton  		
      	}		 
	}

	meterCarta(contexto);

	canvas.addEventListener("click", function (evt){  
		//Obtengo la posicion del ratón
		var mousePos = getMousePos(canvas, evt);
		}); 
}