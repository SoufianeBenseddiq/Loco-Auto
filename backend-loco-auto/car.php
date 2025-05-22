<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json; charset=UTF-8");

// Retrieve the car ID from the request
$id = json_decode(file_get_contents("php://input"));

if (!is_numeric($id)) {
    // Return an error response if the ID is not a valid number
    echo json_encode(["error" => "Invalid car ID"]);
    exit;
}

// Include database connection
include "./connexion.php";

// Query to retrieve detailed car information
$q = "SELECT v.*, d.*, c.libelle_cat, m.libelle_marque 
      FROM voitures v
      INNER JOIN details_voitures d ON v.id_voiture = d.id_voiture
      INNER JOIN categories c ON c.id_cat = v.id_cat
      INNER JOIN marques m ON m.id_marque = v.id_marque
      WHERE v.id_voiture = $id";

$result = $connexion->query($q);

if (!$result) {
    // Return an error response if the query fails
    echo json_encode(["error" => "erroe bringing data"]);
    exit;
}

if ($result->num_rows == 0) {
    // Return an error response if no car is found with the given ID
    echo json_encode(["error" => "Car not found"]);
    exit;
}

// Fetch the car data
$car = $result->fetch_assoc();
// Construct the car data array
$carData = [
    "libelle" => $car["libelle_voiture"],
    "dateAchat" => $car["date_achat"],
    "prix" => $car["prix_jour"],
    "description" => $car["description"],
    "nbr_passagers" => $car["nbr_passagers"],
    "nbr_valises" => $car["nbr_valises"],
    "transmission" => $car["transmission"],
    "carburant" => $car["type_carburant"],
    "categorie" => $car["libelle_cat"],
    "marque" => $car["libelle_marque"],
    "chemin" => $car["chemin"]
];

// Return the car data as JSON
echo json_encode($carData);
?>
