<?php

include '../welcome/database.php';
include '../PHPMailer/phpmailer.php';
session_start();

if(!isset($_POST['empemailaddress']) || !isset($_POST['password']) || !isset($_POST['empfullname'])){
    header("Location: ../welcome/unauthorized.php");
    exit();
}

$empusername = $_POST['empemailaddress'];
$temppassword = $_POST['password'];
$empfullname = $_POST['empfullname'];
$folderid = $_POST['folderid'];
$password = password_hash($temppassword, PASSWORD_DEFAULT);
$status = 'INACTIVE';
$application = 'UNLOCKED';
$data = 'NULL';

$orguqid = $_SESSION['orguqid'];
$orgusername = $_SESSION['orgemailaddress'];
$orgadminusername = $_SESSION['orgadminemailaddress'];

$checkorgUN = mysqli_query($conn,"select * from organization where org_username = '$empusername' or 
org_admin_username = '$empusername' ");

$checkempUN = mysqli_query($conn,"select * from employee where emp_username = '$empusername' ");

if(mysqli_num_rows($checkorgUN) == 0 && mysqli_num_rows($checkempUN) == 0){
    
    $getOrgname = mysqli_query($conn,"select org_name from organization where org_unique_id = '$orguqid' ");
    $result = mysqli_fetch_array($getOrgname);

    $insertdoc = mysqli_query($conn, " INSERT INTO employee_document(emp_username, org_unique_id, folder_id, document_status) 
    VALUES('$empusername', '$orguqid', '$folderid', '$application') ");

    $insertData = mysqli_query($conn, " INSERT INTO employee(emp_username, org_unique_id, emp_fullname, emp_address, 
    emp_phoneno, emp_dob, emp_gender, pass, emp_status, application_status) VALUES ('$empusername', '$orguqid', '$empfullname', '$data', '$data', 
    '$data', '$data', '$password', '$status', '$application') ");

        if (mysqli_affected_rows($conn)){

            //Body message string
            $msg = " 
            Welcome $empfullname,<br>
            <p>Your employee account has been successfully registered by <strong>$result[0]</strong> on HrGO Platform.</p>
            <p>Onboarding process has been started and your account details are as following :</p>
            <p>Employee username - $empusername</p>
            <p>Organization unique ID - <strong>$orguqid</strong></p>
            <p>Temporary Password - <strong>$temppassword</strong></p>
            <p style = 'color: red;'>Please login using the above account details on HrGO Platform to complete the onboarding process</p>
            <p>Welcome again, wish you safe and pleasant experience on HrGO Platform</p>
            <p style = 'color: red;'>Never share your OTP, Passwords, Login Credentials with anyone even if the person claims to be a HrGO employee</p>
            <p>In case you have not initiated this request, please report it on toll free number - 180032548957</p>
            <p>Regards,<br>HrGO Operations Team</p>
            <p><strong>This is a system generated mail, please do not reply on this.</strong></p>
            ";
            
            //Recipients
            $mail->setFrom('hrgo.services@outlook.com', 'HrGO Services');
            $mail->addAddress($empusername); 
            
            //Content
            $mail->isHTML(true);                        
            $mail->Subject = 'Employee registration successful';
            $mail->Body    = $msg;
            
            if($mail->send()){
                echo json_encode(array("query"=>"registrationSuccessful"));
            }else{
                echo json_encode(array("query"=>"emailSentFailed"));
            }

        }else{
            echo json_encode(array("query"=>"registrationUnSuccessful"));
        }

}else{
    echo json_encode(array("query"=>"duplicateEmpUN"));
}

?>