<?php

require 'info.php';

// Simulate latency
sleep(1);

// LOGIC
$errors = [];

$present = isset($_REQUEST['phoneNumber']) &&
           isset($_REQUEST['password']) &&
           isset($_REQUEST['passwordConfirm']) &&
           isset($_REQUEST['firstName']) &&
           isset($_REQUEST['lastName']);
//

header('Content-Type: text/json');

if( $errors ) {
$error_string = implode(',',$errors);
echo <<< JSON
{
    "authenticated": false,
    "error": "{$error_string}"
}
JSON;

} else {

echo <<< JSON
{
    "authenticated": true,
    "error": null
}
JSON;

}