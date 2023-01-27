<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/empDashboard.css">
    <title>HrGO - Employee Dashboard</title>

</head>
<body> 

    <!-- include header started -->
    <?php
    include('templates/empheader_loggedIn.html')
    ?>
    <!-- include header completed -->

    <!-- dashboard form started -->
    <h1 class="heading">Employee Dashboard</h1>
    <form class="spacing">
        <br>
        <p>
            <img src="images/dashboard/notification.png" alt="notification-logo" height="45px" width="45px">
            <span style="font-size: 25px; color: red;">Notifications</span>
        </p>     
    </form>
    <!-- dashboard form completed -->
    
</body>
</html>
