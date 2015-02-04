$("#formulario").validate({
    rules:
    {
        nombre: {
            required: true       
        },
        apellidos: {
            required: true
        },
        telefono: {
        	required: true,
			digits : true,
			minlength : 9
		},
		email: {
				required: true,
				email: true,
				minlength: 4,
				remote: "http://localhost/php/validar_email.php"
		},
		email2: {
				required: true,
				equalTo: email
		},
		conocer: {
                allow_single_deselect: true
        },
        usuario: {
                required: true,
                minlength : 4
        },
        password: {
                required: true,
                pass: true,
                remote: "php/validar_password.php"
        },
        password2: {
                required: true,
                equalTo: password
        },
        nifcif:{
                required: true,
                validanifcif: true
        },
        particularempresa:{
                required: true
        },        
        direccion: {
                required: true
        },
        cp: {
                required: true,
				digits : true,
				maxlength : 5,
                remote: "http://localhost/php/validar_zip_db.php"
        },
        provincia: {
                required: true
        },
        localidad: {
                required: true
        },
		iban: {             
            iban: true,
            required: true
        },
        pago: {             
            required: true
        }
    },   
    submitHandler : function() {
            if(parseInt($("#pago").val())==1){
                var alerta=confirm("¡Envíado! Va a darse de alta como usuario. Se le pasará un cobro de 50 € ¿Desea continuar?");
            }
            if(parseInt($("#pago").val())==2){
                var alerta=confirm("¡Envíado! Va a darse de alta como usuario. Se le pasará un cobro de 140 € ¿Desea continuar?");
            }
            if(parseInt($("#pago").val())==3){
                var alerta=confirm("¡Envíado! Va a darse de alta como usuario. Se le pasará un cobro de 550 € ¿Desea continuar?");                
            }    
            if(alerta==true){
                window.location.href = "bienvenida.html";
            }
    }                    
});


 $("#cp").change(function(){
            if($(this).val()!=""){
                var dato=$(this).val();
                $.ajax({
                    type:"POST",
                    dataType:"html",
                    url:"php/validar_cp.php",
                    data:"zip="+dato,
                    success:function(msg){
                        alert(msg);
                        $("#provinvia").val(msg);
                    }
                });
            }           
        });


$("#enviar").click(function(mievento){
    $.ajax({
        type: 'GET',
        "url": "http://localhost/php/validar_email.php",
        "dataType": "jsonp",
        jsonpCallback: 'logicaCliente'
    });                   
});
function logicaCliente(data){
console.log(data);
}


// Cambia automaticamente la provincia en funcion de los dos primeros digitos del codigo postal
$("#cp").change(function(evento) {
    $codigo=($("#cp").val()).substr(0, 2);
    $("#provincia").val($codigo);
});


// Si cambia el texto en nombre de particular dinamicamente con nombre y apellidos
$(document).ready(function(){
    $("#conocer").chosen({ 
        allow_single_deselect: true,
        no_results_text: "No existe resultado con "
    });
    //Cambia el modo chosen el select de forma pago
    $("#pago").chosen({
        allow_single_deselect: true,
        no_results_text: "No existe resultado con "
    });

    /*
     Funcion cony sus llamadas para cambiar el nombre si tiene activado el checked de empresa
     y lo completa automaticamente*/
    function actualizaNombreApellidos(){
        if ($("#demandanteparticular").is(':checked')) {
            $("#particularempresa").val($("#nombre").val()+" "+$("#apellidos").val());
        }
    }
    $(document).on("change, keyup", "#nombre", actualizaNombreApellidos);
    $(document).on("change, keyup", "#apellidos", actualizaNombreApellidos);
});


// Si el input:radio #demandanteparticular esta marcado: 
$("#demandanteparticular").change(function(evento) {
    if ($("#demandanteparticular").is(':checked')) {
        $("#textonifcif").text("NIF");    
        $("#nifcif").val("");        
        $("#textoparticularempresa").text("Nombre"); 
        $("#particularempresa").val($("#nombre").val()+" "+$("#apellidos").val()); 
    }
});
// Si el input:radio #demandanteparticular esta marcado: 
$("#demandanteempresa").change(function(evento) {
    if ($("#demandanteempresa").is(':checked')) {
        $("#textonifcif").text("CIF");    
        $("#nifcif").val("");                
        $("#textoparticularempresa").text("Empresa"); 
        $("#particularempresa").val(""); 
    }
});


// Pone un option value inicial en localidad
$("#localidad").html("<option value=''>Seleccione una localidad...</option>");

// Cambia dinamicamente al cambiar el valor de provincia
$("#cp").change(function() {
    // Cambia la opcion a Cargando mientras se prepara para buscar en php
    $("#localidad").html("<option value=''>Cargando...</option>");

    // Si no encontro localidad (es un error pero lo manejo), Vuelve a mostrar seleccione una localidad
    if ($(this).val() == "") {
        $("#localidad").html("<option value=''>Seleccione una localidad...</option>");
    }else{
        // Hace una peticion ajax usando el valor seleccionado (value) como parametro GET
        $.ajax({
            url: 'http://localhost/php/rellenar_municipios_db.php?cp='+$(this).val(),
            // Si todo va bien muestra la salida (previamente formateada en php) en localidad
            success: function(output) {
                $("#localidad").html(output);
            },
            // Si no va bien muestra el error
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " "+ thrownError);
            }});
        }
    });
});


// Si el Código Postal tiene menos de 4 dígitos, se agrega un 0 a la izquierda.
$("#cp").focusout(function() {
    var codigo = $("#cp").val();
    var longi=codigo.length;
    while(longi<5){
        codigo="0"+codigo;
        longi++;
    }
    $("#cp").val(codigo);    
});


/*El usuario debe tener al menos 4 caracteres, se rellenará de modo automático con su correo
 y no podrá ser modificado.*/
$("#usuario").focusout(function() {    
    if($("#email").val()!=""){
        $("#usuario").val($("#usuario").val()+$("#email").val());   
        $("#usuario").attr('disabled', true);    
    }else{
        $("#usuario").val("");        
    }
});


$.validator.addMethod("validaTarjeta", function(value, element) {
    $("#cuentabanco").val("");
    /*Aqui va el cambio de particular a empresa si procede*/
    return this.optional(element) ||  /^[0-9]+$/.test(value);
}, "Por favor eliga un tipo de tarjeta de credito.");
 	



            
