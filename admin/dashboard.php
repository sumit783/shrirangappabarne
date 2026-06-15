<?php
session_start();
if(!isset($_SESSION['admin'])){
    header("Location: login.php");
    exit();
}
include '../includes/db.php';

$news = mysqli_query($conn, "SELECT * FROM news ORDER BY id DESC");
$posts = mysqli_query($conn, "SELECT * FROM posts ORDER BY id DESC");
?>
<!DOCTYPE html>
<html>
<head>
<title>Admin Dashboard</title>
<style>
body { font-family: Arial; padding: 20px; }
table { width: 100%; border-collapse: collapse; margin-top: 20px; }
th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
.btn {
    padding: 10px 15px; background: #007bff;
    color: white; text-decoration: none;
    border-radius: 5px; margin-right: 5px;
}
.btn-green { background: #28a745; }
.btn-red { background: #dc3545; }
.btn-orange { background: #fd7e14; }
h2 { margin-top: 40px; border-bottom: 2px solid #ddd; padding-bottom: 8px; }
.badge {
    padding: 3px 8px; border-radius: 10px;
    background: #e9ecef; font-size: 12px;
}
</style>
</head>
<body>

<h1>Admin Dashboard</h1>

<!-- TOP BUTTONS -->
<a href="add-news.php" class="btn">➕ Add News</a>
<a href="add-post.php" class="btn btn-green">📝 Add Post</a>
<a href="logout.php" class="btn btn-red">🚪 Logout</a>

<!-- NEWS TABLE -->
<h2>📰 News List</h2>
<table>
<tr>
    <th>ID</th>
    <th>Title</th>
    <th>Date</th>
    <th>Action</th>
</tr>
<?php while($row = mysqli_fetch_assoc($news)){ ?>
<tr>
    <td><?php echo $row['id']; ?></td>
    <td><?php echo htmlspecialchars($row['title']); ?></td>
    <td><?php echo $row['created_at']; ?></td>
    <td>
        <a href="edit-news.php?id=<?php echo $row['id']; ?>" class="btn">✏️ Edit</a>
        <a href="delete-news.php?id=<?php echo $row['id']; ?>"
           onclick="return confirm('Delete this news?')" class="btn btn-red">🗑 Delete</a>
    </td>
</tr>
<?php } ?>
</table>

<!-- POSTS TABLE -->
<h2>📝 Posts List</h2>
<table>
<tr>
    <th>ID</th>
    <th>Category</th>
    <th>Caption (Preview)</th>
    <th>Date</th>
    <th>Action</th>
</tr>
<?php while($row = mysqli_fetch_assoc($posts)){ ?>
<tr>
    <td><?php echo $row['id']; ?></td>
    <td><span class="badge"><?php echo htmlspecialchars($row['category']); ?></span></td>
    <td><?php echo htmlspecialchars(substr($row['caption'], 0, 80)); ?>...</td>
    <td><?php echo $row['post_date']; ?></td>
    <td>
        <a href="edit-post.php?id=<?php echo $row['id']; ?>" class="btn btn-orange">✏️ Edit</a>
        <a href="delete-post.php?id=<?php echo $row['id']; ?>"
           onclick="return confirm('Delete this post?')" class="btn btn-red">🗑 Delete</a>
    </td>
</tr>
<?php } ?>
</table>

</body>
</html>