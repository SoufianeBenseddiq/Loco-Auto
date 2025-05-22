<?php
$server = "localhost";
$user = "root";
$password = "";
$db = "locoauto";
$connexion = new mysqli($server, $user, $password, $db);

// Check for connection errors
if ($connexion->connect_error) {
    die($connexion->connect_error);
}