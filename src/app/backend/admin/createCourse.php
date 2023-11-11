<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


    require("../conexion.php");

    $json = file_get_contents('php://input');
    $params = json_decode($json);

    $consulta = "INSERT INTO cursos (codigo, nombreCurso,  profesorAsignado) VALUES (?, ?, ?, ?)";

    $stmt = mysqli_prepare($conexion, $consulta);
            mysqli_stmt_bind_param($stmt, "iss", $params->codigoCurso, $params->nombre,  $params->profesorAsignado);
            mysqli_stmt_execute($stmt);

    $resultado = mysqli_stmt_get_result($stmt);


    echo json_encode($resultado);

    header('Content-Type: application/json');
?>