<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Autorization, X-Requested-With");

include "../connexion.php";

if(isset($_GET["token"])){
    // echo json_encode($_GET["token"]);
    $token = $_GET["token"];
    $q="SELECT u.type FROM utilisateur u WHERE u.token = '$token'";
    $result = $connexion->query($q);
    $user=$result->fetch_assoc();
    $type=$user["type"];
    echo json_encode($type);    
}
else{
    echo json_encode("utilisateur inconnu!");
}