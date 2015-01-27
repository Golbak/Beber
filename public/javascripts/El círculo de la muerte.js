//Array de cartas
var cartas=[];
var path=[];
var mazo=[];
var carta_x=50;
var carta_y=80;
var W;
var H;
//Variable que almacena el numero de cartas del mazo (para distintos mazos como la española, la de poker, etc...)                           
var numcartas=52;

//Posiciones de mis cartas en la foto
var posicioncarta=[{"x":0,"y":0},{"x":1,"y":0},{"x":0,"y":1},{"x":1,"y":1},{"x":0,"y":2},{"x":1,"y":2},{"x":0,"y":3},{"x":1,"y":3},{"x":0,"y":4},{"x":1,"y":4},{"x":9,"y":4},{"x":8,"y":5},{"x":9,"y":5},
                  {"x":2,"y":0},{"x":3,"y":0},{"x":2,"y":1},{"x":3,"y":1},{"x":2,"y":2},{"x":3,"y":2},{"x":2,"y":3},{"x":3,"y":3},{"x":2,"y":4},{"x":3,"y":4},{"x":9,"y":1},{"x":8,"y":2},{"x":9,"y":2},
                  {"x":4,"y":0},{"x":5,"y":0},{"x":4,"y":1},{"x":5,"y":1},{"x":4,"y":2},{"x":5,"y":2},{"x":4,"y":3},{"x":5,"y":3},{"x":4,"y":4},{"x":5,"y":4},{"x":8,"y":0},{"x":9,"y":0},{"x":8,"y":1},
                  {"x":6,"y":0},{"x":7,"y":0},{"x":6,"y":1},{"x":7,"y":1},{"x":6,"y":2},{"x":7,"y":2},{"x":6,"y":3},{"x":7,"y":3},{"x":6,"y":4},{"x":7,"y":4},{"x":8,"y":3},{"x":9,"y":3},{"x":8,"y":4}];

//Varaibles para encontrar la foto de la carta en la baraja
var sx=75;
var sy=60;
var sW=146;
var sH=196;

//Funcion para obtener la posicion del raton
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();                                                //Obtengo coordenadas de mi canvas
  return {
    x: evt.clientX - rect.left,                                                             //Obtengo coordenadas de mi evento
    y: evt.clientY - rect.top                                                               //La resta sera donde esta mi cursor en coordenadas absolutas
  };
}

//Funcion para comprobar si la carta ya ha salido
function comprobar(carta,path) {
  for(var i=0,tamano=path.length;i<tamano;i++)                                            //Recorro mis cartas salidas
  {
    if(carta==path[i])                                                                    //Si hay una que es igual
    {
      return true;                                                                          //Es cierto que esta repetida
    }
  }
  return false;                                                                             //Y devuelvo que no esta repetida
}

//Funcion que obtiene una carta nueva que no este en el path
function obtenerCarta(path)
{
  var carta;                                                                                //Variable para la nueva carta
  do{
    carta=parseInt(Math.floor(Math.random()*(numcartas)));                                              //Obtengo la nueva carta
  }while(comprobar(carta,path));                                                                 //Compruebo si mi carta ya ha salido 
  path.push(carta);                                                                       //Meto mi carta en el mazo
  return carta;
}

//funcion para saber si se ha sacado bien o no la carta
function sacarCarta()
{
	if(true)
	{
		return true;
	}
	return false;
}

//funcion que juega la carta
function jugarCarta(carta)
{
	if(sacarCarta())
	{
		carta=carta-13*Math.floor(carta/13);
		alert('Esta usted jugando la carta: '+carta);
		return true;
	}
	return false;
}

//Funcion para comprobar si se ha pinchado en una carta
function comprobarClick(mousePos){
	//Compruebo de derecha a izquierda porque lo he metido al reves y la ultima estara encima de las demas
  	for(var i=cartas.length-1;i>=0;i--)
  	{
    	if(cartas[i].dentro(mousePos.x,mousePos.y))
    	{
      		return {
      			boolean: true,
      			indice: i,															//Devuelvo mi indice para saber que carta eliminar
      			valor: cartas.length-(i+1) 											//Devuelvo esto porque meto las cartas en orden inverso a como recorro
      		};
    	}
  	}
  	return {
  		boolean: false
  	}
}
//Funcion que dibuja carta
function dibuja(canvas,contexto)
{
	if(contexto)
	{
		//Guardo mi contexto antes de transformar
		contexto.save();
		//Lo muevo al centro y giro mi angulo
		contexto.translate(canvas.width/2,canvas.height/2);
		contexto.rotate(this.angulo);
		//Dibujo en mi nuego eje a una distancia y=radio
	  	contexto.drawImage(this.imgc , sx+sW*this.posicioncarta_x, sy+sH*this.posicioncarta_y, sW, sH, 0, this.radio, this.carta_x, this.carta_y);
	  	//Recupero mi contexto
	  	contexto.restore();
	}
}

