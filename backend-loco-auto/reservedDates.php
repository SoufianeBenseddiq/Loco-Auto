<?php 
// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

include "./connexion.php";

if(isset($_GET['carId'])) {
    $carId = $_GET['carId'];
    
    $q = "SELECT dateDebut, dateFin FROM reservation WHERE id_voiture = '$carId'";
    $result = $connexion->query($q);

    $reservedDates = [];
    while($row = $result->fetch_assoc()) {
        $reservedDates[] = [
            'start' => $row['dateDebut'],
            'end' => $row['dateFin']
        ];
    }

    echo json_encode($reservedDates);
} else {
    echo json_encode([]);
}
?>
