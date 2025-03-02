<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../connexion.php";

$q = "SELECT idChauff, nom, prenom FROM chauffeur";
$result = $connexion->query($q);

if ($result->num_rows > 0) {
    $chauffeurs = [];
    while ($row = $result->fetch_assoc()) {
        $chauffeurs[] = [
            "idChauff" => $row["idChauff"],
            "nom" => $row["nom"],
            "prenom" => $row["prenom"]
        ];
    }
    echo json_encode(["status" => "success", "result" => $chauffeurs]);
} else {
    echo json_encode(["status" => "error", "msg" => "No chauffeurs found."]);
}

$connexion->close();
?>
