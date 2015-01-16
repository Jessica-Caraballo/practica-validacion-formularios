$("#formulario").validate({
    rules:
    {
        nombre: {
            required: true
        },
        telefono: {
        	required: true,
			digits : true,
			minlength : 9
		},
		email: {
				required : true,
				email : true,
				minlength : 6,
				remote : "php/validar_email_db.php"
		},
		email2: {
				equalTo : email
		},
		iban: {             
            iban: true,
            required: true
        }
    }
});

// Si el input:radio #demandanteparticular esta marcado: 
$("#demandanteparticular").change(function(evento) {
    if ($("#demandanteparticular").is(':checked')) {
        $("#lblcif > span").removeClass("required");
        $("#lblcif > span").text("");
        $("#cif").attr('disabled', true);
        $("#lblempresa > span").removeClass("required");
        $("#lblempresa > span").text("");
        $("#empresa").attr('disabled', true);

        $("#lblnif > span").addClass("required");
        $("#lblnif > span").text("*");
        $("#nif").removeAttr('disabled');
        $("#lblparticular > span").addClass("required");
        $("#lblparticular > span").text("*");
        $("#particular").removeAttr('disabled');        
    }
});

// Si el input:radio #demandanteempresa esta marcado: 
$("#demandanteempresa").change(function(evento) {
    if ($("#demandanteempresa").is(':checked')) {
        $("#lblnif > span").removeClass("required");
        $("#lblnif > span").text("");
        $("#nif").attr('disabled', true);
        $("#lblparticular > span").removeClass("required");
        $("#lblparticular > span").text("");
        $("#particular").attr('disabled', true);

        $("#lblcif > span").addClass("required");
        $("#lblcif > span").text("*");
        $("#cif").removeAttr('disabled');
        $("#lblempresa > span").addClass("required");
        $("#lblempresa > span").text("*");
        $("#empresa").removeAttr('disabled');
        
    }
});




            