//Funcion que dice si esta dentro o no
function dentro(pos_x,pos_y)
{
	//Primero translado mi punto al medio
	pos_x-=W/2;
	pos_y-=H/2;
	//Segundo hago una rotacion sobre mi nuevo punto y translado el radio
	var pos_x2=parseInt( (Math.cos(-this.angulo)*pos_x) - (Math.sin(-this.angulo)*pos_y) );
	var pos_y2=parseInt( (Math.sin(-this.angulo)*pos_x) + (Math.cos(-this.angulo)*pos_y) -this.radio);

  	//Si caigo en el cuadrado estoy encima de mi carta
  	if(pos_x2>=0 && pos_y2>=0 && pos_x2<=this.carta_x && pos_y2<=this.carta_y)
    	return true;
  	return false;
}

//Funcion para obtener la carta
function getAngulo()
{
	return this.angulo;
}

//Funcion para poner la carta 
function setAngulo(numero)
{
  	this.angulo=numero;
}

//Funcion para obtener el radio
function getRadio(numero)
{
	return this.radio;
}
//Funcion para poner el radio
function setRadio(numero)
{
	this.radio=numero;
}

//Clase carta
function Carta(x,y,angulo,radio){
	this.carta_x = x;
	this.carta_y = y;
	this.posicioncarta_x=12;
	this.posicioncarta_y=6;
	this.angulo=angulo;
	this.radio=radio;
	this.carta=-1;
	this.imgc = new Image();
	this.imgc.src = '/images/baraja.jpg';
  	this.getAngulo = getAngulo;
  	this.setAngulo = setAngulo;
  	this.getRadio = getRadio;
  	this.setRadio = setRadio;
  	this.dibuja = dibuja;
	this.dentro = dentro;
} 

//Funcion recolocar
function recolocar(canvas,contexto,valor)
{
	//truco para limpiar el canvas
	canvas.width=canvas.width;
	var tamano=path.length;
	var rango=(10+(40/49*(tamano-3)))/(10+(40/49*(tamano-2))),limiteiferiornuevo=-20+70/49*(tamano-3),limiteiferiorantiguo=-20+70/49*(tamano-2);
			
	//ahora recoloco las cartas con nuevos radios
	for(var i=0;i<tamano;i++)
	{
		if(path[i]>valor)
			path[i]--;
		cartas[path[i]].setAngulo(2*(i+1)*Math.PI/(tamano));
		cartas[path[i]].setRadio( (rango*(cartas[path[i]].getRadio()-limiteiferiorantiguo))+limiteiferiornuevo ); //Mi rango en 51 es (100,50) y en 3 es (-10,-20)
	}
	//Dibujo el circulo
	for(var i=0,tamano=cartas.length;i<tamano;i++)   
	  	cartas[i].dibuja(canvas,contexto);  
}
//Funcion que reinicia todo
function iniciar(canvas,contexto)
{
	if(contexto)
	{
	  	$("#micanvas").attr("width",800);
	  	$("#micanvas").attr("height",800);

	  	W=canvas.width;
	  	H=canvas.height;

	  	//Reinicio variables
	  	path=[];
	  	cartas=[];

	  	var radio_max=100;
	  	var radio_min=50;
	  	//Meto las cartas en circulo
	  	for(var i=0;i<numcartas;i++)
	  	{
	  		//Genero aleatorio para que unas cartas esten encima de otras
	  		var aleatorio;
	  		do
	  		{
	  			aleatorio=parseInt(Math.floor(Math.random()*(numcartas)));
	  		}while(cartas[aleatorio]!=undefined);
	  		//Genero un radio aleatorio para que unas cartas esten mas alejadas que otras del centro
	  		var radio=parseInt(Math.floor(Math.random()*(radio_max-radio_min)+radio_min));
	  		//Meto de izquierda a derecha mis cartas en el array
	  		cartas[aleatorio]=(new Carta(carta_x,carta_y,2*(i+1)*Math.PI/(numcartas),radio)); 
	  		path.push(aleatorio);
	  	}
	  	console.log(path);
	  	console.log(cartas.length);
	  	//Dibujo el circulo
	  	for(var i=0,tamano=cartas.length;i<tamano;i++)   
	    	cartas[i].dibuja(canvas,contexto);  
	}
}

window.onload = function(){
  	//Obtengo mediante mi id el Canvas
  	var canvas = document.getElementById('micanvas');
  	//Obtengo contexto mediante mi canvas
  	var contexto = canvas.getContext('2d');
  	//Inicio el juego
  	iniciar(canvas,contexto);
  	//Añadimos un addEventListener al canvas, para reconocer el click
	canvas.addEventListener("click", function (evt){  
	    //Obtengo la posicion del ratón
	    var mousePos = getMousePos(canvas, evt);
	    var comprobacion=comprobarClick(mousePos);
	    if(comprobacion.boolean)
	    {
	    	//Juego la carta
	    	if(jugarCarta(obtenerCarta(mazo)))
	    	{
		    	//Elimino la carta
		    	cartas.splice(comprobacion.indice,1);
		    	var valor=comprobacion.valor;
		    	path.splice(path.indexOf(comprobacion.valor),1);
		    	recolocar(canvas,contexto,valor);
		    }else{
		    	alert('Has jodido el circulo');
		    	iniciar(canvas,contexto);
		    }
	    }
	    if(cartas.length<4)
	    {
	    	alert('Has terminado');
	    	iniciar(canvas,contexto);
	    }

	    });
}