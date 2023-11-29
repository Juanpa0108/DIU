<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: *");
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header('Content-Type: application/json');
   
    require("../conexion.php");
    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $curso = $params->curso;
    $tipo = $params->tipo;

    $query = "SHOW COLUMNS FROM $curso";
    $result = mysqli_query($conexion, $query);

    if ($result) {
        // Almacena los nombres de los atributos en un array
        $columnas = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $columnas[] = $row['Field'];
        }

        // Excluye el último atributo
        array_pop($columnas);

        //ultimo valor del array
        $ultimo = end($columnas);
        
        $consulta = "alter table $curso add column $tipo decimal(10, 1) after $ultimo";
        $resultado = mysqli_query($conexion, $consulta);

    }

    $cad = json_encode($resultado);
    echo $cad;
    
?>