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

if(isset($_POST['update'])){

    $title = $_POST['title'];
    $description = $_POST['description'];

    mysqli_query(
        $conn,
        "UPDATE news
        SET title='$title',
        description='$description'
        WHERE id='$id'"
    );

    header("Location: dashboard.php");
    exit();
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Edit News</title>

<style>

body{
    font-family:Arial;
    padding:20px;
}

input,
textarea{
    width:100%;
    padding:10px;
    margin-bottom:15px;
}

button{
    padding:10px 20px;
}

</style>

</head>

<body>

<h1>Edit News</h1>

<form method="POST">

<label>Title</label>

<input
type="text"
name="title"
value="<?php echo $news['title']; ?>"
required>

<label>Description</label>

<textarea
name="description"
rows="8"
required><?php echo $news['description']; ?></textarea>

<button name="update">
Update News
</button>

</form>

</body>
</html>