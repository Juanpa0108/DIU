<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: *");
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
   
    require("../conexion.php");

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $curso = $params->curso;
    $campoNota = $params->campoNota;
    
    $consulta = "UPDATE $curso SET $campoNota = ? WHERE nombre = ?";

    $stmt = mysqli_prepare($conexion, $consulta);
            mysqli_stmt_bind_param($stmt, "ds", $params->nota, $params->nombre);
    $exito = mysqli_stmt_execute($stmt);

    if ($exito) {
        $respuesta = array("mensaje" => "La nota se cambio correctamente");
    } else {
        $respuesta = array("error" => "Error al cambiar la nota");
    }


    $cad = json_encode($respuesta);
    echo $cad;
    header('Content-Type: application/json');
?>