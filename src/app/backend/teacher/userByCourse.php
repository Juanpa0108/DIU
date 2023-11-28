<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: *");
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header('Content-Type: application/json');
   
    require("../conexion.php");

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $curso= $params->curso;
    
    $consulta = "SELECT * FROM $curso";
    $resultado= mysqli_query($conexion, $consulta);

    $data = array();

    while ($fila = mysqli_fetch_assoc($resultado)) {
        $data[] = $fila;
    }

    


    $cad = json_encode($data);
    echo $cad;
    
?>