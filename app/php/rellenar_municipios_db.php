<?php
// Datos de conexion para la base de datos
$dbinfo = "mysql:dbname=practica_validacion;host=localhost";
$user = "root";
$pass = "root";

// Intenta conectar
try 
{
    // Conecta a la BBDD 
    $db = new PDO($dbinfo, $user, $pass);
    // Inicializa la conexion como utf8 para que coja correctamente caracteres españoles como la ñ
    $db->exec('SET CHARACTER SET utf8');
} catch (Exception $e) {
    echo "La conexi&oacute;n ha fallado: " . $e->getMessage();
}

// Si recibe una variable CP
if (isset($_REQUEST['cp'])) 
{
    // Si su longuitud es mayor o igual a 2, selecciona los 2 primeros caracteres en cp
    if (strlen($_REQUEST['cp']) >= 2)
    {
        $cp = substr($_REQUEST['cp'], 0, 2);
    } else {
    // Sino asigna directamente el valor a la variable cp        
        $cp = $_REQUEST['cp'];
    }

     // Prepara y lanza la consulta   
    $sql = $db->prepare("SELECT t_municipios FROM municipios WHERE CodProv=?");
    $sql->bindParam(1, $cp, PDO::PARAM_STR);
    $sql->execute();

    // Declara una variable para almacer si todo fue bien o no, y lo comprueba
    $valid;
    if ($sql->rowCount() > 0) 
    {
        $valid= 'true';
    } else {
       $valid='false';
    }

    // Recorre la consulta 
    while($okey = $sql->fetch())
    {
        echo '<option value="'.$okey[0].'">' . $okey[0] . "</option>";
    }

// Libera recursos (BBDD y consulta)
$sql=null;
$db=null;
}
?>