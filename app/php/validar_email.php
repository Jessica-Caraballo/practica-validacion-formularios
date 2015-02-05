<?php
// Datos de conexion para mi base de datos
$dbinfo = "mysql:dbname=practica_validacion;host=localhost";
$user = "root";
$pass = "jessi";

// Intenta conectar
try 
{
     // Conecta con la BBDD 
    $db = new PDO($dbinfo, $user, $pass);

    // Inicializa la conexion como utf8 para que coja correctamente caracteres españoles como la ñ
    $db->exec('SET CHARACTER SET utf8');
} catch (Exception $e) {
    echo "La conexi&oacute;n ha fallado: " . $e->getMessage();
}

// Si recibe una variable CP
if (isset($_REQUEST['email'])) 
{
    // Guarda en una variable el email
    $email = $_REQUEST['email'];

    //Prepara y lanza la consulta
    $sql = $db->prepare("SELECT * FROM usuarios WHERE email=?");
    $sql->bindParam(1, $email, PDO::PARAM_STR); 
    $sql->execute();

    // Declara una variable para almacer si todo fue bien o no, y lo comprueba asignado
    $valid;
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
