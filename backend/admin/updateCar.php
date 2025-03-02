<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../connexion.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_voiture = $_POST['id_voiture'];
    $libelle_voiture = $_POST['libelle_voiture'];
    $date_achat = $_POST['date_achat'];
    $prix_jour = $_POST['prix_jour'];
    $id_marque = (int)$_POST['id_marque'];
    $id_cat = (int)$_POST['id_cat'];
    $description = $_POST['description'];
    $nbr_passagers = (int)$_POST['nbr_passagers'];
    $nbr_valises = (int)$_POST['nbr_valises'];
    $transmission = $_POST['transmission'];
    $type_carburant = $_POST['type_carburant'];
    $oldImg = $_POST['oldImg'];
    $chemin = $oldImg;

    $fileMoved = false;
    if (isset($_FILES['chemin'])) {
        $target_dir = "C:\\wamp64\\www\\locoauto\\carsimages\\";
        $target_file = $target_dir . $oldImg;

        if (file_exists($target_dir . $oldImg)) {
            unlink($target_dir . $oldImg);
        }

        if (move_uploaded_file($_FILES["chemin"]["tmp_name"], $target_file)) {
            $fileMoved=true;
        }
    }

    $q1 = $connexion->prepare("UPDATE voitures 
        SET libelle_voiture=?, date_achat=?, prix_jour=?, 
            id_marque=?, id_cat=?
        WHERE id_voiture=?");
    $q1->bind_param("ssdisi", $libelle_voiture, $date_achat, $prix_jour, $id_marque, $id_cat, $id_voiture);

    $q2 = $connexion->prepare("UPDATE details_voitures
        SET description=?, nbr_passagers=?, nbr_valises=?, 
            transmission=?, type_carburant=?
        WHERE id_voiture=?");
    $q2->bind_param("siissi", $description, $nbr_passagers, $nbr_valises, $transmission, $type_carburant, $id_voiture);

    $result1 = $q1->execute();
    $result2 = $q2->execute();

    if ($result1 && $result2) {
        echo json_encode(array("status" => "success", "result" => "Voiture mise à jour avec succès!"));
    } else {
        $error_message = $connexion->error;
        echo json_encode(array("status" => "error", "errormsg" => "Erreur lors de la mise à jour de la voiture!", "mysql_error" => $error_message));
    }

    $q1->close();
    $q2->close();
} else {
    echo json_encode(array("status" => "error", "errormsg" => "Requête non autorisée!"));
}

$connexion->close();
?>
