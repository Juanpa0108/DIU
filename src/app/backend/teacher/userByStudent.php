<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

    require("../conexion.php");

    $consulta = "SELECT * FROM usuarios WHERE tipo = 'estudiante'";
    $resultado = mysqli_query($conexion, $consulta);

    $data = array();

    while ($fila = mysqli_fetch_assoc($resultado)) {
        $data[] = $fila;
    }

    echo json_encode($data);

    header('Content-Type: application/json');
?>