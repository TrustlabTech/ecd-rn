<?php
require 'common.php';
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

// OUT
header('Content-Type: text/json');
echo <<< JSON
{
    "authenticated": true
}
JSON;
