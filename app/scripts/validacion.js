$.validator.addMethod("pass", function(value, element) 
{
	var passw = $("#password").val();   
	if (passw.length > 7 && (passw.match(/[A-z]/) && passw.match(/[A-Z]/) 
		&& passw.match(/[0-9]/))) 
	{
		return true;
	}
	return false;
}, "Contraseña incorrecta, debe ser una contraseña segura."); 


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
		// DNI especial (con K, L o M)
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
		 for ( var i = 0; i < 9; i++ ) 
		 {
		  num[ i ] = parseInt( value.charAt( i ), 10 );
		 }
		  
		  // Algoritmo para comprobar si es correcto
		$sum = $num[ 2 ] + $num[ 4 ] + $num[ 6 ];
		for ( $count = 1; $count < 8; $count += 2 ) 
		{
			$tmp = ( 2 * $num[ $count ] ).toString(),
		   	$secondDigit = $tmp.charAt( 1 );
		  	$sum += parseInt( $tmp.charAt( 0 ), 10 ) + ( $secondDigit === '' ? 0 : parseInt( $secondDigit, 10 ) );
		}
		  
		 // CIF test
		 if ( /^[ABCDEFGHJNPQRSUVW]{1}/.test( value ) ) 
		 {
		  sum += '';
		  controlDigit = 10 - parseInt( sum.charAt( sum.length - 1 ), 10 );
		  value += controlDigit;
		  return ( num[ 8 ].toString() === String.fromCharCode( 64 + controlDigit ) || num[ 8 ].toString() === value.charAt( value.length - 1 ) );
		 }
	}
	return false;
}, "Identificacion incorrecta"); 