<?php
// Replace "your_database_host", "your_database_name", "your_database_username", and "your_database_password" with your actual database credentials.
$host = "localhost";
$dbname ="vishnu";
$username = "root";
$password = "";

try {
  $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  die("Connection failed: " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $password = $_POST["password"];

  $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username AND password = :password");
  $stmt->bindParam(':username', $username);
  $stmt->bindParam(':password', $password);
  $stmt->execute();

  $user = $stmt->fetch();

  if ($user) {
    // User found, redirect to the dashboard or homepage.
    header("Location: new.html");
    exit();
  } else {
    // Invalid login credentials, display an error message.
    echo "<script>alert('Invalid username or password');</script>";
  }
}
?>
