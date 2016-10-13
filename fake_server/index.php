<?php
require 'common.php';
// Simulate latency
sleep(1);
// IN
$stderr = fopen(STDERR,'w');
$request = print_r($_REQUEST,true);

$info = <<< INFO
    Server Name:    {$_SERVER['SERVER_NAME']}:{$_SERVER['SERVER_PORT']}
    Script Name:    {$_SERVER['SCRIPT_NAME']}
    Request Method: {$_SERVER['REQUEST_METHOD']}

    Request: {$request}
INFO;
fputs($stderr, "\n {$info} \n");

// LOGIC
$errors = [];

$present = isset($_REQUEST['username']) &&
           isset( $_REQUEST['password']);

if( !$present ) {

    $errors[] = "Username/Password not in form data";
} else {

    $correct = $_REQUEST['username'] === 'Test' &&
               $_REQUEST['password'] === '123';

    if(!$correct) {
        $errors[] = "Wrong username/password";
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

