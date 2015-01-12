var carta=[];                                                                 //Mi variable para guardar las cartas
var esp_x=10;
var esp_y=10;
var W=253;
var H=418;

window.onload = function(){
    //Recibimos el elemento canvas
    var elemento = document.getElementById('micanvas');
    //Añadimos un addEventListener al canvas, para reconocer el click
    elemento.addEventListener("click", function(evt){
      var contexto = elemento.getContext('2d');    
      if(contexto)
      {
        var img = new Image();
        var contexto = elemento.getContext('2d');
        img.src = "/images/carta1.jpg";
        contexto.drawImage(img, 0, 0);     
      }
    }, false);
   //Comprobación sobre si encontramos un elemento
   //y podemos extraer su contexto con getContext(), que indica compatibilidad con canvas
   if (elemento && elemento.getContext) {
      //Accedo al contexto de '2d' de este canvas, necesario para dibujar
      var contexto = elemento.getContext('2d');
      if (contexto) {
        var img1 = new Image();
        var img2 = new Image();
        var numero=parseInt(Math.random()*2+1);
        img1.src = String('/images/carta'+numero+'.jpg');
        contexto.drawImage(img1, esp_x, esp_y, W, H); 
        img2.src = '/images/cartavacia.jpg';
        contexto.drawImage(img2, W+2*esp_x, H/2+esp_y, W/2, H/2); 
      }
   }
}

function click(event){  
  
}