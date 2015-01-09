var x;
x=$(document);
x.ready(inicializarEventos);

function inicializarEventos()
{
	var x;
	x=$("#Volver");
	x.click(Volver);				//Si presiono el boton volver ejecuto Volver que pedira el index
	x=$("#Jugar");
	x.click(Jugar);					//Si presiono el boton jugar ejecuto Jugar que pedira la pagina del juego
}

function Volver()
{
	$.ajax({
    url: "/",
    type: "get",
    dataType: "json",
    data: {objectData: someObject},
    contentType: "application/json",
    cache: false,
    timeout: 5000,
    complete: function() {
      //called when complete
      console.log('process complete');
    },

    success: function(data) {
      console.log(data);
      console.log('process sucess');
   },

    error: function() {
      console.log('process error');
    },
  });
}

function Jugar()
{
	alert('Presionando Jugar');
	//$.get('/juego',#{juego});		//Pido el juego y le paso que juego quiero
}