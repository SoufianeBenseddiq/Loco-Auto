<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../connexion.php";

// Check connection
if ($connexion->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $connexion->connect_error]));
}

// SQL query to fetch reservations ordered by dateDebut
$sql = "SELECT 
    reservation.id_reservation, 
    reservation.depart, 
    reservation.arrive, 
    reservation.dateDebut, 
    reservation.dateFin, 
    reservation.montantTotal, 
    reservation.cnie, 
    reservation.NoPermis, 
    reservation.confirme,
    utilisateur.nom_Utilisateur, 
    utilisateur.prenom_Utilisateur, 
    utilisateur.telephone_Utilisateur, 
    voitures.libelle_voiture,
    voitures.prix_jour,
    (DATEDIFF(reservation.dateFin, reservation.dateDebut) + 1) * voitures.prix_jour AS montantTotal
FROM 
    reservation 
JOIN 
    utilisateur ON reservation.id_utilisateur = utilisateur.id_utilisateur 
JOIN 
    voitures ON reservation.id_voiture = voitures.id_voiture 
WHERE
    reservation.dateDebut > NOW() 
ORDER BY 
    reservation.dateDebut ASC;
";

$result = $connexion->query($sql);

if ($result->num_rows > 0) {
    $reservations = [];
    while($row = $result->fetch_assoc()) {
        $reservations[] = $row;
    }
    echo json_encode($reservations);
} else {
    echo json_encode([]);
}

$connexion->close();
?>
