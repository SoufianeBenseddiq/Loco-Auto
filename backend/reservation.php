<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "./connexion.php";

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['carId'];
    $dateDebut = $_POST['dateDebut'];
    $dateFin = $_POST['dateFin'];
    $montantTotal = $_POST['montantTotal'];
    $token = $_POST['token'];
    $depart = $_POST['lieuRamassage'];
    $arrive = $_POST['lieuDepot'];

    // Get the user ID based on the token
    $q1 = "SELECT id_utilisateur FROM utilisateur WHERE token = '$token'";
    $result = $connexion->query($q1);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $idUser = $user['id_utilisateur'];

        // Insert reservation data into the database without file paths
        $q2 = "INSERT INTO reservation (depart, arrive, dateDebut, dateFin, montantTotal, id_utilisateur, cnie, id_voiture, NoPermis)
               VALUES ('$depart', '$arrive', '$dateDebut', '$dateFin', '$montantTotal', '$idUser', '', '$id', '')";
        $insertion = $connexion->query($q2);

        if ($insertion) {
            $reservationId = $connexion->insert_id; // Get the last inserted ID

            // Handle file uploads and rename them
            $uploadDir = 'uploads/';
            $cnie_path = '';
            $noPermis_path = '';

            if (isset($_FILES['cnie'])) {
                $cnie_file = $_FILES['cnie'];
                $cnie_extension = pathinfo($cnie_file['name'], PATHINFO_EXTENSION);
                $cnie_path = $uploadDir . $reservationId . '_cnie.' . $cnie_extension;
                move_uploaded_file($cnie_file['tmp_name'], $cnie_path);
            }

            if (isset($_FILES['NoPermis'])) {
                $noPermis_file = $_FILES['NoPermis'];
                $noPermis_extension = pathinfo($noPermis_file['name'], PATHINFO_EXTENSION);
                $noPermis_path = $uploadDir . $reservationId . '_permis.' . $noPermis_extension;
                move_uploaded_file($noPermis_file['tmp_name'], $noPermis_path);
            }

            // Update reservation record with the file paths
            $q3 = "UPDATE reservation SET cnie = '$cnie_path', NoPermis = '$noPermis_path' WHERE id_reservation = $reservationId";
            $update = $connexion->query($q3);

            if ($update) {
                $response['status'] = 'success';
                $response['message'] = 'Voiture Reservee avec succes';
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Error updating reservation with file paths';
            }
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Error inserting into reservation table';
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'User not found';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method';
}

echo json_encode($response);
