<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header("Access-Control-Allow-Methods: *");
    header('Content-Type: application/json');


    require("../conexion.php");

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $nombre = $params->nombre;

    $consulta = "CREATE TABLE `$nombre` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(32),
        codigo INT(7),
        nota1 decimal(10, 1),
        notaFinal decimal(10, 2)
    )";

    $resultado = mysqli_query($conexion, $consulta);

    if ($resultado) {
        echo json_encode(["mensaje" => "Tabla creada exitosamente"]);
    } else {
        echo json_encode(["error" => "Error al crear la tabla". mysqli_error($conexion)]);
    }

    mysqli_close($conexion);


    
?>