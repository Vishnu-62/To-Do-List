<?php
// Get task data from JavaScript AJAX request
$taskText = $_POST['taskText'];
$fromTime = $_POST['fromTime'];
$toTime = $_POST['toTime'];

// Replace database_credentials with your actual database credentials
$host = "localhost";
$dbname ="vishnu";
$username = "root";
$password = "";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Insert task data into the database
$sql = "INSERT INTO tasks (task_text, from_time, to_time, status) VALUES ('$taskText', '$fromTime', '$toTime', 0)";

if ($conn->query($sql) === TRUE) {
  echo 'Task added successfully';
} else {
  echo 'Error: ' . $sql . '<br>' . $conn->error;
}

$conn->close();
?>
