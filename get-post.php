<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include 'includes/db.php';

$category = isset($_GET['category']) ? mysqli_real_escape_string($conn, $_GET['category']) : '';

if($category) {
    $result = mysqli_query($conn,
        "SELECT * FROM posts WHERE category='$category' ORDER BY created_at DESC"
    );
} else {
    $result = mysqli_query($conn,
        "SELECT * FROM posts ORDER BY created_at DESC LIMIT 20"
    );
}

$posts = [];
while($row = mysqli_fetch_assoc($result)){
    $posts[] = $row;
}

echo json_encode($posts);
?>