<?php
require 'info.php';
// IN


// LOGIC
$errors = [];

$present = isset($_REQUEST['phoneNumber']) &&
           isset( $_REQUEST['pin']);

if( !$present ) {

    $errors[] = "phoneNumber/Password not in form data";
} else {

    $correct = trim($_REQUEST['phoneNumber']) === '911' &&
               trim($_REQUEST['pin']) === '123';

    if(!$correct) {
        $errors[] = "Wrong phoneNumber/pin";
    }
}


// OUT
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

