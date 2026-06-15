<?php

$servername = "localhost";
$username = "website_admin";
$password = "Shubham@224";
$database = "website_news";

$conn = mysqli_connect(
    $servername,
    $username,
    $password,
    $database
);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>