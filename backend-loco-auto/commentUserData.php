<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include your database connection file
include "./connexion.php";

// Get data from POST request
$data = json_decode(file_get_contents("php://input"));

// Validate inputs (you may want to perform additional validation as needed)
if (
    !isset($data->token) ||
    !isset($data->comment) ||
    !isset($data->id_voiture)
) {
    echo json_encode(array("status"=>"error", "errorMsg"=>"Erreur de recuperation de donnees!"));
}

$token=$data->token;
$comment = $data->comment;
$id_voiture=$data->id_voiture;


$q1="SELECT id_utilisateur FROM utilisateur WHERE token = '$token'";
$userResult=$connexion->query($q1);
if($userResult){
    $user=$userResult->fetch_assoc();
    $userId=$user["id_utilisateur"];

    $q2="INSERT INTO comments(comment, id_utilisateur, id_voiture) VALUES ($comment, $id_utilisateur, $id_voiture)";
}else{
    echo json_encode(array("status"=>"error", "errorMsg"=>"Utilisateur inconnu!"));
}



?>
