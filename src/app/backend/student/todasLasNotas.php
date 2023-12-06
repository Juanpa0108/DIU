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

     
    $index = 0;
       
    $tablasUsuarioConCodigo = array();
    // Mientras haya tablas en $tablasUsuario, busca el código correspondiente en la tabla "cursos"
    while ($index < count($tablasUsuario)) {
        $tabla = $tablasUsuario[$index];
    
        $sql = "SELECT codigo FROM cursos WHERE nombreCurso = '$tabla'";
        $result = mysqli_query($conexion, $sql);
    
        if ($result && mysqli_num_rows($result) > 0) {
            $fila = mysqli_fetch_assoc($result);
            $codigoCurso = $fila['codigo'];
    
            $sqlNotaFinal = "SELECT notaFinal FROM $tabla WHERE codigo = $codigo";
            $resultNotaFinal = mysqli_query($conexion, $sqlNotaFinal);

        if ($resultNotaFinal && mysqli_num_rows($resultNotaFinal) > 0) {
            $filaNotaFinal = mysqli_fetch_assoc($resultNotaFinal);
            $notaFinal = $filaNotaFinal['notaFinal'];

            // Agrega un objeto al array resultante
            $tablasUsuarioConCodigo[] = array('nombre' => $tabla, 'codigo' => $codigoCurso, 'notaFinal' => $notaFinal);
        }
           
        }
    
        // Incrementa el índice para avanzar al siguiente elemento en $tablasUsuario
        $index++;
    }
    
    echo json_encode($tablasUsuarioConCodigo);
    //echo json_encode($tablasUsuario);

    header('Content-Type: application/json');
?>