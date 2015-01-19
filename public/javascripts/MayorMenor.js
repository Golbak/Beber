//Variable que almacena las cartas que han salido
var cartas=[];

//Posiciones de mis cartas en la foto
var posicioncarta=[{"x":0,"y":0},{"x":1,"y":0},{"x":0,"y":1},{"x":1,"y":1},{"x":0,"y":2},{"x":1,"y":2},{"x":0,"y":3},{"x":1,"y":3},{"x":0,"y":4},{"x":1,"y":4},{"x":9,"y":4},{"x":8,"y":5},{"x":9,"y":5},
                  {"x":2,"y":0},{"x":3,"y":0},{"x":2,"y":1},{"x":3,"y":1},{"x":2,"y":2},{"x":3,"y":2},{"x":2,"y":3},{"x":3,"y":3},{"x":2,"y":4},{"x":3,"y":4},{"x":9,"y":1},{"x":8,"y":2},{"x":9,"y":2},
                  {"x":4,"y":0},{"x":5,"y":0},{"x":4,"y":1},{"x":5,"y":1},{"x":4,"y":2},{"x":5,"y":2},{"x":4,"y":3},{"x":5,"y":3},{"x":4,"y":4},{"x":5,"y":4},{"x":8,"y":0},{"x":9,"y":0},{"x":8,"y":1},
                  {"x":6,"y":0},{"x":7,"y":0},{"x":6,"y":1},{"x":7,"y":1},{"x":6,"y":2},{"x":7,"y":2},{"x":6,"y":3},{"x":7,"y":3},{"x":6,"y":4},{"x":7,"y":4},{"x":8,"y":3},{"x":9,"y":3},{"x":8,"y":4}];
//Variable que almacena el numero de cartas del mazo (para distintos mazos como la española, la de poker, etc...)                           
var numcartas=52;

//Variables para hacer el tamaño escalable                             
var esp_x=10;
var esp_y=10;
var W=253;
var H=418;

//Varaibles para encontrar la foto de la carta en la baraja
var sx=75;
var sy=60;
var sW=146;
var sH=196;

//Varianle para las imagenes de las cartas
var imgc = new Image();
imgc.src = '/images/baraja.jpg';                                                           //La imagen de mi cartavacia
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

//Funcion para comprobar si la carta ya ha salido
function comprobar(carta) {
  for(var i=0,tamano=cartas.length;i<tamano;i++)                                                          //Recorro mis cartas salidas
  {
    if(carta==cartas[i])                                                                    //Si hay una que es igual
    {
      return true;                                                                          //Es cierto que esta repetida
    }
  }
  return false;                                                                             //Y devuelvo que no esta repetida
}

//Funcion que carga la UI
function recargarUI(canvas,contexto)
{
  if (canvas && contexto) {
    var numero=cartas[cartas.length-1];                                                     //En la ultima posicion tengo la carta actual
    DibujarCartaGrande(posicioncarta[numero]["x"],posicioncarta[numero]["y"],contexto);     //Dibujo mi carta grande que acaba de salir
    numero=cartas[cartas.length-2];                                                         //En la penultima posicion tengo la carta anterior
    DibujarCartaPequena(posicioncarta[numero]["x"],posicioncarta[numero]["y"],contexto);    //Dibujo mi carta pequeña de la ronda anterior
    }
}

//Funcion que devuelve una carta
function obtenerCarta()
{
  var carta;                                                                                //Variable para la nueva carta
  do{
    carta=parseInt(Math.floor(Math.random()*(numcartas)));                                              //Obtengo la nueva carta
  }while(comprobar(carta));                                                                 //Compruebo si mi carta ya ha salido 
  cartas.push(carta);                                                                       //Meto mi carta en el mazo
}

//Funcion que muestra que tienes que hacer, beber o no beber
function Beber(flag)
{
  if(flag)                                                                                  //Si es verdad sera que he acertado y por tanto no me toca beber
  {
    alert('No bebas');                                                                      //Animacion que me mostrara que no me toca beber
  }else{
    alert('Bebes');                                                                         //Si en cambio fallo mostrare animacion de que me toca beber
  }
}

