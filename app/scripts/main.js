/*  Todos los campos con * son requeridos   */
$("#formulario").validate({
    rules:
    {
        nombre: 
        {
            required: true,
            minlength:2       
        },
        apellidos: 
        {
            required: true,
            minlength:2
        },
        telefono: 
        {
        	required: true,
            // Contiene solo dígitos 
			digits : true,
            // Solo 9 digitos
			minlength : 9
		},
		email: 
        {
			required: true,
            //      Email debe ser un correo electrónico válido en apariencia
			email: true,
			minlength: 4,
            //      Comprueba que el usuario no exista previamente en la bbdd (a través del email)
			remote: "php/validar_email.php"
		},
		email2: 
        {
			equalTo: "#email"
		},
		conocer: 
        {
            allow_single_deselect: true
        },
        usuario: 
        {
            required: true,
            minlength : 4
        },
        pswd: 
        {
            required: true,
            pass: true
        },
        pswd2: 
        {
            required: true,
            equalTo: "#pswd"
        },   
        particularempresa:
        {
            required: true
        },     
        nifcif:
        {
            required: true,
            validanifcif: true
        },                
        direccion: 
        {
            required: true
        },
        cp: 
        {
            required: true,
			digits : true,
            // Contiene 5 digitos
			maxlength : 5,
            remote: "php/validar_cp.php"
        },
        localidad: 
        {
            required: true
        },
        provincia: 
        {
            required: true
        },        
		iban: 
        {             
            iban: true,
            required: true
        },
        pago: 
        {             
            required: true
        }
    },   
    /*      Al pulsar enviar, se muestra un aviso al usuario de que se va a dar de alta y que se le pasará la primera cuota
    * de 50€, 140€ o 550€ según corresponda (forma de pago). 
    * El usuario podrá cancelar la operación.    */
    submitHandler : function() 
    {
            if(parseInt($("#pago").val())==1)
            {
                var alerta=confirm("¡Envíado! Va a darse de alta como usuario. Se le pasará un cobro de 50 € ¿Desea continuar?");
            }
            if(parseInt($("#pago").val())==2)
            {
                var alerta=confirm("¡Envíado! Va a darse de alta como usuario. Se le pasará un cobro de 140 € ¿Desea continuar?");
            }
            if(parseInt($("#pago").val())==3)
            {
                var alerta=confirm("¡Envíado! Va a darse de alta como usuario. Se le pasará un cobro de 550 € ¿Desea continuar?");                
            }    
            if(alerta==true)
            {
                window.location.href = "inicio.html";
            }
    }                    
});



// Valida el CIF o NIF en funcion de que este marcado en el radio button
$.validator.addMethod("validanifcif", function(value, element) 
{
    // Cambia el valor a mayusculas para ahorrar comparaciones
    value = value.toUpperCase();
    // Si esta checkeado Particular
    if ($("#demandanteparticular").is(':checked')) 
    {
        // Evalua DNI doble nacionalidad
        if ( !value.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)") ) 
        {
            return false;
        }
        // Evalua DNI nacional
        if ( /^[0-9]{8}[A-Z]{1}$/.test( value ) ) 
        {
            return ( "TRWAGMYFPDXBNJZSQVHLCKE".charAt( value.substring( 8, 0 ) % 23 ) === value.charAt( 8 ) );
        }
        // Evalua DNI especial con letras K L M
        if ( /^[KLM]{1}/.test( value ) ) 
        {
            return ( value[ 8 ] === String.fromCharCode( 64 ) );
        }
    // Si esta checkeado Empresa        
    }else{
        // Convierte a mayusculas 
        value = value.toUpperCase();
        $num = [];
          
        // Evalua CIF tradicional
        if ( !value.match( '((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)' ) ) 
        {
            return false;
        }
        
        // Descompone el CIF  
        for ( $i = 0; $i < 9; $i++ ) {
            $num[ $i ] = parseInt( value.charAt( $i ), 10 );
        }
          
         // Algoritmo para comprobar si es correcto
        $sum = $num[ 2 ] + $num[ 4 ] + $num[ 6 ];
        for ( $count = 1; $count < 8; $count += 2 ) {
            $tmp = ( 2 * $num[ $count ] ).toString(),
            $digito2cp = $tmp.charAt( 1 );
            $sum += parseInt( $tmp.charAt( 0 ), 10 ) + ( $digito2cp === '' ? 0 : parseInt( $digito2cp, 10 ) );
        }
          
        // Comprueba CIF
        if ( /^[ABCDEFGHJNPQRSUVW]{1}/.test( value ) ) {
            $sum += '';
            $digitoControlCIF = 10 - parseInt( $sum.charAt( $sum.length - 1 ), 10 );
            value += $digitoControlCIF;
            return ( $num[ 8 ].toString() === String.fromCharCode( 64 + $digitoControlCIF ) || $num[ 8 ].toString() === value.charAt( value.length - 1 ) );
         }
    }
    return false;   
}, "Su identificación no es correcta."); 



