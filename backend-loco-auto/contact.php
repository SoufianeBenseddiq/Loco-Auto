<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "./PHPMailer/src/Exception.php";
require "./PHPMailer/src/PHPMailer.php";
require "./PHPMailer/src/SMTP.php";

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->email) && !empty($data->msg)) {
    $name = $data->name;
    $senderEmail = "soufianebenseddiq9@gmail.com"; // Sender's email entered in the form
    $msg = $data->msg;

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'soufianebenseddiq8@gmail.com'; // Your Gmail address
        $mail->Password = 'fiob hadr kglu jsvu'; // Your Gmail password
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        // Sender's email (email entered in the form)
        $mail->setFrom($senderEmail);

        // Recipient's email (your email address)
        $receiverEmail = "soufianebenseddiq8@gmail.com"; // Your email address
        $mail->addAddress($receiverEmail);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "Email from $name";
        $mail->Body = $msg;

        $mail->send();
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Veuillez entrer tous les champs!"]);
}
?>
