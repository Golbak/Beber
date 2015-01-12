

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
        var img = new Image();
        img.src = "/images/carta.jpg";
        contexto.drawImage(img, 0, 0); 
      }
   }
}

function click(event){  
  
}