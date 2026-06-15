<?php
session_start();
if(!isset($_SESSION['admin'])){
    header("Location: login.php");
    exit();
}
include '../includes/db.php';

$success = "";

if(isset($_POST['publish'])){
    // Sanitize inputs to prevent SQL injection & quote-breaking errors
    $title       = mysqli_real_escape_string($conn, $_POST['title']);
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    $news_date   = mysqli_real_escape_string($conn, $_POST['news_date']);

    $imageName = basename($_FILES['image']['name']); // basename() prevents path traversal
    $tmpName   = $_FILES['image']['tmp_name'];
    $uploadPath = "../uploads/news/" . $imageName;

    if(move_uploaded_file($tmpName, $uploadPath)){
        $query = mysqli_query(
            $conn,
            "INSERT INTO news(title, description, image, news_date)
             VALUES('$title', '$description', '$imageName', '$news_date')"
        );

        if($query){
            $success = "News Published Successfully!";
        } else {
            $success = "DB Error: " . mysqli_error($conn); // shows exact error
        }
    } else {
        $success = "Image upload failed.";
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Add News</title></head>
<body>
<h1>Add News</h1>

<?php if($success): ?>
    <p style="color:green;"><?php echo $success; ?></p>
<?php endif; ?>

<form method="POST" enctype="multipart/form-data">
    <p>Title</p>
    <input type="text" name="title" required>
    <br><br>
    <p>Description</p>
    <textarea name="description" rows="8" cols="50" required></textarea>
    <br><br>
    <p>News Date</p>
    <input type="date" name="news_date" required>
    <p>Image</p>
    <input type="file" name="image" accept="image/*" required>
    <br><br>
    <button name="publish">Publish News</button>
</form>
</body>
</html>