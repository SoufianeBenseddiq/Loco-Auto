<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../connexion.php";

// Check if the id_voiture parameter exists in the request
if(isset($_GET['id_voiture'])){
    $id_voiture = $_GET['id_voiture'];

    // Update the disponibilite column to 'non' for the specified id_voiture
    $sql = "UPDATE voitures SET disponibilite = 'non' WHERE id_voiture = $id_voiture";

    if ($connexion->query($sql) === TRUE) {
        // If the SQL query is successful, send a success response
        echo json_encode(array("status" => "success"));
    } else {
        // If there's an error with the SQL query, send an error response
        echo json_encode(array("status" => "error", "errormsg" => "Error updating record: " . $conn->error));
    }
} else {
    // If the id_voiture parameter is not provided, send an error response
    echo json_encode(array("status" => "error", "errormsg" => "id_voiture parameter is missing"));
}

$connexion->close();
?>
