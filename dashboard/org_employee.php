<?php
include '../welcome/database.php';
session_start();
if(!isset($_SESSION['orgLogin'])){
    header("Location: ../welcome/unauthorized.php");
    exit();
}

$orguqid = $_SESSION['orguqid'];
$application = mysqli_query($conn,"select * from employee where org_unique_id = '$orguqid' ");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/org_Employee.css">
    <title>HrGO - Employee Services</title>
</head>
<body>
    
    <!-- include header started -->
    <?php
    include('templates/orgheader_loggedIn.html')
    ?>
    <!-- include header completed -->

    <!-- employee services form started -->
    <p class="emp-heading">Employee Services</p>
    <form class="spacing" method="post" id="new-employee">
        <br>
        <div>
            <img src="images/services/onboarding.png" alt="show-menu" height="40px">
                &nbsp;
            <p style="font-size: 20px; display: inline;">New Onboarding</p>
                &nbsp;
            <a href="javascript:void(0)" id="show-onboarding-div">
                <img src="images/services/downward-arrow.png" alt="show-menu" height="25px">
            </a>
        </div>
        <div class="form-group" id="onboard-new-employee">
            <p id="alert"></p>
            <label for="empfullname">Employee Full Name</label>
            <input type="text" class="form-control" id="empfullname" placeholder="Enter employee full name">
            <label for="empemailaddress" style="padding-top: 8px;">Employee Email Address</label>
            <input type="text" class="form-control" id="empemailaddress" placeholder="Enter employee email address">
            <small class="form-text text-muted">This will be used as employee username</small><br>
            <button type="button" class="btn btn-success btn-sm" id="start-onboard">Start Onboarding</button>
        </div>

        <div class="application-list">
            <img src="images/services/application.png" alt="show-menu" height="40px">
                &nbsp;
            <p style="font-size: 20px; display: inline;">Applications</p>
            &nbsp;
            <a href="javascript:void(0)" id="show-table-div">
                <img src="images/services/downward-arrow.png" alt="show-menu" height="25px">
            </a>
        </div>
        <div class="form-group" id="employee-verification">
            <p id="emp-alert"></p>
            <label for="empverification">Employee Verification</label>
            <input type="text" class="form-control" id="empverification" placeholder="Enter employee username">
            <small class="form-text text-muted">Start employee verification by providing employee username</small><br>
            <button type="button" class="btn btn-success btn-sm" id="emp-verify">Start Verification</button>
            <p style="text-align: center; margin-top: 10px; font-size: 18px;">Employee Username Records</p>

            <?php

                if (mysqli_affected_rows($conn) > 0){
                    echo "<table class='table'>
                    <thead>
                        <tr>
                        <th scope='col'>Employee Fullname</th>
                        <th scope='col'>Employee Username</th>
                        </tr>
                    </thead>";

                            while ($result = mysqli_fetch_array($application)) {
                                
                                echo "<tbody>";
                                echo "<tr><td>".($result['emp_fullname'])."</td>";
                                echo "<td>".($result['emp_username'])."</td></tr>";
                                echo "</tbody>";
                                
                            }

                    echo "</table>";
                }else{
                    echo "<p style='text-align: center; color: red;'> No employee exists, please start onboarding to continue</p>";
                }
                
            ?>
        </div>
        
    </form>
    <!-- employee services form completed -->

    <!-- form validation started -->
    <script src="js/org_employee.js"></script>
    <!-- form validation completed -->

</body>
</html>
