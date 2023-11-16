<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

    require("../conexion.php");

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $nombre = $params->nombre;

    $consulta = "SELECT * FROM cursos WHERE profesorAsignado = $nombre";
    $resultado = mysqli_query($conexion, $consulta);

     $data = array();

     while ($fila = mysqli_fetch_assoc($resultado)) {
         $data[] = $fila;
     }

    echo json_encode($data);

    header('Content-Type: application/json');
?>