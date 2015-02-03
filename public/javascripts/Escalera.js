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
const margen=0.04;

//Constantes para seguir la progresion
const relaciones=[[1,2],[3,4],[4,5],[6,7],[7,8],[8,9],[10],[10,11],[11,12],[12],[13],[13,14],[14],[15],[15]];

//Constantes para el mazo
const numcartasmazo=52;
const numerocartas=8;
const numbotones=3;

//Variable global para la imagen de la carta y los botones
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
  var sacarCarta = function()
  {
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
  }

  var copiar = function(nuevascartas)
  {
    cartas=nuevascartas;
  }

  return {
    numcartas: numcartas,
    cartasRestantes: cartasRestantes,
    cartasSacadas: cartasSacadas,
    reiniciar: reiniciar,
    sacarCarta: sacarCarta,
    copiar: copiar
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

  var getCarta = function()
  {
    return micarta;
  }

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
      miestado=1;
    }else{
      miposicioncarta["x"]=posicioncarta[numero]["x"];
      miposicioncarta["y"]=posicioncarta[numero]["y"];
      miestado=0;
    }
    micarta=numero;
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
      getCarta: getCarta,
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
  var getCarta = function(indice)
  {
    if(cartas[indice])
      return cartas[indice].getCarta();
    return -1;
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
    getCarta: getCarta,
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

//Mi clase boton
function Boton(posicion_x,posicion_y,valor)
{
  var mipos = {"x":posicion_x,"y":posicion_y};
  var mitamano = {"x":0,"y":0};
  var mivalor = valor;
  var imagen;

  var setTamano = function(tamano)
  {
    mitamano["x"]=tamano["x"];
    mitamano["y"]=tamano["y"];
  }

  var setPosicion = function(posicion)
  {
    mipos["x"]=posicion["x"];
    mipos["y"]=posicion["y"];
  }
  
  var setImagen = function(src,callback)
  {
    imagen = new Image();
    imagen.onload=callback;
    imagen.src=src;
  }

  var dibuja = function(contexto)
  {
    if(contexto)
    {
        contexto.drawImage(imagen , mipos["x"], mipos["y"], mitamano["x"], mitamano["y"]);
    }
  }

  var dentro = function(pos)
  {
    if(pos["x"]>=mipos["x"] && pos["y"]>=mipos["y"] && pos["x"]<=(mipos["x"]+mitamano["x"]) && pos["y"]<=(mipos["y"]+mitamano["y"]))
        return true;
    return false;
  }

  return{
    valor: mivalor,
    setTamano: setTamano,
    setPosicion: setPosicion,
    setImagen: setImagen,
    dibuja: dibuja,
    dentro: dentro
  }
}

//Mi clase lista botones
function lista_Botones()
{
  var misbotones=[];

  var inicia = function(numerobotones){
    misbotones=[];
    for(var i=0;i<numerobotones;i++)
      misbotones.push(new Boton(0,0,undefined));
  }

  var setValor = function(valores)
  {
    if(valores.length==misbotones.length)
    {
      for(var i=0,tamano=misbotones.length;i<tamano;i++)
        misbotones[i].valor=valores[i];
    }
  }

  var setTamano = function(tamboton)
  {
    for(var i=0,tamano=misbotones.length;i<tamano;i++)
      misbotones[i].setTamano(tamboton);
  }

  var setPosicion = function(posiciones)
  {
    if(posiciones.length==misbotones.length)
    {
      for(var i=0,tamano=misbotones.length;i<tamano;i++)
        misbotones[i].setPosicion(posiciones[i]);
    }
  }

  var setImagen = function(imagenes,callback)
  {
    var variable=imagenes;
    if(variable.length>1)
    {
      misbotones[variable.length-1].setImagen(variable.pop(),function(){setImagen(variable,callback);});
    }else{
      misbotones[variable.length-1].setImagen(variable.pop(),callback);
    }  
  }

  var dibuja = function(contexto)
  {
    for(var i=0,tamano=misbotones.length;i<tamano;i++)
      misbotones[i].dibuja(contexto);
  }

  var dentro = function(pos)
  {
    for(var i=0,tamano=misbotones.length;i<tamano;i++)
    {
      if(misbotones[i].dentro(pos))
        return {
                boolean: true,
                valor: misbotones[i].valor
              }
    }
    return {
            boolean: false
          }
  }
  return{
    inicia: inicia,
    setValor: setValor,
    setTamano: setTamano,
    setPosicion: setPosicion,
    setImagen: setImagen,
    dentro: dentro,
    dibuja: dibuja,
  }
}

//Mi clase croupier
function croupier(canvas,contexto)
{
  var miMazo = new Mazo(numcartasmazo);
  var miLista_Cartas = new lista_Cartas();
  var miLista_Botones = new lista_Botones();
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
    miLista_Cartas.dibuja(micontexto);
    miLista_Botones.dibuja(micontexto);
  }
  function cargarImagen (src,callback)
  {
    imgc = new Image();
    imgc.onload = callback;
    imgc.src = src;
  }

  var inicia = function()
  {
    miLista_Botones.inicia(numbotones);
    var img_botones=['/images/Mayor.jpg','/images/Igual.jpg','/images/Menor.jpg'];
    miLista_Botones.setValor(['Mayor','Igual','Menor']);
    cargarImagen('/images/baraja.jpg',function(){miLista_Botones.setImagen(img_botones,
      function(){
        estado=0;
        miMazo.reiniciar();
        miLista_Cartas.inicia(numerocartas);
        //Aqui mi condigo para redimensionar mi Canvas
        resize(micanvas);
        miLista_Cartas.destapar(miMazo.sacarCarta(),estado,micontexto);
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
      });});
  }

  //Funcion que sirve para cambiar los tamaños de las cartas
  var resize = function(canvas)
  {
    micanvas.width = window.innerWidth;
    micanvas.height = window.innerHeight;
    
    var width=micanvas.width;
    var height=micanvas.height;

    var margenes={"izquierdo":margen*width,"superior":margen*height}
    var esp_x=0.02*width;
    var esp_y=0.02*height;
    
    var tamano_carta={        "x":(width-2*margenes["izquierdo"]-9*esp_x)/8,
                              "y":(height-2*margenes["superior"]-4*esp_y)*8/17};
    var tamanos_botones={     "x":(width-2*margenes["izquierdo"]-8*esp_x)/3,
                              "y":tamano_carta["y"]/8};
    var posiciones_cartas=[];
    var posiciones_botones=[];

    var y1=margenes["superior"]+esp_y,y2=margenes["superior"]+tamano_carta["y"]+2*esp_y;
    for(var i=0;i<numerocartas;i++)
    {
      if(i>2 && i<6)
      {
        posiciones_cartas.push({"x":margenes["izquierdo"]+i*tamano_carta["x"]+(i+1)*esp_x,"y":y1});
      }else{
        posiciones_cartas.push({"x":margenes["izquierdo"]+i*tamano_carta["x"]+(i+1)*esp_x,"y":y2});
      }
    }

    var y=height-tamanos_botones["y"]-esp_y;

    for(var i=0;i<numbotones;i++)
    {
      posiciones_botones.push({"x":margenes["izquierdo"]+(2*(i+1))*esp_x+i*tamanos_botones["x"],"y":y});
    }

    miLista_Cartas.setTamano(tamano_carta);
    miLista_Botones.setTamano(tamanos_botones);
    miLista_Cartas.setPosicion(posiciones_cartas);
    miLista_Botones.setPosicion(posiciones_botones);

    dibuja();
  }

  var Beber = function(flag)
  {
    if(flag)
    {
      alert('no bebes');
      if(estado==5 || estado==2)
      {
        alert('Bebes');
      }
      estado++;
    }else{
      alert('bebes');
      miLista_Cartas.destapar(-1,estado+1,micontexto);
      if(estado>0)
      {
        miLista_Cartas.destapar(-1,estado,micontexto);
        estado--;
      }
      if(estado==5 || estado==2){
        alert('Bebes');
      }
    }
  }

  //Mi funcion que dicta que se hace cuando existe un click
  var click = function(pos)
  {
    var click = miLista_Botones.dentro(pos);
    if(click.boolean)
    {
      var nuevacarta = miMazo.sacarCarta();
      var anteriorcarta = miLista_Cartas.getCarta(estado);

      miLista_Cartas.destapar(nuevacarta,estado+1,micontexto);
      dibuja();
      nuevacarta=nuevacarta-13*Math.floor(nuevacarta/13); 
      anteriorcarta=anteriorcarta-13*Math.floor(anteriorcarta/13);
      switch(click.valor){
        case 'Mayor':                                                                           //Si me han dado mayor   
          Beber(nuevacarta>anteriorcarta);                                                               //Mi condicion sera que la ultima que he sacado sea mayor que la anterior
          break;
        case 'Igual':                                                                           //Si me han dado igual
          Beber(nuevacarta==anteriorcarta);                                                              //Mi condicion sera que la ultima sea igual que la anterior
          break;
        case 'Menor':                                                                           //Si me han dado menor
          Beber(nuevacarta<anteriorcarta);                                                               //Mi condicion sera que la ultima sea menor que la anterior
          break;
      }

      dibuja();      
      if(estado>6)
      {
        alert("Has terminado el juego");
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