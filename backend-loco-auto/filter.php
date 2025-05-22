<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Autorization, X-Requested-With");

// echo "hello";
$d=json_decode(file_get_contents("php://input"));

// echo json_encode(array("status"=>"success", "result"=>$d));
if(!is_null($d)){
    $q="SELECT v.id_voiture FROM voitures v, details_voitures d, categories c, marques m WHERE v.id_voiture = d.id_voiture AND v.id_cat = c.id_cat AND v.id_marque = m.id_marque AND v.disponibilite LIKE 'oui'";
    $conditions = [];
    
    $categorie=$d->categorie;
    $nbrPassagers=$d->nbrPassagers;
    $nbrValises=$d->nbrValises;
    $transmission=$d->transmission;
    $prix=$d->prix;
    $marque=$d->marque;

    if(!is_null($categorie) && $categorie != -1){
        $conditions[] = "v.id_cat = $categorie";
    }
    if(!is_null($nbrPassagers) && $nbrPassagers!= -1 ){
        if($nbrPassagers == 5){
            $conditions[] = "d.nbr_passagers <= $nbrPassagers";
        }else{
            $conditions[] = "d.nbr_passagers >= $nbrPassagers";
        }
    }
    if(!is_null($nbrValises) && $nbrValises != -1){
        if($nbrValises == 3){
            $conditions[] = "d.nbr_valises <= $nbrValises";
        }else{
            $conditions[] = "d.nbr_valises >= $nbrValises";
        }
    }
    if(!is_null($marque) && $marque != -1){
        $conditions[] = "v.id_marque = $marque";
    }
    if(!is_null($transmission) && $transmission != -1){
        $conditions[] = "d.transmission = '$transmission'";
    }
    if(!is_null($prix) && $prix !== -1){
        $order = $prix == 'asc' ? 'ASC' : 'DESC';
    }

    if(!empty($conditions)){
        $q .= " AND " . implode(" AND ", $conditions);
    }

    if(isset($order)){
        $q .= " ORDER BY v.prix_jour $order";
    }

    // echo json_encode(array("status"=>"success", "result"=>$q));

    require("connexion.php");
    $result=$connexion->query($q);
    if($result){
        $t=[];
        while($car=$result->fetch_assoc()){
            $t[]=(int)$car["id_voiture"];
        }
        $length=count($t);
        echo json_encode(array("status"=>"success", "result"=>$t, "length"=>$length ));
    }
    else{
        echo json_encode(array("status"=>"invalid", "result"=>"error bringing data!"));
    }
}else{
    echo json_encode(array("status"=>"invalid", "result"=>"Une erreur s'est produite !"));
}