/*      Al insertar el CP, se seleccionar la provincia de forma automática por medio de los dos primero digitos del CP. 
* La localidad se rellenará con criterio libre.*/
$("#cp").focusout(function(evento) {
    $codigo=($("#cp").val()).substr(0, 2);
    $("#provincia").val($codigo);
});



/*      Nombre e facturacion, es la combinación de los campos Nombre y Apellidos de la información de contacto. 
* Si el usuario selecciona como demandante Empresa, se borra el contenido del campo “Nombre”, 
* y el campo pasará a llamarse “Empresa” para que el usuario lo rellene.*/
$(document).ready(function()
{
    // Convierte en modo chosen el select de como nos conocio
    $("#conocer").chosen({ 
        allow_single_deselect: true,
        no_results_text: "No existe resultado con "
    });
    // Convierte en modo chosen el select de forma pago
    $("#pago").chosen({
        allow_single_deselect: true,
        no_results_text: "No existe resultado con "
    });

    /* Funcion y sus llamadas para cambiar dinamicamente el nombre en caso de tener
        activado el checked de empresa. Lo rellena automaticamente*/
     function actualizaNombreApellidos(){
        if ($("#demandanteparticular").is(':checked')) {
            $("#particularempresa").val($("#nombre").val()+" "+$("#apellidos").val());
        }
    }
    $(document).on("change, keyup", "#nombre", actualizaNombreApellidos);
    $(document).on("change, keyup", "#apellidos", actualizaNombreApellidos);


// Cambia localidad segun CP
    // Pone un option value inicial en localidad
    $("#localidad").html("<option value=''>Por favor, seleccione una localidad:</option>");

    // Cambia dinamicamente al cambiar el valor de provincia
    $("#cp").change(function() 
    {
        // Cambia la opcion a Cargando mientras se prepara para buscar en php
        $("#localidad").html("<option value=''>Cargando su localidad...</option>");

        // Si no encontro localidad (es un error pero lo manejo), Vuelve a mostrar seleccione una localidad
        if ($(this).val() == "") 
        {
            $("#localidad").html("<option value=''>Por favor, seleccione una localidad:</option>");
        }else{
            // Hace una peticion ajax usando el valor seleccionado (value) como parametro GET
            $.ajax({                
                url: 'php/completar_localidad.php?cp='+$(this).val(),
                // Si todo va bien muestra la salida (previamente formateada en php) en localidad
                success: function(output) 
                {
                    $("#localidad").html(output);
                },
                // Si no va bien muestra el error
                error: function (xhr, ajaxOptions, thrownError) 
                {
                    alert(xhr.status + " "+ thrownError);
                }});
            }
        });
});



/*      Los campos CIF/NIF y Nombre/Empresa adecuan su label en función del demandante seleccionado.    */
// Si el input:radio #demandanteparticular esta marcado: 
$("#demandanteparticular").change(function(evento) 
{
    if ($("#demandanteparticular").is(':checked')) 
    {
        $("#textonifcif").text("NIF");    
        $("#nifcif").val("");        
        $("#textoparticularempresa").text("Nombre"); 
        $n=$("#nombre").val();
        $a=$("#apellidos").val();
        $("#particularempresa").val($n+" "+$a); 
    }
});
// Si el input:radio #demandanteparticular esta marcado: 
$("#demandanteempresa").change(function(evento) 
{
    if ($("#demandanteempresa").is(':checked')) 
    {
        $("#textonifcif").text("CIF");    
        $("#nifcif").val("");                
        $("#textoparticularempresa").text("Empresa"); 
        $("#particularempresa").val(""); 
    }
});



/*      Cp con menos de 5 digitos, completa con 0 a la izquierda    */
$("#cp").focusout(function() 
{
    var Cp = $("#cp").val();
    var longi=Cp.length;
    while(longi<5)
    {
        Cp="0"+Cp;
        longi++;
    }
    $("#cp").val(Cp);    
});



/*      El usuario debe poseer al menos 4 caracteres, se rellenará de modo automático con el email.
   No podrá ser modificado.*/   
$("#usuario").focusout(function() 
{    
    if($("#email").val()!="")
    {
        $("#usuario").val($("#usuario").val()+$("#email").val());   
        $("#usuario").attr('disabled', true);    
    }else{
        $("#usuario").val("");        
    }
});



/*      La contraseña se debe forzar a que sea compleja     */
$(document).ready(function() 
{
    $('input[type=password]').keyup(function() 
    {
        // Asigna password a una variable
        var pswd = $(this).val();

            //Valida que al menos posea 8 caracteres de longitud
        if ( pswd.length < 8 ) 
        {
            $('#longitud').removeClass('valido').addClass('erroneo');
        } else {
            $('#longitud').removeClass('erroneo').addClass('valido');
        }

        // Valida que posea minimo una letra
        if ( pswd.match(/[A-z]/) ) 
        {
            $('#letra').removeClass('erroneo').addClass('valido');
        } else {
            $('#letra').removeClass('valido').addClass('erroneo');
        }

        // Valida que posea minimo una letra mayuscula
        if ( pswd.match(/[A-Z]/) ) 
        {
            $('#mayuscula').removeClass('erroneo').addClass('valido');
        } else {
            $('#mayuscula').removeClass('valido').addClass('erroneo');
        }

        // Valida que posea minimo un numero
        if ( pswd.match(/\d/) ) 
        {
            $('#numero').removeClass('erroneo').addClass('valido');
        } else {
            $('#numero').removeClass('valido').addClass('erroneo');
        }

    }).focus(function() 
            {
                $('#pswd_info').show(); // Muestra los requisitos 
            }).blur(function() 
            {
                $('#pswd_info').hide(); // Oculta los requisitos 
            });
});

