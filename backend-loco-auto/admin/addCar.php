<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../connexion.php";

// Function to clean input data
function cleanInput($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

function getCategoryNameById($id) {
    switch ($id) {
        case 0:
            return 'suv';
        case 1:
            return 'cabriolets';
        case 2:
            return 'breaks';
        case 3:
            return 'berlines';
        case 4:
            return 'compacts';
        case 5:
            return 'crossovers';
        default:
            return null;
    }
}

// Handle the form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $libelle_voiture = cleanInput($_POST["libelle_voiture"]);
    $date_achat = cleanInput($_POST["date_achat"]);
    $prix_jour = cleanInput($_POST["prix_jour"]);
    $id_marque = cleanInput($_POST["id_marque"]);
    $id_cat = (int)cleanInput($_POST["id_cat"]);
    $nbr_passagers = cleanInput($_POST["nbr_passagers"]);
    $nbr_valises = cleanInput($_POST["nbr_valises"]);
    $transmission = cleanInput($_POST["transmission"]);
    $type_carburant = cleanInput($_POST["type_carburant"]);
    $description = cleanInput($_POST["description"]);

    $cat = getCategoryNameById($id_cat);
    // echo json_encode($_POST);

    // Handle the file upload
    $ch="";
    if (isset($_FILES["chemin"]) && $_FILES["chemin"]["error"] == 0) {
        $ch=$cat . "/" . basename($_FILES["chemin"]["name"]);
        $uploadDir = "../carsimages/" . $cat . "/";
        
        // Check if directory exists, if not, create it
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        $uploadFile = $uploadDir . basename($_FILES["chemin"]["name"]);
        if (move_uploaded_file($_FILES["chemin"]["tmp_name"], $uploadFile)) {
            $chemin = $cat . "/" . basename($_FILES["chemin"]["name"]);
        } else {
            echo json_encode(["status" => "error", "errormsg" => "Erreur lors du téléchargement de l'image."]);
            exit();
        }
    } else {
        echo json_encode(["status" => "error", "errormsg" => "Image non téléchargée."]);
        exit();
    }

    // Insert data into 'voitures' table
    $sql_voitures = "INSERT INTO voitures (libelle_voiture, date_achat, prix_jour, id_marque, id_cat, chemin)
                    VALUES ('$libelle_voiture', '$date_achat', $prix_jour, $id_marque, $id_cat, '$ch')";
    
    if ($connexion->query($sql_voitures) === TRUE) {
        // Get the inserted voiture ID
        $voiture_id = $connexion->insert_id;

        // Insert data into 'details_voitures' table
        $sql_details = "INSERT INTO details_voitures (id_voiture, nbr_passagers, nbr_valises, transmission, type_carburant, description)
                        VALUES ($voiture_id, $nbr_passagers, $nbr_valises, '$transmission', '$type_carburant', \"$description\")";
        
        if ($connexion->query($sql_details) === TRUE) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "errormsg" => "Erreur lors de l'insertion dans la table details_voitures: " . $conn->error]);
        }
    } else {
        echo json_encode(["status" => "error", "errormsg" => "Erreur lors de l'insertion dans la table voitures: " . $conn->error]);
    }

    // Close the connection
    $connexion->close();
}
?>
