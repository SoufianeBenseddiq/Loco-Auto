<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../connexion.php";

if (isset($_GET["marque"])) {
    $marque = $_GET["marque"];
    if ($marque == -1) {
        $q = "SELECT v.id_voiture, v.libelle_voiture, v.date_achat, v.prix_jour, v.chemin, v.id_marque,v.id_cat, v.disponibilite,
                     d.description, d.nbr_passagers, d.nbr_valises, d.transmission, d.type_carburant,
                     c.libelle_cat, m.libelle_marque
              FROM voitures v 
              INNER JOIN details_voitures d ON d.id_voiture = v.id_voiture
              INNER JOIN categories c ON c.id_cat = v.id_cat
              INNER JOIN marques m ON m.id_marque = v.id_marque
              WHERE v.disponibilite LIKE 'oui'
              ORDER BY v.libelle_voiture";
    } else {
        $q = "SELECT v.id_voiture, v.libelle_voiture, v.date_achat, v.prix_jour, v.chemin, v.id_marque, v.id_cat, v.disponibilite,
                     d.description, d.nbr_passagers, d.nbr_valises, d.transmission, d.type_carburant,
                     c.libelle_cat, m.libelle_marque
              FROM voitures v 
              INNER JOIN details_voitures d ON d.id_voiture = v.id_voiture
              INNER JOIN categories c ON c.id_cat = v.id_cat
              INNER JOIN marques m ON m.id_marque = v.id_marque
              WHERE v.id_marque = $marque AND v.disponibilite LIKE 'oui'
              ORDER BY v.libelle_voiture";
    }
    
    $result = $connexion->query($q);

    if ($result) {
        $cars = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(array("status" => "success", "result" => $cars));
    } else {
        echo json_encode(array("status" => "error", "errormsg" => "Erreur de récupération des voitures!"));
    }
} else {
    echo json_encode(array("status" => "error", "errormsg" => "Marque non spécifiée!"));
}
?>
