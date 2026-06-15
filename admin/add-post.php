<?php
session_start();
if(!isset($_SESSION['admin'])){
    header("Location: login.php");
    exit();
}
include '../includes/db.php';

$success = "";
$categories = [
    "संसदीय समित्यांची सदस्यता – राजभाषा",
    "संसदीय समित्यांची सदस्यता – ऊर्जा स्थायी समिती",
    "पायाभूत सुविधा सुधारणा",
    "शैक्षणिक सहाय्य",
    "सण-उत्सव व धार्मिक कार्यक्रम",
    "संसद रत्न पुरस्कार",
    "दैनंदिन कार्य व लोकसंपर्क",
    "जनकल्याण व सामाजिक उपक्रम",
    "पक्ष बांधणी व राजकीय उपक्रम",
    "समाज व सांस्कृतिक कार्यक्रम",
    "राजकारण व शासन",
    "संसदीय"
];

if(isset($_POST['publish'])){
    $category  = mysqli_real_escape_string($conn, $_POST['category']);
    $caption   = mysqli_real_escape_string($conn, $_POST['caption']);
    $post_date = mysqli_real_escape_string($conn, $_POST['post_date']);
    $url       = mysqli_real_escape_string($conn, $_POST['url']);
    $imageName = "";

    if(!empty($_FILES['image']['name'])){
        $imageName = basename($_FILES['image']['name']);
        move_uploaded_file($_FILES['image']['tmp_name'], "../uploads/posts/" . $imageName);
    }

    $query = mysqli_query($conn,
        "INSERT INTO posts(category,caption,image,post_date,url)
         VALUES('$category','$caption','$imageName','$post_date','$url')"
    );

    if($query){
        $success = "✅ Post Published Successfully!";
    } else {
        $success = "❌ Error: " . mysqli_error($conn);
    }
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Add Post</title>
<style>
body { font-family: Arial; padding: 20px; max-width: 700px; }
label { display: block; margin-top: 15px; font-weight: bold; }
input, textarea, select {
    width: 100%; padding: 10px; margin-top: 5px;
    border: 1px solid #ccc; border-radius: 5px;
    box-sizing: border-box; font-size: 14px;
}
textarea { height: 180px; resize: vertical; }
.btn {
    margin-top: 20px; padding: 10px 20px;
    background: #28a745; color: white;
    border: none; border-radius: 5px;
    cursor: pointer; font-size: 16px;
}
.back { color: #007bff; text-decoration: none; }
.success { color: green; margin-top: 10px; font-weight: bold; }
</style>
</head>
<body>
<a href="dashboard.php" class="back">← Back to Dashboard</a>
<h1>📝 Add New Post</h1>

<?php if($success): ?>
    <p class="success"><?php echo $success; ?></p>
<?php endif; ?>

<form method="POST" enctype="multipart/form-data">

    <label>Category / श्रेणी</label>
    <select name="category" required>
        <option value="">-- Select Category --</option>
        <?php foreach($categories as $cat): ?>
            <option value="<?php echo $cat; ?>"><?php echo $cat; ?></option>
        <?php endforeach; ?>
    </select>

    <label>Caption / Description</label>
    <textarea name="caption" required placeholder="Post description in Marathi..."></textarea>

    <label>Post Date</label>
    <input type="date" name="post_date" required>

    <label>Instagram / Post URL (optional)</label>
    <input type="url" name="url" placeholder="https://www.instagram.com/...">

    <label>Image (optional)</label>
    <input type="file" name="image" accept="image/*">

    <button type="submit" name="publish" class="btn">🚀 Publish Post</button>
</form>
</body>
</html>