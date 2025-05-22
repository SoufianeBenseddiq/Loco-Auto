<?php
include "connexion.php";
$directory=opendir("./carsimages/berlines");
$tab=[];
while($file=readdir($directory)){
    if($file!=="." && $file!==".." ){
        $path="berlines/$file";
        $tab[]=$path;
        // echo $path."<br>";
    }
}
$q1="SELECT id_voiture FROM voitures where id_cat=3 ORDER BY libelle_voiture";
$res=$connexion->query($q1);
$n=$res->num_rows;
// echo $n;
for($i=1;$i<=$n;$i++){
    $car=$res->fetch_assoc();
    $id=(int)$car["id_voiture"];
    $p=$tab[$i-1];
    // echo "UPDATE voitures SET chemin=\"$p\" WHERE id_voiture = $id<br>";
    $q2="UPDATE voitures SET chemin=\"$p\" WHERE id_voiture = $id";
    $modify=$connexion->query($q2);
    if($modify){
        echo $q2;echo "<br>";
    }
}
