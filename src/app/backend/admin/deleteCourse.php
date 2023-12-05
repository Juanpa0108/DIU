<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require("../conexion.php");

$json = file_get_contents('php://input');
$params = json_decode($json);
$nombre = $params->nombreCurso;

$consulta = "DELETE FROM cursos WHERE codigo = ?";
$stmt = mysqli_prepare($conexion, $consulta);
mysqli_stmt_bind_param($stmt, "i", $params->codigoCurso);
$exito = mysqli_stmt_execute($stmt);

if ($exito) {
    $consu = "DROP TABLE IF EXISTS $nombre";
    $resultado = mysqli_query($conexion, $consu);
    $respuesta = array("mensaje" => "La eliminación se realizó correctamente");
} else {
    $respuesta = array("error" => "Error al intentar eliminar el curso");
}

echo json_encode($respuesta);
header('Content-Type: application/json');
?>
