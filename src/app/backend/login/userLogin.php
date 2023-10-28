<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
   
    require("../conexion.php");

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    
    $consulta = "SELECT * FROM usuarios WHERE codigo = ? AND password = ?";

    $stmt = mysqli_prepare($conexion, $consulta);
            mysqli_stmt_bind_param($stmt, "ss", $params->usuario, $params->password);
            mysqli_stmt_execute($stmt);

    $resultado = mysqli_stmt_get_result($stmt);

    $admin = mysqli_fetch_assoc($resultado);


    $cad = json_encode($admin);
    echo $cad;
    header('Content-Type: aplication/json');
?>