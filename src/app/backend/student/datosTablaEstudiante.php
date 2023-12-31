<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header("Access-Control-Allow-Methods: *");
    header('Content-Type: application/json');

    require("../conexion.php");

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $nombre = $params->nombre;
    $codigo = $params->codigo;

    $consulta = "SELECT * FROM `$nombre` WHERE codigo = $codigo";
    $resultado = mysqli_query($conexion, $consulta);

    $data = array();

    while ($fila = mysqli_fetch_assoc($resultado)) {
        $data[] = $fila;
    }

    echo json_encode($data);
    
?>