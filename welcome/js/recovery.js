$("#empTab").hide();

$(document).ready(function() {
	$('#organization').on('click', function() {
        $("#empTab").hide();
        $("#orgTab").fadeIn();
        $("#orgRecover").fadeIn();
    });
});

$(document).ready(function() {
	$('#employee').on('click', function() {
        $("#orgTab").hide();
        $("#empTab").fadeIn();
        $("#empRecover").fadeIn();
    });
});

function generateP() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';
      
    for (i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
                    * str.length + 1);
          
        pass += str.charAt(char)
    }
      
    return pass;
}

$(document).ready(function() {
	$('#orgRecover').on('click', function() {
        var orguqid = $('#orguqid').val();
        var type = 'orgRecover';
        var password = generateP();

        if (orguqid.length < 8) {
            document.getElementById("orgAlert").innerHTML = "Organization unique ID must be of 8 characters atleast.";
            return false;
        }
        else if(/[^A-Za-z\d]/.test(orguqid)){
            document.getElementById("orgAlert").innerHTML = "Organization unique ID cannot contain special characters";
            return false;
        }
        else{
            $('#orgAlert').html("Please wait, while we process your request");
            $.ajax({
                url: "recovery_mail.php",
                type: "POST",
                data: {	
                    type: type,
                    orguqid: orguqid,
                    password: password
                },
                cache: false,
                success: function(dataResult){
                    var dataResult = JSON.parse(dataResult);
                    if(dataResult.query=="credentialsRecovered"){
                        $('#orguqid').val();
                        $('#orgAlert').html("Recovery email has been sent on your registered email address");
                        return false;
                    }
                    else if(dataResult.query=="credentialsrecoveryFailed"){
                        $('#orgAlert').html("Failed to sent recovery email, please try later");
                        return false;
                    }
                    else if(dataResult.query=="orquqidNotFound"){
                        $('#orgAlert').html("Invalid organization unique ID, please verify and try again");
                        return false;
                    }
                    else if(dataResult.query=="postFailed"){
                        $('#orgAlert').html("Server down, please try later");
                        return false;
                    }
                    else if(dataResult.query=="temppassupdateFailed"){
                        $('#empAlert').html("Server down, please try later");
                        return false;
                    }
                    else{
                        $('#orgAlert').html('Failed AJAX');
                        return false;
                    }
                }
            });
        }
    });
});

$(document).ready(function() {
	$('#empRecover').on('click', function() {
        var empusername = $('#empusername').val();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var type = 'empRecover';
        var password = generateP();

        if (empusername == "") {
            document.getElementById("empAlert").innerHTML = "Employee username must be filled.";
            return false;
        }
        else if(empusername.match(mailformat) === null){
            document.getElementById("empAlert").innerHTML = "Invalid employee username format, email format required.";
            return false;
        }
        else{
            $('#empAlert').html("Please wait, while we process your request");
            $.ajax({
                url: "recovery_mail.php",
                type: "POST",
                data: {	
                    type: type,
                    empusername: empusername,
                    password: password
                },
                cache: false,
                success: function(dataResult){
                    var dataResult = JSON.parse(dataResult);
                    if(dataResult.query=="credentialsRecovered"){
                        $('#empusername').val('');
                        $('#empAlert').html("Recovery email has been sent on your registered email address");
                        return false;
                    }
                    else if(dataResult.query=="credentialsrecoveryFailed"){
                        $('#empAlert').html("Failed to sent recovery email, please try later");
                        return false;
                    }
                    else if(dataResult.query=="empusernameNotFound"){
                        $('#empAlert').html("Invalid employee username, please verify and try again");
                        return false;
                    }
                    else if(dataResult.query=="postFailed"){
                        $('#empAlert').html("Server down, please try later");
                        return false;
                    }
                    else if(dataResult.query=="temppassupdateFailed"){
                        $('#empAlert').html("Server down, please try later");
                        return false;
                    }
                    else{
                        $('#empAlert').html('Failed AJAX');
                        return false;
                    }
                }
            });
        }
    });
});