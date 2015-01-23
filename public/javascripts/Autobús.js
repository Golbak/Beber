//Array de cartas
var cartas=[];

//Relaciones de posicion entre las cartas
var relaciones=[[2,3],[4,5],[5,6],[7,8],[8,9],[9,10],11,[11,12],[12,13],13,14,[14,15],15,16,16];

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
  if(numero = -1)
  {
    this.posicioncarta_x=12;
    this.posicioncarta_y=6;
  }else{
    this.pos_x=posicioncarta[numero]["x"];
    this.pos_y=posicioncarta[numero]["y"];
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

//Cuando cargo la pagina empiezo el juego
window.onload = function(){
  $("#micanvas").attr("width",250);
  $("#micanvas").attr("heigth",400);

  var W=$("#micanvas").attr("width");
  var H=$("#micanvas").attr("height");

  //Variables para hacer el tamaño escalable                             
  var esp_x=10;
  var esp_y=10;
  var carta_x=(W-5*esp_x)/4;
  var carta_y=(H-8*esp_y)/7;

  console.log(W);
  console.log(H);

  //Obtengo mediante mi id el Canvas
  var canvas = document.getElementById('micanvas');
  //Obtengo contexto mediante mi canvas
  var contexto = canvas.getContext('2d');

  cartas = [];
  if(canvas && contexto)
  {
    cartas.push(new Carta(carta_x,carta_y,(W-carta_x)/2,esp_y));

    cartas.push(new Carta(carta_x,carta_y,(W-esp_x)/2-carta_x,carta_y+2*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+esp_x/2,carta_y+2*esp_y));
    
    cartas.push(new Carta(carta_x,carta_y,W/2-1.5*carta_x-esp_x,2*carta_y+3*esp_y));
    cartas.push(new Carta(carta_x,carta_y,(W-carta_x)/2,2*carta_y+3*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+carta_x/2+esp_x,2*carta_y+3*esp_y));

    cartas.push(new Carta(carta_x,carta_y,W/2-2*carta_x-1.5*esp_x,3*carta_y+4*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2-carta_x-esp_x/2,3*carta_y+4*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+esp_x/2,3*carta_y+4*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+carta_x+1.5*esp_x,3*carta_y+4*esp_y));

    cartas.push(new Carta(carta_x,carta_y,W/2-1.5*carta_x-esp_x,4*carta_y+5*esp_y));
    cartas.push(new Carta(carta_x,carta_y,(W-carta_x)/2,4*carta_y+5*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+carta_x/2+esp_x,4*carta_y+5*esp_y));

    cartas.push(new Carta(carta_x,carta_y,(W-esp_x)/2-carta_x,5*carta_y+6*esp_y));
    cartas.push(new Carta(carta_x,carta_y,W/2+esp_x/2,5*carta_y+6*esp_y));

    cartas.push(new Carta(carta_x,carta_y,(W-carta_x)/2,6*carta_y+7*esp_y));

  }
      
   for(var i=0,tamano=cartas.length;i<tamano;i++)   
      cartas[i].dibuja(contexto);  
}