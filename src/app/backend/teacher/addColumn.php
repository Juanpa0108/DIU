<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: *");
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header('Content-Type: application/json');
   
    require("../conexion.php");
    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $curso= $params->curso;
    $tipo = $params->tipo;

    $query = "SHOW COLUMNS FROM nombre_de_la_tabla";
    $result = mysqli_query($tu_conexion, $query);

    if ($result) {
        // Almacena los nombres de los atributos en un array
        $columnas = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $columnas[] = $row['Field'];
        }

        // Excluye el último atributo
        array_pop($columnas);

        // Muestra los atributos restantes
    foreach ($columnas as $columna) {
        echo $columna . "<br>";
    }
} else {
    echo "Error en la consulta: " . mysqli_error($tu_conexion);
}

    cad = json_encode($admin);
    echo $cad;
    
?>