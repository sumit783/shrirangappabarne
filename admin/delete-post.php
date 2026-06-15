<?php
session_start();
if(!isset($_SESSION['admin'])){
    header("Location: login.php");
    exit();
}
include '../includes/db.php';

$id = intval($_GET['id']);

// Optional: delete image file too
$result = mysqli_query($conn, "SELECT image FROM posts WHERE id='$id'");
$post = mysqli_fetch_assoc($result);

if($post && $post['image']){
    $imagePath = "../uploads/posts/" . $post['image'];
    if(file_exists($imagePath)){
        unlink($imagePath); // delete image from server
    }
}

mysqli_query($conn, "DELETE FROM posts WHERE id='$id'");

header("Location: dashboard.php");
exit();
?>