$(document).ready(function () {
    console.log("DOM Cargado");
  
    $("#eliminar").click(function () {
      if (confirm("¿Eliminar los comentarios?")) $("#comentarios").empty();
      return false;
    });
  
    $("#anadir").click(function () {
      if ($("#comentario").val().toLowerCase() == "fin") {
        $("form").fadeOut(500);
      } else {
        var $item = $("<li id='borrar'></li>");
        $item.html($("#comentario").val());
  
        // Agregar al inicio de la lista:
        $("#comentarios").prepend($item);
        
        // Agregar al final de la lista:
        
        $("#comentario").val("").select();
      }
  
      return false;
    });
  
    $(document).on("click", "#borrar", function () {
      if (confirm('Eliminar el comentario "' + $(this).text() + '"?'))
        $(this).remove();
    });
});