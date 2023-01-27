$(document).ready(function() {
	$('#register').on('click', function() {

    let orguqid = document.forms["orgloginform"]["orguqid"].value;
    let orgusername = document.forms["orgloginform"]["orgusername"].value;
    let orgadminusername = document.forms["orgloginform"]["orgadminusername"].value;
    let password = document.forms["orgloginform"]["password"].value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var type = 'orgRecover';
    
    if (orguqid.length < 8) {
        document.getElementById("alert").innerHTML = "Organization unique ID must be of 8 characters atleast.";
        return false;
    }
    else if(/[^A-Za-z\d]/.test(orguqid)){
        document.getElementById("alert").innerHTML = "Organization unique ID cannot contain special characters";
        return false;
    }
    else if (orgusername == "") {
        document.getElementById("alert").innerHTML = "Organization username must be filled";
        return false;
    }else if (orgusername.match(mailformat) === null) {
        document.getElementById("alert").innerHTML = "Invalid organization username format, email format required";
        return false;
    }
    else if (orgadminusername == "") {
        document.getElementById("alert").innerHTML = "Organization administrator username must be filled";
        return false;
    } 
    else if(orgadminusername.match(mailformat) === null){
        document.getElementById("alert").innerHTML = "Invalid organization administrator username format, email format required";
        return false;
    }
    else if (orgusername === orgadminusername) {
        document.getElementById("alert").innerHTML = "Organization and administrator username cannot be same";
        return false;
    }
    else if (password.length < 8) {
        document.getElementById("alert").innerHTML = "Password must be of 8 characters atleast";
        return false;
    }else{
        window.location.href = "../dashboard/orgDashboard.php";
    }
});
});

function myFunction() {
    var x = document.getElementById("password");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
} 
    

