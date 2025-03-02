<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Autorization, X-Requested-With");

include "./connexion.php";

if(isset($_GET["token"])){
    // echo json_encode($_GET["token"]);
    $token = $_GET["token"];
    $q="SELECT r.id_reservation , r.dateDebut  FROM reservation r INNER JOIN utilisateur u ON u.id_utilisateur = r.id_utilisateur WHERE u.token = '$token' AND DATEDIFF(NOW(), r.dateDebut) > 0 ORDER BY DATEDIFF(NOW(), r.dateDebut) DESC ";
    $result = $connexion -> query($q);
    $ids=[];
    while($car = $result ->fetch_assoc()){
        $ids[] = $car["id_reservation"];
    }
    echo json_encode($ids);    
}
else{
    echo json_encode("utilisateur inconnu!");
}