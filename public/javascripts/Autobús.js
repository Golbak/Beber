//Array de cartas
var cartas=[];
var path=[];
var carta;

//Relaciones de posicion entre las cartas
var relaciones=[[1,2],[3,4],[4,5],[6,7],[7,8],[8,9],[10],[10,11],[11,12],[12],[13],[13,14],[14],[15],[15]];

//Posiciones de mis cartas en la foto
var posicioncarta=[{"x":0,"y":0},{"x":1,"y":0},{"x":0,"y":1},{"x":1,"y":1},{"x":0,"y":2},{"x":1,"y":2},{"x":0,"y":3},{"x":1,"y":3},{"x":0,"y":4},{"x":1,"y":4},{"x":9,"y":4},{"x":8,"y":5},{"x":9,"y":5},
                  {"x":2,"y":0},{"x":3,"y":0},{"x":2,"y":1},{"x":3,"y":1},{"x":2,"y":2},{"x":3,"y":2},{"x":2,"y":3},{"x":3,"y":3},{"x":2,"y":4},{"x":3,"y":4},{"x":9,"y":1},{"x":8,"y":2},{"x":9,"y":2},
                  {"x":4,"y":0},{"x":5,"y":0},{"x":4,"y":1},{"x":5,"y":1},{"x":4,"y":2},{"x":5,"y":2},{"x":4,"y":3},{"x":5,"y":3},{"x":4,"y":4},{"x":5,"y":4},{"x":8,"y":0},{"x":9,"y":0},{"x":8,"y":1},
                  {"x":6,"y":0},{"x":7,"y":0},{"x":6,"y":1},{"x":7,"y":1},{"x":6,"y":2},{"x":7,"y":2},{"x":6,"y":3},{"x":7,"y":3},{"x":6,"y":4},{"x":7,"y":4},{"x":8,"y":3},{"x":9,"y":3},{"x":8,"y":4}];
//Variable que almacena el numero de cartas del mazo (para distintos mazos como la española, la de poker, etc...)                           
var numcartas=52;

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

//Funcion para comprobar si se ha pinchado en una carta
function comprobarClick(mousePos){
  for(var i=0,tamano=relaciones[carta].length;i<tamano;i++)
  {
    if(cartas[relaciones[carta][i]].dentro(mousePos.x,mousePos.y))
    {
      
      carta=relaciones[carta][i];
      return true;
    }
  }
  return false;
}

function obtenerCarta(path)
{
  console.log(path);
  var carta;                                                                                //Variable para la nueva carta
  do{
    carta=parseInt(Math.floor(Math.random()*(numcartas)));                                              //Obtengo la nueva carta
  }while(comprobar(carta,path));                                                                 //Compruebo si mi carta ya ha salido 
  path.push(carta);                                                                       //Meto mi carta en el mazo
  return carta;
}

//Funcion que dibuja carta
function dibuja(contexto)
{
  if(contexto)
  {
    contexto.drawImage(this.imgc , sx+sW*this.posicioncarta_x, sy+sH*this.posicioncarta_y, sW, sH, this.pos_x, this.pos_y, this.carta_x, this.carta_y);
  }
}

//Funcion que dice si esta dentro o no
function dentro(pos_x,pos_y)
{
  if(pos_x>this.pos_x && pos_y>this.pos_y && pos_x<(this.pos_x+this.carta_x) && pos_y<(this.pos_y+this.carta_y))
    return true;
  return false;
}

//Funcion para poner decidir que carta es
function setCarta(numero)
{
  if(numero < 0)
  {
    this.posicioncarta_x=12;
    this.posicioncarta_y=6;
  }else{
    this.posicioncarta_x=posicioncarta[numero]["x"];
    this.posicioncarta_y=posicioncarta[numero]["y"];
  }
}

//Clase carta
function Carta(x,y,pos_x,pos_y){
  
  this.carta_x = x;
  this.carta_y = y;
  this.pos_x = pos_x;
  this.pos_y = pos_y;
  this.posicioncarta_x=12;
  this.posicioncarta_y=6;
  this.imgc = new Image();
	this.imgc.src = '/images/baraja.jpg';
  this.setCarta = setCarta;
  this.dibuja = dibuja;
	this.dentro = dentro;
} 

//Funcion que reinicia todo
function iniciar(canvas,contexto)
{
  $("#micanvas").attr("width",350);
  $("#micanvas").attr("height",700);

  var W=$("#micanvas").attr("width");
  var H=$("#micanvas").attr("height");

  //Variables para hacer el tamaño escalable                             
  var esp_x=10;
  var esp_y=10;
  var carta_x=(W-5*esp_x)/4;
  var carta_y=(H-8*esp_y)/7;

  //Reinicio variables
  path=[];
  cartas=[];

  //Dibujo mi escalera
  if(canvas && contexto)
  {
    //Primer nivel
    cartas.push(new Carta(carta_x,carta_y,(W-carta_x)/2,esp_y));
    //Segundo nivel
    cartas.push(new Carta(carta_x,carta_y,(W-esp_x)/2-carta_x,carta_y+2*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+esp_x/2,carta_y+2*esp_y));
    //Tercer nivel
    cartas.push(new Carta(carta_x,carta_y,W/2-1.5*carta_x-esp_x,2*carta_y+3*esp_y));
    cartas.push(new Carta(carta_x,carta_y,(W-carta_x)/2,2*carta_y+3*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+carta_x/2+esp_x,2*carta_y+3*esp_y));
    //Cuarto nivel
    cartas.push(new Carta(carta_x,carta_y,W/2-2*carta_x-1.5*esp_x,3*carta_y+4*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2-carta_x-esp_x/2,3*carta_y+4*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+esp_x/2,3*carta_y+4*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+carta_x+1.5*esp_x,3*carta_y+4*esp_y));
    //Quinto nivel
    cartas.push(new Carta(carta_x,carta_y,W/2-1.5*carta_x-esp_x,4*carta_y+5*esp_y));
    cartas.push(new Carta(carta_x,carta_y,(W-carta_x)/2,4*carta_y+5*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+carta_x/2+esp_x,4*carta_y+5*esp_y));
    //Sexto nivel
    cartas.push(new Carta(carta_x,carta_y,(W-esp_x)/2-carta_x,5*carta_y+6*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+esp_x/2,5*carta_y+6*esp_y));
    //Septimo nivel
    cartas.push(new Carta(carta_x,carta_y,(W-carta_x)/2,6*carta_y+7*esp_y));
    //Saco mi primera carta que nunca tiene que ser una figura
    do
    {
      path.pop();
      var condicion=obtenerCarta(path);
      condicion=condicion-13*Math.floor(condicion/13);
    }while(condicion>9);
    //Coloco mi primera carta y empiezo en la carta 0
    cartas[0].setCarta(path[0]);
    carta=0;
    //Dibujo mi escalera
    for(var i=0,tamano=cartas.length;i<tamano;i++)   
      cartas[i].dibuja(contexto);  
  }
}
//Comprobar si se ha pinchado una de las
//Cuando cargo la pagina empiezo el juego
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
      console.log("la carta es: "+carta);
      if(comprobarClick(mousePos))
      {
        var condicion=obtenerCarta(path);
        condicion=condicion-13*Math.floor(condicion/13);
        cartas[carta].setCarta(path[path.length-1]);
        cartas[carta].dibuja(contexto);
        if(condicion>9)
        {
          alert('Bebes');
          iniciar(canvas,contexto);
        }else if(path.length==7){
          alert('has ganado');
          iniciar(canvas,contexto);
        }
      }else{
        console.log("no has pinchado dentro");
      }
    });
}