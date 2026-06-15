<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'includes/db.php';

// Sanitize the GET parameter to prevent SQL injection
$id = mysqli_real_escape_string($conn, $_GET['id']);

$result = mysqli_query($conn, "SELECT * FROM news WHERE id='$id'");
$news = mysqli_fetch_assoc($result);

if(!$news){
    echo "News not found.";
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
<title><?php echo htmlspecialchars($news['title']); ?></title>
</head>
<body>
<img src="uploads/news/<?php echo htmlspecialchars($news['image']); ?>" width="600">
<h1><?php echo htmlspecialchars($news['title']); ?></h1>
<p><?php echo date('d-m-Y', strtotime($news['news_date'])); ?></p>
<p><?php echo nl2br(htmlspecialchars($news['description'])); ?></p>
</body>
</html>