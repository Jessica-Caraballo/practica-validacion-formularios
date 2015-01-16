/*

    	YA - Todos los campos con * son requeridos
    	YA - Comprobaremos que el usuario no exista previamente en la bbdd (NIF o email, el CIF no es necesario).
    	YA - Teléfono contendrá solo dígitos y un total de 9.
    	YA - CP tendrán que ser 5 digitos. Si son menos se completará con 0 a la izquierda.
    	YA - email debe ser un correo electrónico válido (al menos en apariencia)
    Por defecto estará marcado como demandante Particular y como Nombre (apartado Datos de facturación) la combinación de los campos Nombre y Apellidos de la información de contacto. Si el usuario selecciona como demandante Empresa, se borrará el contenido del campo “Nombre”, que pasará a llamarse “Empresa” para que el usuario lo rellene.
    Los campos CIF/NIF y Nombre/Empresa adecuarán su label en función del demandante seleccionado.
    Una vez insertado el código postal, se debe seleccionar la provincia y la localidad de forma automática. La localidad se rellenará con criterio libre.
    	YA - El código IBAN debe ser válido.
    El usuario debe tener al menos 4 caracteres, se rellenará de modo automático con el correo electrónico y no podrá ser modificado.
    La contraseña se debe forzar a que sea compleja.
    MITAD - Una vez pulsemos enviar en el formulario se mostrará un aviso al usuario de que se va a dar de alta y que se le pasará la primera cuota de 50€, 140€ o 550€ según corresponda (forma de pago). El usuario podrá cancelar la operación.

    */
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
				remote: "php/validar_email.php"
		},
		email2: {
				required: true,
				equalTo: email
		},
		conocer: {
                required: true
        },
        usuario: {
                required: true,
                minlength : 4
        },
        password: {
                required: true,
                remote: "php/validar_password.php"
        },
        direccion: {
                required: true
        },
        cp: {
                required: true,
				digits : true,
				minlength : 4,
				maxlength : 5
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
					alert("¡Envíado! Va a darse de alta como usuario. Se le pasará un cobro de ... ¿Desea continuar?");
				}
});

// Si el input:radio #demandanteparticular esta marcado: 
/*$("#demandanteparticular").change(function(evento) {
    if ($("#demandanteparticular").is(':checked')) {
        $("#lblcif > span").removeClass("important");
        $("#lblcif > span").text("");
        $("#cif").attr('disabled', true);
        $("#lblempresa > span").removeClass("important");
        $("#lblempresa > span").text("");
        $("#empresa").attr('disabled', true);

        $("#lblnif > span").addClass("important");
        $("#lblnif > span").text("*");
        $("#nif").removeAttr('disabled');
        $("#lblparticular > span").addClass("important");
        $("#lblparticular > span").text("*");
        $("#particular").removeAttr('disabled');        
    }
});*/

// Si el input:radio #demandanteempresa esta marcado: 
/*$("#demandanteempresa").change(function(evento) {
    if ($("#demandanteempresa").is(':checked')) {
        $("#lblnif > span").removeClass("important");
        $("#lblnif > span").text("");
        $("#nif").attr('disabled', true);
        $("#lblparticular > span").removeClass("important");
        $("#lblparticular > span").text("");
        $("#particular").attr('disabled', true);

        $("#lblcif > span").addClass("important");
        $("#lblcif > span").text("*");
        $("#cif").removeAttr('disabled');
        $("#lblempresa > span").addClass("important");
        $("#lblempresa > span").text("*");
        $("#empresa").removeAttr('disabled');
        
    }
});*/

// Si el Código Postal se compone de 4 dígitos, se agrega un 0 a la izquierda.
$("#cp").focusout(function() {
            var caracteres = $("#cp").val();
            if (caracteres.length == 4)
                {$("#cp").val("0" + caracteres);}
        });

 //Validación del Código Postal mediante Ajax
/*$("#cp").change(function(){
	if($(this).val()!=""){
        var dato=$(this).val();
        $.ajax({
            type:"POST",
            dataType:"html",
            url:"php/validar_zip_db.php",
            data:"cp="+dato,
            success:function(msg){
            	alert(msg);
                $("#provincia").val(msg);
            }
        });
    }			
});*/
 	



            
