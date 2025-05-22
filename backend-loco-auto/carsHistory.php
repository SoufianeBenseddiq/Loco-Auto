<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "./connexion.php";

if (isset($_GET["idRes"])) {
    $idRes = $_GET['idRes'];

    $q = "SELECT v.chemin, v.libelle_voiture, v.prix_jour, r.dateDebut, r.dateFin, c.libelle_cat, r.montantTotal, r.depart, r.arrive, DATEDIFF(NOW(), r.dateDebut) AS etatRes
          FROM reservation r
          INNER JOIN voitures v ON v.id_voiture = r.id_voiture
          INNER JOIN categories c ON v.id_cat = c.id_cat
          WHERE r.id_reservation = '$idRes'";
    
    $result = $connexion->query($q);
    $carData = $result->fetch_assoc();

    $carDataToSend = [
        "chemin" => $carData["chemin"],
        "libelle" => $carData["libelle_voiture"],
        "categorie" => $carData["libelle_cat"],
        "prixJour" => $carData["prix_jour"],
        "dateDebut" => explode(" ", $carData["dateDebut"])[0],
        "dateFin" => explode(" ", $carData["dateFin"])[0],
        "montantTotal" => $carData["montantTotal"],
        "expired" => (((int)$carData["etatRes"]) >= 0 ? true : false),
        "depart" => $carData["depart"],
        "arrive" => $carData["arrive"]
    ];

    echo json_encode($carDataToSend);
} else {
    echo json_encode("Reservation ID not provided.");
}
?>
