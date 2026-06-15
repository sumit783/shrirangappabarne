<?php
session_start();
include '../includes/db.php';

if(isset($_POST['login'])){

    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = mysqli_query(
        $conn,
        "SELECT * FROM admins
        WHERE username='$username'
        AND password='$password'"
    );

    if(mysqli_num_rows($query) > 0){

        $_SESSION['admin'] = $username;

        header("Location: dashboard.php");
        exit();

    } else {

        $error = "Invalid Username or Password";

    }
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Admin Login</title>

<style>
body{
    font-family: Arial;
    background:#f5f5f5;
}

.login-box{
    width:350px;
    margin:100px auto;
    background:white;
    padding:30px;
    border-radius:10px;
}

input{
    width:100%;
    padding:10px;
    margin-bottom:15px;
}

button{
    width:100%;
    padding:10px;
}
</style>

</head>
<body>

<div class="login-box">

<h2>Admin Login</h2>

<?php
if(isset($error)){
    echo "<p style='color:red'>$error</p>";
}
?>

<form method="POST">

<input
type="text"
name="username"
placeholder="Username"
required>

<input
type="password"
name="password"
placeholder="Password"
required>

<button name="login">
Login
</button>

</form>

</div>

</body>
</html>