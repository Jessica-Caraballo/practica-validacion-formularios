$("#formulario").validate({
    rules: {
        nombre: {
            required: true,
            minlength: 2
            },
        telefono: {
			digits : true,
			minlength : 9
		},
        }
     });
