$(function(){
    //Add href and disable some fields
    $('form').attr('action','https://docs.google.com/forms/d/19EuPG4RaFQyDledhbTa7zx4jDEiUpsZuWrhgJV-LKGk/formResponse');
});


function Valida(formulario){
	if ($("#entry_1016167564").val().length==0) {
        alert("Introduzca el título del lugar.");
        return false;
	} else if ($("#entry_1350527290").val().length==0) {
	    alert("Introduzca la latitud del lugar.");
	    return false;
	} else if ($("#entry_1394268219").val().length==0) {
	    alert("Introduzca la longitud del lugar.");
	    return false;
    } else if ($("#entry_145325308").val().length==0) {
        alert("Introduzca la descripción breve del lugar.");
        return false;
    } else if ($("#entry_145325308").val().length>800) {
        alert("El número máximo de caracteres para la descripción breve es de 800. Puedes utilizar la descripción completa para escribir más.");
        return false;
    } else if (!($("#group_727857438_1").attr("checked") || $("#group_727857438_2").attr("checked") || $("#group_727857438_3").attr("checked") || $("#group_727857438_4").attr("checked"))) {
        alert("Indique el tipo de valor");
        return false;
    } else {
        return true;
    }
}
