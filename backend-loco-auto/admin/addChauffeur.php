<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../connexion.php";

$data = json_decode(file_get_contents("php://input"));

if (isset($data->nom) && isset($data->prenom) && isset($data->cnie) && isset($data->telephone)) {
    $nom = $data->nom;
    $prenom = $data->prenom;
    $cnie = $data->cnie;
    $telephone = $data->telephone;

    $q = "INSERT INTO chauffeur (nom, prenom, cnie, telephone) VALUES ('$nom', '$prenom', '$cnie', '$telephone')";

    if ($connexion->query($q) === TRUE) {
        echo json_encode(["status" => "success", "msg" => "Chauffeur added successfully."]);
    } else {
        echo json_encode(["status" => "error", "msg" => "Error adding chauffeur."]);
    }
} else {
    echo json_encode(["status" => "error", "msg" => "Invalid input."]);
}

$connexion->close();
?>
