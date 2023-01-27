$(document).ready(function() {
	$('#register').on('click', function() {

		var orgemailaddress = $('#orgemailaddress').val();
		var orgadminemailaddress = $('#orgadminemailaddress').val();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var type = 'emailValidation';

        if (orgemailaddress == "") {
            $('#alert').html("Organization email address must be filled");
            return false;
        } else if (orgemailaddress.match(mailformat) === null) { 
            $('#alert').html("Invalid organization email address, valid email format required");
            return false;
        } else if (orgadminemailaddress == "") {
            $('#alert').html("Organization admin email address must be filled");
        } else if (orgadminemailaddress.match(mailformat) === null) {
            $('#alert').html("Invalid organization admin email address, valid email format required");
            return false;
        } else if(orgemailaddress === orgadminemailaddress){
            $('#alert').html("Organization and organization admin email address cannot be same");
            return false;
        } else{
            $.ajax({
				url: "authentication.php",
				type: "POST",
				data: {
					type: type,
					orgemailaddress: orgemailaddress,
                    orgadminemailaddress: orgadminemailaddress				
				},
				cache: false,
				success: function(dataResult){
					var dataResult = JSON.parse(dataResult);
					if(dataResult.statusCode==200){
                        $('#orgemailaddress').val('');
		                $('#orgadminemailaddress').val('');
                        window.location.href = "otpverification.php";
					}
					else if(dataResult.statusCode==201 && dataResult.emailType=="org_username"){
						$('#alert').html("Organization email address is already registered");
                        return false;
					}
                    else if(dataResult.statusCode==201 && dataResult.emailType=="org_admin_username"){
                        $('#alert').html("Organization admin email address is already registered");
                        return false;
                    }
					else{
                        $('#alert').html("Failed");
                        return false;
                    }
				}
			});
        }	
    });
});

