// Function to generate OTP
function generateOTP() {
          
    // Declare a string variable 
    // which stores all string
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
      
    // Find the length of string
    var len = string.length;
    for (let i = 0; i < 8; i++ ) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
}

$(document).ready(function() {
	$('#registerOrg').on('click', function() {

    let orgname = $('#orgname').val();
    let orgadminfullname = $('#orgadminfullname').val();
    let password = $('#password').val();
    let confirmpassword = $('#confirmpassword').val();
    let orgUniqueID = generateOTP();
    
        if (orgname == "") {
            $('#alert').html("Organization name must be filled");
            return false;
        }
        else if (/[^A-Za-z \d]/.test(orgname)) {
            $('#alert').html("Organization name cannot contain special characters");
            return false;
        }
        else if (orgadminfullname == "") {
            $('#alert').html("Organization administrator name must be filled");
            return false;
        }
        else if (/[^A-Za-z \d]/.test(orgadminfullname)) {
            $('#alert').html("Organization administrator name cannot contain special characters");
            return false;
        }
        else if (password.length < 8) {
            $('#alert').html("Password must be of 8 characters atleast");
            return false;
        }
        else if (confirmpassword.length < 8) {
            $('#alert').html("Password confirmation must be of 8 characters atleast");
            return false;
        }
        else if (password !== confirmpassword) {
            $('#alert').html("Password confirmation failed");
            return false;
        }else{
            $('#alert').html("Please wait, while we process your request");
            $.ajax({
                url: "registerOrg.php",
                type: "POST",
                data: {	
                    orgUniqueID: orgUniqueID,
                    orgname: orgname,
                    orgadminfullname: orgadminfullname, 
                    password: password
                },
                cache: false,
                success: function(dataResult){
                    var dataResult = JSON.parse(dataResult);
                    if(dataResult.query=="registrationSuccessful"){
                        $('#orgname').val('');
                        $('#orgadminfullname').val('');
                        $('#password').val('');
                        $('#confirmpassword').val('');
                        $('#alert').html("");
                        window.location.href = "../dashboard/orgDashboard.php";
                    }
                    else if(dataResult.query=="registrationUnsuccessful"){
                        $('#alert').html("Failed to register organization");
                        return false;
                    }
                    else if(dataResult.query=="selectQueryFailed"){
                        $('#alert').html("Registration has failed, please click on Cancel Registration Process and try again");
                        return false;
                    }
                    else if(dataResult.query=="emailSentFailed"){
                        $('#alert').html("Failed to sent email");
                        return false;
                    }
                    else{
                        $('#alert').html('Failed AJAX');
                        return false;
                    }
                }
            });
        }
    });
});

// View verification OTP for organization email address 
function myFunction() {
    var x = document.getElementById("password");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
} 

// View verification OTP for organization admin email address 
function myFunction2() {
    var x = document.getElementById("confirmpassword");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
} 