//Funcion proceso
function proceso(flag,canvas,contexto)
{
  obtenerCarta();                                                                           //Pido mi carta, se encarga de meterla en el mazo
  recargarUI(canvas,contexto);                                                              //Recargo la ui, que pondra en el mazo la penultima carta y en grande la ultima
  var actual=cartas[cartas.length-1];                                                       //Mi actual esta al final del array
  var anterior=cartas[cartas.length-2];                                                     //Mi anterior esta en la antepenultima
  
  actual=actual-13*Math.floor(actual/13);                                                   //
  anterior=anterior-13*Math.floor(anterior/13);

  switch(flag){
    case 'mayor':                                                                           //Si me han dado mayor   
      Beber(actual>anterior);                                                               //Mi condicion sera que la ultima que he sacado sea mayor que la anterior
      break;
    case 'igual':                                                                           //Si me han dado igual
      Beber(actual==anterior);                                                              //Mi condicion sera que la ultima sea igual que la anterior
      break;
    case 'menor':                                                                           //Si me han dado menor
      Beber(actual<anterior);                                                               //Mi condicion sera que la ultima sea menor que la anterior
      break;
  } 
}

//Funcion para dibujar los botones
function DibujarBotones(contexto)
{
  for(var i=0,tamano=imgb.length;i<tamano;i++)
    {
      contexto.drawImage(imgb[i],W+2*esp_x,esp_y+(H/6-esp_y)*(i),W*3/4,H/6-esp_y);          //Dibujo mi nuevo boton
    } 
}

//Funcion Dibujar Carta Grande
function DibujarCartaGrande(x,y,contexto)
{
  contexto.drawImage(imgc , sx+sW*x, sy+sH*y, sW, sH, esp_x, esp_y, W, H);                   //Dibujo la imagen de mi carta
}

//Funcion Dibujar Carta Pequeña
function DibujarCartaPequena(x,y,contexto)
{
  contexto.drawImage(imgc , sx+sW*x, sy+sH*y, sW, sH, W+2*esp_x, H/2+esp_y, W/2, H/2);       //Dibujo la imagen de mi carta
}
//Funcion IniciarUI
function iniciarUI(canvas,contexto)
{
  //Reinicio el mazo
  cartas=[];
  //Comprobación sobre si encontramos un elemento
  //y podemos extraer su contexto con getContext(), que indica compatibilidad con canvas
  if (canvas && contexto) {
      //Obtengo mi primera carta
      obtenerCarta();                                                                        //Obtengo la nueva carta 
      var numero=cartas[cartas.length-1];                                                    //En la ultima posicion tengo la carta actual     
      DibujarCartaGrande(posicioncarta[numero]["x"],posicioncarta[numero]["y"],contexto);    //Dibujo mi nueva carta
      //Pongo una carta vacia en la anterior
      DibujarCartaPequena(12,6,contexto);                                                    //Dibujo la imagen de mi carta
      //Dibujo los tres botones
      DibujarBotones(contexto);                                                                      //Uso la funcion dibujar botones para dibujar los botones
  }
}

//Cuando cargo la pagina empiezo el juego
window.onload = function(){
  //Obtengo mediante mi id el Canvas
  var canvas = document.getElementById('micanvas');
  //Obtengo contexto mediante mi canvas
  var contexto = canvas.getContext('2d');
  //Inicio la UI
  iniciarUI(canvas,contexto);
  //Añadimos un addEventListener al canvas, para reconocer el click
  canvas.addEventListener("click", function (evt){  
    //Obtengo la posicion del ratón
    var mousePos = getMousePos(canvas, evt);
    //Si ya he llegado al tope reinicio el juego, sino sigo con el juego
    if(cartas.length>=numcartas)
    {
      iniciarUI(canvas,contexto);
    }else{
      //Si mi raton esta encima de unos de los botones
      if(mousePos.x>(W+2*esp_x) && mousePos.x<(W*7/4+2*esp_x) && mousePos.y>(esp_y) && mousePos.y<(H/6)){
        proceso('mayor',canvas,contexto);
      }else if(mousePos.x>(W+2*esp_x) && mousePos.x<(W*7/4+2*esp_x) && mousePos.y>(H/6) && mousePos.y<(H/3-esp_y)){
        proceso('igual',canvas,contexto);
      }else if(mousePos.x>(W+2*esp_x) && mousePos.x<(W*7/4+2*esp_x) && mousePos.y>(H/3-esp_y) && mousePos.y<(H/2-2*esp_y)){
        proceso('menor',canvas,contexto);
      }
    }
  }, false);

}