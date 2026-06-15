<?php
session_start();
if(!isset($_SESSION['admin'])){
    header("Location: login.php");
    exit();
}
include '../includes/db.php';

$id = intval($_GET['id']);
$success = "";

// Fetch existing post
$result = mysqli_query($conn, "SELECT * FROM posts WHERE id='$id'");
$post = mysqli_fetch_assoc($result);

if(!$post){
    echo "Post not found.";
    exit();
}

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

if(isset($_POST['update'])){
    $category  = mysqli_real_escape_string($conn, $_POST['category']);
    $caption   = mysqli_real_escape_string($conn, $_POST['caption']);
    $post_date = mysqli_real_escape_string($conn, $_POST['post_date']);
    $url       = mysqli_real_escape_string($conn, $_POST['url']);
    $imageName = $post['image']; // keep old image by default

    // If new image uploaded, replace it
    if(!empty($_FILES['image']['name'])){
        $imageName = basename($_FILES['image']['name']);
        move_uploaded_file($_FILES['image']['tmp_name'], "../uploads/posts/" . $imageName);
    }

    $query = mysqli_query($conn,
        "UPDATE posts SET
            category='$category',
            caption='$caption',
            image='$imageName',
            post_date='$post_date',
            url='$url'
         WHERE id='$id'"
    );

    if($query){
        $success = "✅ Post Updated Successfully!";
        // Refresh post data
        $result = mysqli_query($conn, "SELECT * FROM posts WHERE id='$id'");
        $post = mysqli_fetch_assoc($result);
    } else {
        $success = "❌ Error: " . mysqli_error($conn);
    }
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Edit Post</title>
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
    background: #fd7e14; color: white;
    border: none; border-radius: 5px;
    cursor: pointer; font-size: 16px;
}
.back { color: #007bff; text-decoration: none; }
.success { color: green; margin-top: 10px; font-weight: bold; }
.current-img { margin-top: 8px; max-width: 200px; border-radius: 5px; }
</style>
</head>
<body>
<a href="dashboard.php" class="back">← Back to Dashboard</a>
<h1>✏️ Edit Post #<?php echo $id; ?></h1>

<?php if($success): ?>
    <p class="success"><?php echo $success; ?></p>
<?php endif; ?>

<form method="POST" enctype="multipart/form-data">

    <label>Category / श्रेणी</label>
    <select name="category" required>
        <?php foreach($categories as $cat): ?>
            <option value="<?php echo $cat; ?>"
                <?php echo ($post['category'] == $cat) ? 'selected' : ''; ?>>
                <?php echo $cat; ?>
            </option>
        <?php endforeach; ?>
    </select>

    <label>Caption / Description</label>
    <textarea name="caption" required><?php echo htmlspecialchars($post['caption']); ?></textarea>

    <label>Post Date</label>
    <input type="date" name="post_date"
           value="<?php echo $post['post_date']; ?>" required>

    <label>Instagram / Post URL (optional)</label>
    <input type="url" name="url"
           value="<?php echo htmlspecialchars($post['url']); ?>"
           placeholder="https://www.instagram.com/...">

    <label>Image (leave empty to keep current)</label>
    <?php if($post['image']): ?>
        <br><img src="../uploads/posts/<?php echo $post['image']; ?>"
                 class="current-img" alt="Current Image">
    <?php endif; ?>
    <input type="file" name="image" accept="image/*">

    <button type="submit" name="update" class="btn">💾 Update Post</button>
</form>
</body>
</html>