<?php

require 'info.php';

$stderr = fopen('php://stderr','w');

// LOGIC
$errors = [];

$present = isset($_REQUEST['otp']);
//
if(!$present) $errors[] = "Missing value";

header('Content-Type: text/json');

if( $errors ) {
$error_string = implode(',',$errors);
$output =  <<< JSON
{
    "confirmed": false,
    "error": "{$error_string}"
}
JSON;

} else {

$output = <<< JSON
{
    "confirmed": true,
    "error": null
}
JSON;

}
echo $output;
fputs($stderr, "OUTPUT:\n {$output} \n");
fclose($stderr);