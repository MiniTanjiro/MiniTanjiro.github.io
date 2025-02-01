<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Autorise les requêtes depuis un autre domaine si nécessaire

$host = getenv('HOST') ?: 'localhost';
$user = getenv('USER') ?: 'root';
$pass = getenv('PASSWORD') ?: '';
$dbname = getenv('NAME') ?: 'ma_bdd';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Erreur de connexion: " . $conn->connect_error]));
}

$sql = "SELECT * FROM experience";
$result = $conn->query($sql);

$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
$conn->close();
?>
