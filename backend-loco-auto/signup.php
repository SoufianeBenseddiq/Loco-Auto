<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Autorization, X-Requested-With");

// Read the incoming request body
$data = json_decode(file_get_contents("php://input"));
// file_get_contents("php://input"): This PHP function reads raw POST data from the input stream.
// When you send data from your React application using Axios, it typically sends JSON data in the request body. This line reads that JSON data.
// json_decode(...): This function decodes a JSON string into a PHP variable.
// In this case, it decodes the JSON data obtained from the request body into a PHP object or array, depending on the second argument passed to it.

// Check if all required fields are present
if (
    isset($data->nom) && 
    isset($data->prenom) && 
    isset($data->email) && 
    isset($data->password) && 
    isset($data->telephone)
) {
    require_once("./connexion.php");
        // Generate a unique token
        $token = bin2hex(random_bytes(32));
        $pwd=password_hash($data->password,PASSWORD_DEFAULT);

        // Prepare and bind the SQL statement
        $query = "INSERT INTO utilisateur (nom_utilisateur, prenom_utilisateur, telephone_utilisateur, email_utilisateur, motDePasse_Utilisateur,token) VALUES (?, ?, ?, ?, ?,?)";
        $statement = $connexion->prepare($query);
        $statement->bind_param("ssssss", $data->nom, $data->prenom, $data->telephone, $data->email, $pwd,$token);

        // Execute the statement
        if ($statement->execute()) {
            $response['data'] = ['status' => 'valid'];
            echo json_encode($response);
        } else {
            $response['data'] = ['status' => 'invalid'];
            echo json_encode($response);
        }

        // Close the statement and connection
        $statement->close();
        $connexion->close();
    
} else {
    echo json_encode(['error' => 'Missing required fields']);
}
?>
