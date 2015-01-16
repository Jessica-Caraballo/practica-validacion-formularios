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

		                 cuentabanco: {
                        minlength: 20,
                        maxlength: 20,
                        required: function() {
                            return $("#tipopagocuenta").is(':checked');
                        },
                        validacuentabanco: function() {
                            return $("#tipopagocuenta").is(':checked');
                        }
                    },
                    tarjetacredito: {
                        required: function() {
                            return $("#tipopagotarjeta").is(':checked');
                        },
                        creditcardtypes: function() {
                            return $("#tipotarjeta").val();
                        }
                    },
    }
});

            // Si el input:radio #tipopagocuenta esta marcado: 
            $("#tipopagocuenta").change(function(evento) {
                if ($("#tipopagocuenta").is(':checked')) {
                    $("#id_spin_03 > span").removeClass("required");
                    $("#id_spin_03 > span").text("");
                    $("#lblcuentabanco > span").addClass("required");
                    $("#lblcuentabanco > span").text("*");
                    $("#cuentabanco").removeAttr('disabled');
                    $("#tipotarjeta").attr('disabled', true);
                    $("#tarjetacredito").attr('disabled', true);
                }
            });

            // Si el input:radio #tipopagotarjeta esta marcado: 
            $("#tipopagotarjeta").change(function(evento) {
                if ($("#tipopagotarjeta").is(':checked')) {
                    $("#lblcuentabanco > span").removeClass("required");
                    $("#lblcuentabanco > span").text("");
                    $("#lbltarjeta > span").addClass("required");
                    $("#id_spin_03 > span").text("*");
                    $("#tipotarjeta").removeAttr('disabled');
                    $("#tarjetacredito").removeAttr('disabled');
                    $("#cuentabanco").attr('disabled', true);
                }
            });




            
