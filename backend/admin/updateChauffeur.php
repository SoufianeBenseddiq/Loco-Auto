<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../connexion.php";

$data = json_decode(file_get_contents("php://input"));

if (isset($data->idChauff) && isset($data->nom) && isset($data->prenom) && isset($data->cnie) && isset($data->telephone)) {
    $idChauff = $data->idChauff;
    $nom = $data->nom;
    $prenom = $data->prenom;
    $cnie = $data->cnie;
    $telephone = $data->telephone;

    $q = "UPDATE chauffeur SET nom='$nom', prenom='$prenom', cnie='$cnie', telephone='$telephone' WHERE idChauff=$idChauff";

    if ($connexion->query($q) === TRUE) {
        echo json_encode(["status" => "success", "msg" => "Chauffeur updated successfully."]);
    } else {
        echo json_encode(["status" => "error", "msg" => "Error updating chauffeur."]);
    }
} else {
    echo json_encode(["status" => "error", "msg" => "Invalid input."]);
}

$connexion->close();
?>
