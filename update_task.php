<?php
// Get task data from JavaScript AJAX request
$taskText = $_POST['taskText'];
$status = $_POST['status'];

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

// Update task status in the database
$sql = "UPDATE tasks SET status = $status WHERE task_text = '$taskText'";

if ($conn->query($sql) === TRUE) {
  echo 'Task status updated successfully';
} else {
  echo 'Error updating task status: ' . $conn->error;
}

$conn->close();
?>
