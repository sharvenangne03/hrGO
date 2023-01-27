// Verify verification OTP
$(document).ready(function() {
	$('#verifyemail').on('click', function() {

            var orgemailaddress_otp = $('#orgemailaddress_otp').val();
            var orgadminemailaddress_otp = $('#orgadminemailaddress_otp').val();

            if (orgemailaddress_otp === ""){
                $('#alert').html('Verification OTP for organization email address must be filled');
                return false;
            }
            else if (orgadminemailaddress_otp === ""){
                $('#alert').html('Verification OTP for organization admin email address must be filled');
                return false;
            }
            else if (/[^A-Za-z\d]/.test(orgemailaddress_otp)){
                $('#alert').html('Verification OTP cannot contain special characters');
                return false;
            }
            else if (/[^A-Za-z\d]/.test(orgadminemailaddress_otp)){
                $('#alert').html('Verification OTP cannot contain special characters');
                return false;
            }
            else if (orgemailaddress_otp === orgadminemailaddress_otp){
                $('#alert').html('Verification OTP cannot be same for both email address');
                return false;
            }
            else{
                $.ajax({
                    url: "otp_verify.php",
                    type: "POST",
                    data: {	
                        orgemailaddress_otp: orgemailaddress_otp,
                        orgadminemailaddress_otp: orgadminemailaddress_otp 
                    },
                    cache: false,
                    success: function(dataResult){
                        var dataResult = JSON.parse(dataResult);
                        if(dataResult.query=="otpMatched"){
                            $('#orgemailaddress_otp').val('');
                            $('#orgadminemailaddress_otp').val('');
                            $('#alert').html("");
                            window.location.href = "orgDetails.php";
                        }
                        else if(dataResult.query=="otpNotMatched"){
                            $('#alert').html("Invalid OTP entered, please verify and try again");
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
    var x = document.getElementById("orgemailaddress_otp");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
} 

// View verification OTP for organization admin email address 
function myFunction2() {
    var x = document.getElementById("orgadminemailaddress_otp");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
} 

// Function to generate OTP
function generateOTP() {
          
    // Declare a string variable 
    // which stores all string
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
      
    // Find the length of string
    var len = string.length;
    for (let i = 0; i < 6; i++ ) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
}

// Receive verification OTP
var count = 1;
var limit = 2;
var fewSeconds = 180;

$(document).ready(function() {
	$('#receiveOtp').on('click', function() {
        $('#alert').html("Please wait, while we process your request");
    var x = count++;
    var y = limit--;
    var otp_first = generateOTP();
    var otp_second = generateOTP();

if(x <= 3){
    var btn = $(this);
    btn.prop('disabled', true);
    
    $.ajax({
        url: "otp_sendmail.php",
        type: "POST",
        data: {	
            otp_first: otp_first,
            otp_second: otp_second
        },
        cache: false,
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.query=="emailSentSuccessfully"){
                $('#alert').html("OTP has been sent successfully<br>Didn't receive verification OTP ? Click on Receive Verification OTP again after 3 minutes<br>Attempt left - " + y);
                return false;
            }
            else if(dataResult.query=="emailSentFailed"){
                $('#alert').html("Failed to sent OTP");
                return false;
            }
            else if(dataResult.query=="insertQueryFailed"){
                $('#alert').html("SQL insert query failed");
                return false;
            }
            else if(dataResult.query=="selectQueryFailed"){
                $('#alert').html("SQL select query failed");
                return false;
            }
            else{
                $('#alert').html('Failed AJAX');
                return false;
            }
        }
    });
    setTimeout(function(){
        btn.prop('disabled', false);
    }, fewSeconds*1000);
}
else{
    var btn = $(this);
    btn.prop('disabled', true);
    $("#verifyemail").prop('disabled', true);
    $('#alert').html("Maximum OTP resend limit of 3 reached, if you still haven't received the OTP please click on Cancel Verification Process and try again");
    }
});
});

