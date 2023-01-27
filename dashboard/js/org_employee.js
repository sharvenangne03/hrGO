$("#onboard-new-employee").hide();
$("#employee-verification").hide();


$(document).ready(function() {
	$('#show-onboarding-div').on('click', function() {
        $("#onboard-new-employee").fadeToggle();
    });
});

$(document).ready(function() {
	$('#show-table-div').on('click', function() {
        $("#employee-verification").fadeToggle();
    });
});

function generateP() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
            'abcdefghijklmnopqrstuvwxyz0123456789';
      
    for (i = 1; i <= 9; i++) {
        var char = Math.floor(Math.random()
                    * str.length + 1);
          
        pass += str.charAt(char)
    }
      
    return pass;
}

$(document).ready(function() {
	$('#start-onboard').on('click', function() {

        var empfullname = $('#empfullname').val();
        var empemailaddress = $('#empemailaddress').val();
        var password = generateP();
        var folderid = generateP();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(empfullname == ""){
            $('#alert').html("Employee full name must be filled");
            return false;
        }
        else if (/[^A-Za-z \d]/.test(empfullname)) {
            $('#alert').html("Employee name cannot contain special characters");
            return false;
        }
        else if (empemailaddress == "") {
            $('#alert').html("Employee email address must be filled");
            return false;
        }
        else if (empemailaddress.match(mailformat) === null) { 
            $('#alert').html("Invalid employee email address, valid email format required");
            return false;
        }
        else{
            $('#alert').html("Please wait, while we process your request");
            $.ajax({
                url: "emp_register.php",
                type: "POST",
                data: {	
                    empfullname: empfullname,
                    empemailaddress: empemailaddress,
                    password: password,
                    folderid: folderid
                },
                cache: false,
                success: function(dataResult){
                    var dataResult = JSON.parse(dataResult);
                    if(dataResult.query=="registrationSuccessful"){
                        $('#empfullname').val('');
                        $('#empemailaddress').val('');
                        $('#alert').html("Employee account has been successfully created");
                        return false;
                    }
                    else if(dataResult.query=="emailSentFailed"){
                        $('#alert').html("Failed to create employee account, please try later");
                        return false;
                    }
                    else if(dataResult.query=="registrationUnSuccessful"){
                        $('#alert').html("Failed to create employee account, please try later");
                        return false;
                    }
                    else if(dataResult.query=="duplicateEmpUN"){
                        $('#alert').html("Employee email address is already registered");
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

$(document).ready(function() {
	$('#emp-verify').on('click', function() {

        var empusername = $('#empverification').val();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var query = "check_empusername";

        if (empusername == "") {
            $('#emp-alert').html("Employee username must be filled");
            return false;
        }
        else if (empusername.match(mailformat) === null) { 
            $('#emp-alert').html("Invalid employee username, valid username format required");
            return false;
        }
        else{
            $.ajax({
                url: "emp_verification.php",
                type: "POST",
                data: {	
                    query: query,
                    empusername: empusername
                },
                cache: false,
                success: function(dataResult){
                    var dataResult = JSON.parse(dataResult);
                    if(dataResult.query=="application_complete"){
                        $('#empverification').val('');
                        window.location.href = "verify_employee.php";
                        return false;
                    }
                    else if(dataResult.query=="application_incomplete"){
                        $('#emp-alert').html("Employee application not eligible for verification, please try later");
                        return false;
                    }
                    else if(dataResult.query=="folder_idFailed"){
                        $('#emp-alert').html("Server is currently unreachable, please try later");
                        return false;
                    }
                    else if(dataResult.query=="no_empaccount"){
                        $('#emp-alert').html("Employee username doesnot exists, please verify and try again");
                        return false;
                    }
                    else{
                        $('#emp-alert').html('Failed AJAX');
                        return false;
                    }
                }
            });
        }

    });
});
