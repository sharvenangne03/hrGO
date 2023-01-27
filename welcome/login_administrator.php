<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <!-- include CSS -->
  <link rel="stylesheet" href="css/registerLogin.css">
  <title>HrGO - Organization Login</title>
</head>
<body>

  <!-- include header started -->
  <?php include 'header_loggedOut.html' ?>
  <!-- include header completed -->

  <!-- organization login form started -->
<h1 class="display-4">Organization Login</h1>
<p id="alert"></p>
<form class="spacing" id="orgloginform" method="post" onsubmit="return validateForm()">
  <br>
  <div class="form-group">
    <label for="orguqid">Organization Unique ID</label>
    <input type="text" class="form-control" id="orguqid" placeholder="Enter organization unique ID">
    <small class="form-text text-muted">Provide unique id received on organization registration</small>
  </div><br>
  <div class="form-group">
    <label for="orgusername">Organization Username</label>
    <input type="text" class="form-control" id="orgusername" aria-describedby="emailHelp" placeholder="Enter organization username">
    <small class="form-text text-muted">Provide registered email address as username</small>
  </div><br>
  <div class="form-group">
    <label for="orgadminusername">Organization Adminstrator Username</label>
    <input type="text" class="form-control" id="orgadminusername" aria-describedby="emailHelp" placeholder="Enter organization adminstrator username">
    <small class="form-text text-muted">Provide registered email address as username</small>
  </div><br>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" id="password" placeholder="Enter password">
    <small>
    <input class="form-check-input" type="checkbox" id="viewpassword" onclick="myFunction()">
    <label class="form-check-label" for="viewpassword">View Password</label>
    </small>
  </div><br>
  <button type="button" class="btn btn-success orgemp-login-bottom" id="register">Organization Login</button>
  <br><br />
</form>
  <!--  organization login form completed -->

  <!-- form validation started -->
  <script src="js/orgloginValidation.js"></script>
  <!-- form validation completed -->
</body>
</html>
