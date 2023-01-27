$(document).ready(function() {
	$('#register').on('click', function() {

    let empusername = document.forms["emploginform"]["empusername"].value;
    let orguqid = document.forms["emploginform"]["orguqid"].value;
    let emppassword = document.forms["emploginform"]["emppassword"].value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var type = 'empRecover';

    if (empusername == "") {
        document.getElementById("alert").innerHTML = "Employee username must be filled.";
        return false;
    }
    else if(empusername.match(mailformat) === null){
        document.getElementById("alert").innerHTML = "Invalid employee username format, email format required.";
        return false;
    }else if (orguqid.length < 8) {
        document.getElementById("alert").innerHTML = "Organization unique ID must be of 8 characters atleast.";
        return false;
    }
    else if(/[^A-Za-z\d]/.test(orguqid)){
        document.getElementById("alert").innerHTML = "Organization unique ID cannot contain special characters";
        return false;
    } 
    else if (emppassword.length < 8) {
        document.getElementById("alert").innerHTML = "Password must be of 8 characters atleast.";
        return false;
    }
    else{
        window.location.href = "../dashboard/empDashboard.php";
    }
});
});

function myFunction() {
    var x = document.getElementById("emppassword");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
} 

