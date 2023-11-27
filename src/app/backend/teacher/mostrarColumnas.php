<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: *");
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header('Content-Type: application/json');
   
    require("../conexion.php");
    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $curso = $params->curso;

    $query = "SHOW COLUMNS FROM $curso";
    $result = mysqli_query($conexion, $query);

    if ($result) {
        // Almacena los nombres de los atributos en un array
        $columnas = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $columnas[] = $row['Field'];
        }
    }

    $cad = json_encode($columnas);
    echo $cad;
    
?>