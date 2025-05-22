<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Autorization, X-Requested-With");

include "./connexion.php";

$q="SELECT id_voiture FROM voitures";
$cars=$connexion->query($q);
$ids=[];
while($car=$cars->fetch_assoc()){
    $ids[]=$car["id_voiture"];
}
echo json_encode($ids);
