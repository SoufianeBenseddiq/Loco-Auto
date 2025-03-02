<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../connexion.php";

$data = json_decode(file_get_contents("php://input"));

if (isset($data->idChauff)) {
    $idChauff = $data->idChauff;
    $q = "DELETE FROM chauffeur WHERE idChauff = $idChauff";

    if ($connexion->query($q) === TRUE) {
        echo json_encode(["status" => "success", "msg" => "Chauffeur deleted successfully."]);
    } else {
        echo json_encode(["status" => "error", "msg" => "Error deleting chauffeur."]);
    }
} else {
    echo json_encode(["status" => "error", "msg" => "No idChauff provided."]);
}

$connexion->close();
?>
