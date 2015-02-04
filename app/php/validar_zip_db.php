<?php
// Datos de conexion para la base de datos
$dbinfo = "mysql:dbname=xxxx;host=localhost";
$user = "yyyyy";
$pass = "zzzzz";
// Intenta conectar:
try 
{
    // Conecta con bbdd e inicializa la conexión como UTF8
    $db = new PDO($dbinfo, $user, $pass);
    $db->exec('SET CHARACTER SET utf8');
} catch (Exception $e) {
    echo "La conexi&oacute;n ha fallado: " . $e->getMessage();
}

// Si recibe una variable CP
if (isset($_REQUEST['cp']))
{
    /// Si su longuitud es mayor o igual a 2, selecciona los 2 primeros caracteres en cp
    if (strlen($_REQUEST['cp']) >= 2)
    {
	    $cp = substr($_REQUEST['cp'], 0, 2);
    } else {
        // Sino asigna directamente el valor a la variable cp   
	    $cp = $_REQUEST['cp'];
    }

 // Prepara y lanza la consulta   
    $sql = $db->prepare("SELECT t_provincias FROM provincias WHERE CodProv=?");
    //$resultado->execute($cp);
    $sql->bindParam(1, $cp, PDO::PARAM_STR);
    $sql->execute();

    // Declara una variable para almacer si todo fue bien o no, y lo comprueba
    $valid;
    if ($sql->rowCount() > 0) {
        $valid= 'true';
    } else {
       $valid='false';
    }

    // Recorre la consulta
    $okey = $sql->fetch();       
    
    //Devuelve el resultado de la provincia con ese CP
    echo $valid;

// Libera recursos (BBDD y consulta)
$sql=null;
$db=null;
}
?>