<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json; charset=UTF-8");

// Retrieve the car ID from the request
$id = json_decode(file_get_contents("php://input"));

if(is_numeric($id)){
    include "./connexion.php";

    $q1 = "SELECT v.*, d.*, c.libelle_cat, m.libelle_marque 
        FROM voitures v
        INNER JOIN details_voitures d ON v.id_voiture = d.id_voiture
        INNER JOIN categories c ON c.id_cat = v.id_cat
        INNER JOIN marques m ON m.id_marque = v.id_marque
        WHERE v.id_voiture = $id";

        
    $result = $connexion->query($q1);

    if (!$result) {
        echo json_encode(["error" => "Error bringing data"]);
        exit;
    }

    if ($result->num_rows == 0) {
        echo json_encode(["error" => "Car not found"]);
        exit;
    }
    // MAIN CAR INFO
    $car = $result->fetch_assoc();
    // Comments
    $q2="SELECT c.*, u.* 
    FROM comments c 
    INNER JOIN voitures v ON v.id_voiture = c.id_voiture 
    INNER JOIN utilisateur u ON c.id_utilisateur = u.id_utilisateur 
    WHERE v.id_voiture = $id;
    ";
    $comm=$connexion->query($q2);

    $commentsData=[];
    $t=[];
    while($c=$comm->fetch_assoc()){
        $t["comment"]=$c["comment"];
        $t["lname"]=$c["nom_utilisateur"];
        $t["fname"]=$c["prenom_utilisateur"];
        $commentsData[]=$t;
    }

    $chemin=$car["chemin"];
    $nomChemin=explode(".",$chemin);
    $ch1=$nomChemin[0]."_1.jpg";
    $ch2=$nomChemin[0]."_2.jpg";
    $chemin1="http://localhost/locoauto/carsimages/".$chemin;
    $chemin2="http://localhost/locoauto/finalimages/".$ch1;
    $chemin3="http://localhost/locoauto/finalimages/".$ch2;
    $carData = [
        "libelle" => $car["libelle_voiture"],
        "dateAchat" => $car["date_achat"],
        "prix" => $car["prix_jour"],
        "description" => $car["description"],
        "nbr_passagers" => $car["nbr_passagers"],
        "nbr_valises" => $car["nbr_valises"],
        "transmission" => $car["transmission"],
        "carburant" => $car["type_carburant"],
        "categorie" => $car["libelle_cat"],
        "marque" => $car["libelle_marque"],
        "chemin1" => $chemin1,
        "chemin2" => $chemin2,
        "chemin3" => $chemin3,
        "comments"=>$commentsData,
    ];


    echo json_encode($carData);
}
