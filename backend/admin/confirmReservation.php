<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['id_reservation'])) {
    $id_reservation = $input['id_reservation'];
    $id_chauffeur = $input['idChauff'];

    // Database connection
    include "../connexion.php";

    $stmt = $connexion->prepare("UPDATE reservation SET confirme = true, idChauff = ? WHERE id_reservation = ?");
    $stmt->bind_param("ii", $id_chauffeur, $id_reservation);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    $stmt->close();
    $connexion->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>
