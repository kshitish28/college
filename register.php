<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "event_registration";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$college = $_POST['college'];
$department = $_POST['department'];
$year = $_POST['year'];
$event = $_POST['event'];
$comments = $_POST['comments'];

// Insert into table
$sql = "INSERT INTO registrations (fullname, email, phone, college, department, year, event, comments)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssss", $fullname, $email, $phone, $college, $department, $year, $event, $comments);

if ($stmt->execute()) {
    echo "<h2>Registration Successful!</h2>";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
