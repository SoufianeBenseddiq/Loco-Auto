<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Autorization, X-Requested-With");

include "./connexion.php";
$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$pwdEntered = $data->password;
if(empty($email) || empty($pwdEntered)){
    echo json_encode(array("status" => "Empty"));
    exit();
}

// Retrieve hashed password from database for the given email
$q = "SELECT motDePasse_Utilisateur, token FROM utilisateur WHERE email_Utilisateur = ?";
$stmt = $connexion->prepare($q);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User found, retrieve hashed password
    $row = $result->fetch_assoc();
    $passwordDB = $row['motDePasse_Utilisateur'];
    $token=$row["token"];

    // Verify entered password and that one hashed on database
    if (password_verify($pwdEntered, $passwordDB)) {
        echo json_encode(array("status" => "Success", "token" => $token));
    }else {
        echo json_encode(array("status" => "Invalid"));
    }
} else {
    // User not found, login failed
    echo json_encode(array("status" => "Invalid"));
}

$stmt->close();