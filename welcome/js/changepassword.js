$(document).ready(function() {
	$('#changePassword').on('click', function() {

        var oldpassword = $('#oldpassword').val();
        var newpassword = $('#newpassword').val();
        var confirmpassword = $('#confirmpassword').val();

        if (oldpassword.length < 8) {
            $('#alert').html("Temporary password must be of 8 characters atleast");
            return false;
        } else if (newpassword.length < 8) {
            $('#alert').html("New password must be of 8 characters atleast");
            return false;
        } else if (confirmpassword.length < 8) {
            $('#alert').html("Password confirmation must be of 8 characters atleast");
            return false;
        }else if (newpassword !== confirmpassword) {
            $('#alert').html("Password confirmation failed");
            return false;
        }else if (newpassword === oldpassword){
            $('#alert').html("Temporary password and new password cannot be same");
        }else{
            $.ajax({
                url: "passwordAuthenticate.php",
                type: "POST",
                data: {	
                    oldpassword: oldpassword,
                    newpassword: newpassword
                },
                cache: false,
                success: function(dataResult){
                    var dataResult = JSON.parse(dataResult);
                    if(dataResult.query=="newpasswordUpdated"){
                        $('#alert').html("");
                        $('#oldpassword').val('');
                        $('#newpassword').val('');
                        $('#confirmpassword').val('');
                        window.location.href = "../dashboard/empDashboard.php";
                    }
                    else if(dataResult.query=="newpasswordUpdateFailed"){
                        $('#alert').html("Failed updating new password");
                        return false;
                    }
                    else if(dataResult.query=="oldpassWrong"){
                        $('#alert').html("Invalid old password, please verify and try again");
                        return false;
                    }
                    else if(dataResult.query=="selectQueryFailed"){
                        $('#alert').html("Select query failed");
                        return false;
                    }
                    else if(dataResult.query=="org_newpasswordUpdated"){
                        $('#alert').html("");
                        $('#oldpassword').val('');
                        $('#newpassword').val('');
                        $('#confirmpassword').val('');
                        window.location.href = "../dashboard/orgDashboard.php";
                    }
                    else if(dataResult.query=="org_newpasswordUpdateFailed"){
                        $('#alert').html("Failed updating new password");
                        return false;
                    }
                    else if(dataResult.query=="org_oldpassWrong"){
                        $('#alert').html("Invalid old password, please verify and try again");
                        return false;
                    }
                    else if(dataResult.query=="org_selectQueryFailed"){
                        $('#alert').html("Select query failed");
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

// view password

function myFunction() {
    var x = document.getElementById("oldpassword");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
} 

function myFunction1() {
    var x = document.getElementById("newpassword");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
} 

function myFunction2() {
    var x = document.getElementById("confirmpassword");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
} 