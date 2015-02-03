//Constantes para encontrar la foto de la carta en la baraja
const sx=75;
const sy=60;
const sW=146;
const sH=196;
const posicioncarta=[{"x":0,"y":0},{"x":1,"y":0},{"x":0,"y":1},{"x":1,"y":1},{"x":0,"y":2},{"x":1,"y":2},{"x":0,"y":3},{"x":1,"y":3},{"x":0,"y":4},{"x":1,"y":4},{"x":9,"y":4},{"x":8,"y":5},{"x":9,"y":5},
                  {"x":2,"y":0},{"x":3,"y":0},{"x":2,"y":1},{"x":3,"y":1},{"x":2,"y":2},{"x":3,"y":2},{"x":2,"y":3},{"x":3,"y":3},{"x":2,"y":4},{"x":3,"y":4},{"x":9,"y":1},{"x":8,"y":2},{"x":9,"y":2},
                  {"x":4,"y":0},{"x":5,"y":0},{"x":4,"y":1},{"x":5,"y":1},{"x":4,"y":2},{"x":5,"y":2},{"x":4,"y":3},{"x":5,"y":3},{"x":4,"y":4},{"x":5,"y":4},{"x":8,"y":0},{"x":9,"y":0},{"x":8,"y":1},
                  {"x":6,"y":0},{"x":7,"y":0},{"x":6,"y":1},{"x":7,"y":1},{"x":6,"y":2},{"x":7,"y":2},{"x":6,"y":3},{"x":7,"y":3},{"x":6,"y":4},{"x":7,"y":4},{"x":8,"y":3},{"x":9,"y":3},{"x":8,"y":4}];

//Constantes para seguir la progresion
const relaciones=[[1,2],[3,4],[4,5],[6,7],[7,8],[8,9],[10],[10,11],[11,12],[12],[13],[13,14],[14],[15],[15]];

//Constantes para el mazo
const numcartasmazo=52;
const numerocartas=16;

//Variable global para la imagen de la carta
var imgc;

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
  var cartasSacadas = function()
  {
    return cartas.length;
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
    cartasSacadas: cartasSacadas,
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
    if(estado)
    {
      var aux=carta-13*Math.floor(carta/13);
      var aux2=micarta-13*Math.floor(micarta/13);
      if(aux==aux2)
        return true;
    }
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

  var inicia = function(numcartas)
  {
    cartas=[];
    for(var i=0;i<numcartas;i++)
      cartas.push(new Carta(0,0));
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
  var estado;

  //Funcion para obtener la posicion del raton
  function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();                                                      //Obtengo coordenadas de mi canvas
      return {"x": evt.clientX - rect.left,                                                               //Obtengo coordenadas de mi evento
            "y": evt.clientY - rect.top}                                                                //La resta sera donde esta mi cursor en coordenadas absolutas
  }
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
      estado=0;
      miMazo.reiniciar();
      milista_Cartas.inicia(numerocartas);
      milista_Cartas.destapar(miMazo.sacarCarta(),0,micontexto);
      //Aqui mi condigo para redimensionar mi Canvas
      resize(micanvas);
      //Añadimos evento de resize
        window.addEventListener("resize", function (evt){  
          micanvas.width= window.innerWidth;
          micanvas.height= window.innerHeight;
          resize(micanvas);
        },false);
        //Añadimos un addEventListener al canvas, para reconocer el click
        micanvas.addEventListener("click", function (evt){  
          //Obtengo la posicion del ratón
          click(getMousePos(micanvas, evt));
        }, false);  
      });
  }

  //Funcion que sirve para cambiar los tamaños de las cartas
  var resize = function(canvas)
  {
    micanvas.width = window.innerWidth;
    micanvas.height = window.innerHeight;
    
    var width=micanvas.width;
    var esp_x=0.01*width;
    var esp_y=esp_x;
    var tamanos={"x":(width-5*esp_x)/4,"y":(micanvas.height-8*esp_y)/7};
    var posiciones=[];
    
    //Primer nivel
      posiciones.push({"x":(width-tamanos["x"])/2,        "y":esp_y});
      //Segundo nivel
      posiciones.push({"x":(width-esp_x)/2-tamanos["x"],      "y":tamanos["y"]+2*esp_y});
      posiciones.push({"x":width/2+esp_x/2,           "y":tamanos["y"]+2*esp_y});
      //Tercer nivel
      posiciones.push({"x":width/2-1.5*tamanos["x"]-esp_x,    "y":2*tamanos["y"]+3*esp_y});
      posiciones.push({"x":(width-tamanos["x"])/2,        "y":2*tamanos["y"]+3*esp_y});
      posiciones.push({"x":width/2+tamanos["x"]/2+esp_x,      "y":2*tamanos["y"]+3*esp_y});
      //Cuarto nivel
      posiciones.push({"x":width/2-2*tamanos["x"]-1.5*esp_x,    "y":3*tamanos["y"]+4*esp_y});
      posiciones.push({"x":width/2-tamanos["x"]-esp_x/2,      "y":3*tamanos["y"]+4*esp_y});
      posiciones.push({"x":width/2+esp_x/2,           "y":3*tamanos["y"]+4*esp_y});
      posiciones.push({"x":width/2+tamanos["x"]+1.5*esp_x,    "y":3*tamanos["y"]+4*esp_y});
      //Quinto nivel
      posiciones.push({"x":width/2-1.5*tamanos["x"]-esp_x,    "y":4*tamanos["y"]+5*esp_y});
      posiciones.push({"x":(width-tamanos["x"])/2,        "y":4*tamanos["y"]+5*esp_y});
      posiciones.push({"x":width/2+tamanos["x"]/2+esp_x,      "y":4*tamanos["y"]+5*esp_y});
      //Sexto nivel
      posiciones.push({"x":(width-esp_x)/2-tamanos["x"],      "y":5*tamanos["y"]+6*esp_y});
      posiciones.push({"x":width/2+esp_x/2,           "y":5*tamanos["y"]+6*esp_y});
      //Septimo nivel
      posiciones.push({"x":(width-tamanos["x"])/2,        "y":6*tamanos["y"]+7*esp_y});

      milista_Cartas.setTamano(tamanos);
      milista_Cartas.setPosicion(posiciones);
      dibuja();
  }
  //Mi funcion que comprueba si la que se ha pinchado es correcto
  var comprobar = function(estado,carta)
  {
    for(var i=0,tamano=relaciones[estado].length;i<tamano;i++)
    {
      if(carta==relaciones[estado][i])
        return true;
    }
    return false;
  }
  //Mi funcion que dicta que se hace cuando existe un click
  var click = function(pos)
  {
    var click = milista_Cartas.dentro(pos);
    if(click.boolean && comprobar(estado,click.i))
    {
      estado=click.i;
      var carta=miMazo.sacarCarta();
      milista_Cartas.destapar(carta,click.i,micontexto);
      carta=carta-13*Math.floor(carta/13);
      if(carta>9)
          {
            alert('Bebes');
            inicia();
          }else if(estado==(numerocartas-1)){
            alert('has ganado');
            inicia();
          }
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