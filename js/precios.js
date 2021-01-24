function cargarElementos(){

    // Recuperamos mediante AJAX los datos del fichero JSON con la información de los elementos
    $.ajax({
        method: "GET",
        dataType : 'json',
        url: "/js/elementos.json"
        })
        .done(function( datos ) {
            // Una vez que tenemos en la variable datos la información del JSON
            // llamamos a la función que los mostrará en pantalla
            mostrarElementos(datos);
        });
}

function mostrarElementos(elementos){
    listadoElementos = elementos;

    // Comprobamos si la lista está vacía o ya tiene algún elemento
    if (JSON.parse(localStorage.getItem('lista'))){
        elementosLista = JSON.parse(localStorage.getItem('lista'));
    }else{
        elementosLista = [];
    }

    // Recorremos la lista de elementos para mostrarlos uno a uno por pantalla
    listadoElementos.forEach(function(elemento){
        var cadena= "<tr>";
                cadena += "<td id='bordes'>" + elemento.titulo + ", " + elemento.especificacion + " " + elemento.precio + " euros.</td>";
                cadena += "<td id='bordes'><button class='botonAnadir' data-elemento='" + elemento.titulo + "'><span>Añadir</span></button></td>";
            cadena += "</tr>";

        $('#listado-precios').append(cadena);
    });

    // Una vez los elementos están en pantalla, asociamos al botón de añadir la acción a realizar
    $('.botonAnadir').on('click', function(){
        // Identificamos sobre qué elemento hemos pulstado
        var elementoPulsado = $(this).data('elemento');

        // A partir del título del elemento, recuperamos el objeto elemento con toda la información
        console.log("Has pulsado sobre " + elementoPulsado);
        alert("Se ha añadido el elemento a la lista de deseos en Resumen.");
        objetoElemento = $.grep(listadoElementos, function(elemento){
            return elemento.titulo === elementoPulsado;
        });

        // Añadimos al array elementosLista el objeto elemento sobre el que hemos pulsado
        elementosLista.push(objetoElemento[0]);

        // Guardamos en el localStorage el array con los elementos seleccionados
        localStorage.setItem('lista', JSON.stringify(elementosLista));
    });
}

//Creamos la variable y la igualamos a 0, para cuando refresquemos la página
var contador = 0;

function mostrarLista(){
    //Creamos la variable precioFinal para calcular el total
    var precioFinal = 0;

    // Recuperamos del localStorage el array con la lista de elementos seleccionados
    if (JSON.parse(localStorage.getItem('lista'))){
        elementosLista = JSON.parse(localStorage.getItem('lista'));
    }else{
        elementosLista = [];
    }

    // Recorremos el array y los mostramos por pantalla, cambiando el boton de añadir por el de eliminar
    elementosLista.forEach(function(elemento){

        //Calculamos el total sumando el precio al total actual
        precioFinal += elemento.precio;

        var cadena= "<tr>";
                cadena += "<td id='bordes'>" + elemento.titulo + ", " + elemento.especificacion + " " + elemento.precio + " euros.</td>";
            cadena += "</tr>";

        $('#lista-final').append(cadena);
    });

    //Cuando el contador sea 0 no se habrá refrescado la página, por lo que se mostrará
    //Si es 1, estaremos refrescando la página para volver a mostrar la lista
    if(contador === 0){
        if (precioFinal === 0){
            //Si el precio es 0 significará que el localStorage está vacío, por lo que mostrará que no se ha seleccionado nada
            //De lo contrario mostrará el precio
            $('#precioFinal').append("<h3>No ha seleccionado ningun servicio.</h3>");
        }else{
            $('#precioFinal').append("<button class='botonEliminar'><span>Eliminar</span></button>");
            $('#precioFinal').append("<h3>Podría tener estos servicios a partir de " + precioFinal + " €.</h3>");
        }

        contador = 1;
    }else{
        contador = 0;
    }

    // Una vez los elementos están en pantalla, asociamos al botón de eliminar la acción a realizar
    $('.botonEliminar').on('click', function(){
        //Si confirma, se elimina el contenido del localStorage
        if (confirm('¿Quiere eliminar la lista?'))
        localStorage.removeItem('lista');

        //Refrescamos la página dependiendo del contador y mostramos de nuevo para que no salgan los servicios añadidos anteriormente
        location.reload();
        mostrarLista();
    });
}
