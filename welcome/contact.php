<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/contact.css">
    <title>HrGO - Contact Page</title>
</head>
<body>
    
  <!-- include header started -->
  <?php include 'header.html' ?>
  <!-- include header completed -->

  <h1 class="display-5" style="padding-top: 100px; text-align: center;">Contact Page</h1>

  <!-- Wrapper container -->
<div class="container py-4">

<!-- Bootstrap 5 starter form -->
<form class="spacing">

  <!-- Name input -->
  <div class="mb-3">
    <label class="form-label" for="name">Name</label>
    <input class="form-control" id="name" type="text" placeholder="Name" data-sb-validations="required" />
    <div class="invalid-feedback" data-sb-feedback="name:required">Name is required.</div>
  </div>

  <!-- Email address input -->
  <div class="mb-3">
    <label class="form-label" for="emailAddress">Email Address</label>
    <input class="form-control" id="emailAddress" type="email" placeholder="Email Address" data-sb-validations="required, email" />
    <div class="invalid-feedback" data-sb-feedback="emailAddress:required">Email Address is required.</div>
    <div class="invalid-feedback" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
  </div>

  <!-- Message input -->
  <div class="mb-3">
    <label class="form-label" for="message">Message</label>
    <textarea class="form-control" id="message" type="text" placeholder="Message" style="height: 10rem;" data-sb-validations="required"></textarea>
    <div class="invalid-feedback" data-sb-feedback="message:required">Message is required.</div>
  </div>

  <button class="btn btn-primary" style="padding-left: 25px; padding-right: 25px;">Submit</button>

</form>

</div>
  
  <!-- include footer started -->
  <?php include 'footer.html' ?>
  <!-- include footer completed -->

</body>
</html>