<?php
// Descomentaría la siguiente línea para mostrar errores de php en el fichero:
    // ini_set('display_errors', '1');
// Define los parámetros de conexión con la bbdd:
$dbinfo = "mysql:dbname=xxxx;host=localhost";
$user = "yyyyy";
$pass = "zzzzz";

// Intenta conectar:
try 
{
    // Conecta con bbdd e inicializamos conexión como UTF8
    $db = new PDO($dbinfo, $user, $pass);
    $db->exec('SET CHARACTER SET utf8');
} catch (Exception $e) {
    echo "La conexi&oacute;n ha fallado: " . $e->getMessage();
}
// Para hacer debug, cargaría a mano el parámetro, descomentaría la siguiente línea:
    //$_REQUEST['email'] = "pepito@hotmail.com";
if (isset($_REQUEST['email'])) 
{
    // Guarda el email
    $email = $_REQUEST['email'];
    //Prepara y lanza la consulta
    $sql = $db->prepare("SELECT * FROM usuarios WHERE email=?");
    $sql->bindParam(1, $email, PDO::PARAM_STR); 
    $sql->execute();
    // Declara variable para almacer si ha funcionado bien o no
    $valid = 'true';
    if ($sql->rowCount() > 0) 
    {
        $valid= 'false';
    } else {
       $valid='true';
    }
}
// Devuelve el resultado de la busqueda, finalmente si existe dara error
echo $valid;

// Libera recursos (BBDD y consulta)
$sql=null;
$db = null;
?>