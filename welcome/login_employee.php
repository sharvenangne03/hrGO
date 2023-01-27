<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <!-- include CSS -->
  <link rel="stylesheet" href="css/registerLogin.css">
  <title>HrGO - Employee Login</title>
</head>
<body>

  <!-- include header started -->
  <?php include 'header_loggedOut.html' ?>
  <!-- include header completed -->

  <!-- employee login form started -->
<h1 class="display-4">Employee Login</h1>
<p id="alert"></p>
<form class="spacing" id="emploginform" method="post">
  <br>
  <div class="form-group">
    <label for="empusername">Employee Username</label>
    <input type="text" class="form-control" id="empusername" placeholder="Enter employee username">
    <small class="form-text text-muted">Provide registered email address as username</small>
  </div><br>
  <div class="form-group">
    <label for="orguqid">Organization Unique ID</label>
    <input type="text" class="form-control" id="orguqid" placeholder="Enter organization unique ID">
    <small class="form-text text-muted">Provide unique id received from organization</small>
  </div><br>
  <div class="form-group">
    <label for="emppassword">Password</label>
    <input type="password" class="form-control" id="emppassword" placeholder="Enter password">
    <small>
    <input class="form-check-input" type="checkbox" id="viewpassword" onclick="myFunction()">
    <label class="form-check-label" for="viewpassword">View Password</label>
    </small>
  </div>
  <br>
  <button type="button" class="btn btn-success" id="register">Employee Login</button>
  <br><br>
</form>
  <!-- employee login form completed -->

  <!-- form validation started -->
  <script src="js/emploginValidation.js"></script>
  <!-- form validation completed -->

</body>
</html>