//El código IBAN debe ser válido

$.validator.addMethod("iban", function(value, element) {
    // some quick simple tests to prevent needless work
    if (this.optional(element)) {
        return true;
    }

    // remove spaces and to upper case
    var iban = value.replace(/ /g, "").toUpperCase(),
        ibancheckdigits = "",
        leadingZeroes = true,
        cRest = "",
        cOperator = "",
        countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

    if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(iban))) {
        return false;
    }

    // check the country code and find the country specific format
    countrycode = iban.substring(0, 2);
    bbancountrypatterns = {
        "AL": "\\d{8}[\\dA-Z]{16}",
        "AD": "\\d{8}[\\dA-Z]{12}",
        "AT": "\\d{16}",
        "AZ": "[\\dA-Z]{4}\\d{20}",
        "BE": "\\d{12}",
        "BH": "[A-Z]{4}[\\dA-Z]{14}",
        "BA": "\\d{16}",
        "BR": "\\d{23}[A-Z][\\dA-Z]",
        "BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
        "CR": "\\d{17}",
        "HR": "\\d{17}",
        "CY": "\\d{8}[\\dA-Z]{16}",
        "CZ": "\\d{20}",
        "DK": "\\d{14}",
        "DO": "[A-Z]{4}\\d{20}",
        "EE": "\\d{16}",
        "FO": "\\d{14}",
        "FI": "\\d{14}",
        "FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
        "GE": "[\\dA-Z]{2}\\d{16}",
        "DE": "\\d{18}",
        "GI": "[A-Z]{4}[\\dA-Z]{15}",
        "GR": "\\d{7}[\\dA-Z]{16}",
        "GL": "\\d{14}",
        "GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
        "HU": "\\d{24}",
        "IS": "\\d{22}",
        "IE": "[\\dA-Z]{4}\\d{14}",
        "IL": "\\d{19}",
        "IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
        "KZ": "\\d{3}[\\dA-Z]{13}",
        "KW": "[A-Z]{4}[\\dA-Z]{22}",
        "LV": "[A-Z]{4}[\\dA-Z]{13}",
        "LB": "\\d{4}[\\dA-Z]{20}",
        "LI": "\\d{5}[\\dA-Z]{12}",
        "LT": "\\d{16}",
        "LU": "\\d{3}[\\dA-Z]{13}",
        "MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
        "MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
        "MR": "\\d{23}",
        "MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
        "MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
        "MD": "[\\dA-Z]{2}\\d{18}",
        "ME": "\\d{18}",
        "NL": "[A-Z]{4}\\d{10}",
        "NO": "\\d{11}",
        "PK": "[\\dA-Z]{4}\\d{16}",
        "PS": "[\\dA-Z]{4}\\d{21}",
        "PL": "\\d{24}",
        "PT": "\\d{21}",
        "RO": "[A-Z]{4}[\\dA-Z]{16}",
        "SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
        "SA": "\\d{2}[\\dA-Z]{18}",
        "RS": "\\d{18}",
        "SK": "\\d{20}",
        "SI": "\\d{15}",
        "ES": "\\d{20}",
        "SE": "\\d{20}",
        "CH": "\\d{5}[\\dA-Z]{12}",
        "TN": "\\d{20}",
        "TR": "\\d{5}[\\dA-Z]{17}",
        "AE": "\\d{3}\\d{16}",
        "GB": "[A-Z]{4}\\d{14}",
        "VG": "[\\dA-Z]{4}\\d{16}"
    };

    bbanpattern = bbancountrypatterns[countrycode];
    // As new countries will start using IBAN in the
    // future, we only check if the countrycode is known.
    // This prevents false negatives, while almost all
    // false positives introduced by this, will be caught
    // by the checksum validation below anyway.
    // Strict checking should return FALSE for unknown
    // countries.
    if (typeof bbanpattern !== "undefined") {
        ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
        if (!(ibanregexp.test(iban))) {
            return false; // invalid country specific format
        }
    }

    // now check the checksum, first convert to digits
    ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
    for (i = 0; i < ibancheck.length; i++) {
        charAt = ibancheck.charAt(i);
        if (charAt !== "0") {
            leadingZeroes = false;
        }
        if (!leadingZeroes) {
            ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
        }
    }

    // calculate the result of: ibancheckdigits % 97
    for (p = 0; p < ibancheckdigits.length; p++) {
        cChar = ibancheckdigits.charAt(p);
        cOperator = "" + cRest + "" + cChar;
        cRest = cOperator % 97;
    }
    return cRest === 1;
}, "Por favor, escriba una IBAN válido.");