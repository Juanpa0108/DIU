<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


    require("../conexion.php");

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $codigo = $params->codigo;

    $consulta = "SHOW TABLES";
    $resultado = mysqli_query($conexion, $consulta);

    

    $tablasUsuario = array();  

    if ($resultado) {
        $tablas = array();
        while ($row = mysqli_fetch_assoc($resultado)) {
            $tablas = $row['Tables_in_qualifier'];
            $palabraSinComillas = trim($tablas, '"');

        
            $sql = "SELECT * FROM $palabraSinComillas WHERE codigo =  $codigo";
            $result = mysqli_query($conexion, $sql);

            if($result && mysqli_num_rows($result) > 0){
                $tablasUsuario[] = $tablas;
                }
            
        }
    }

    

    echo json_encode($tablasUsuario);

    header('Content-Type: application/json');
?>