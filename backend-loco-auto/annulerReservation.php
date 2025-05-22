<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Autorization, X-Requested-With");

include "./connexion.php";

if (isset($_GET["idRes"])) {
    $idRes = $_GET['idRes'];
    
    // Retrieve the file paths for CNIE and Permis
    $q1 = "SELECT cnie, NoPermis FROM reservation WHERE id_reservation = '$idRes'";
    $result = $connexion->query($q1);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $cniePath = $row['cnie'];
        $permisPath = $row['NoPermis'];
        
        // Delete the files from the server
        if (file_exists($cniePath)) {
            unlink($cniePath);
        }
        if (file_exists($permisPath)) {
            unlink($permisPath);
        }
        
        // Delete the reservation record from the database
        $q2 = "DELETE FROM reservation WHERE id_reservation = '$idRes'";
        $deletion = $connexion->query($q2);
        
        if ($deletion) {
            echo json_encode("Réservation Annulée avec succes !");
        } else {
            echo json_encode("Erreur d'annulation de la réservation !");
        }
    } else {
        echo json_encode("Réservation inconnue !");
    }
} else {
    echo json_encode("Réservation inconnue !");
}
?>
