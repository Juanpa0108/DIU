<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


    require("../conexion.php");

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $curso = $params->curso;

    $consulta = "INSERT INTO $curso (nombreEstudiante, codigo) VALUES (?, ?)";

    $stmt = mysqli_prepare($conexion, $consulta);
            mysqli_stmt_bind_param($stmt, "si", $params->nombre, $params->codigo);
            mysqli_stmt_execute($stmt);

    $resultado = mysqli_stmt_get_result($stmt);


    echo json_encode($resultado);

    header('Content-Type: application/json');
?>