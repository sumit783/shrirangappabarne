<?php

session_start();

if(!isset($_SESSION['admin'])){
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

$id = $_GET['id'];

$getNews = mysqli_query(
    $conn,
    "SELECT * FROM news WHERE id='$id'"
);

$news = mysqli_fetch_assoc($getNews);

if($news && !empty($news['image'])){
    @unlink("../uploads/news/".$news['image']);
}

mysqli_query(
    $conn,
    "DELETE FROM news WHERE id='$id'"
);

header("Location: dashboard.php");
exit();

?>