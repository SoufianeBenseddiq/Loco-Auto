<?php
include "./connexion.php";

for($i=2;$i<107;$i++){
    $q1="INSERT INTO `comments` (`comment`, `id_utilisateur`, `id_voiture`) 
    VALUES 
        ('Un meilleur service et une voiture sympa et confortable', 1, $i),
        ('Très belle voiture, et super service', 2, $i),
        ('La voiture était en bon état mais le service était un petit peu lent, mais en tout cas client satisfait!', 3, $i),
        ('Voiture de qualité et service impeccable, je recommande', 4, $i)";
        $result=$connexion->query($q1);
        if($result){
            echo "well added";
        }
}
