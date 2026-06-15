<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include '../includes/db.php';

// Test news query
$news = mysqli_query($conn, "SELECT * FROM news ORDER BY id DESC");
if(!$news){
    echo "News query error: " . mysqli_error($conn) . "<br>";
} else {
    echo "✅ News table OK<br>";
}

// Test posts query
$posts = mysqli_query($conn, "SELECT * FROM posts ORDER BY id DESC");
if(!$posts){
    echo "Posts query error: " . mysqli_error($conn) . "<br>";
    echo "👉 You need to create the posts table first!<br>";
} else {
    echo "✅ Posts table OK<br>";
}

echo "✅ DB connection OK";
?>