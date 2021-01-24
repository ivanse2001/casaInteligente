//BOTÓN "VOLVER ARRIBA"
//Se ejecuta mostrando un boton de volver arriba cuando
//el usuario se desplace 100px hacia abajo
$(document).ready(function(){ 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});

//MENÚ ADAPTABLE
$(document).ready(function(){
    var contador = 1;

	//Ejecuta la acción cuando se clicka en el menú
	$('.menu_bar').click(function(){
		//Cuando contador sea igual a 1 se mostrará
		if(contador == 1){
			$('nav').animate({
				left: '0'
			});
			//Devolvemos la variable a 0 para que cuando se vuelva a clickar se oculte
			contador = 0;
		} else {
			contador = 1;
			$('nav').animate({
				left: '-100%'
			});
		}
 
	});
 
});