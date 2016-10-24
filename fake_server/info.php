<?php
// info

$stderr = fopen('php://stderr','w');
$request = print_r($_REQUEST,true);

$info = <<< INFO
    Server Name:    {$_SERVER['SERVER_NAME']}:{$_SERVER['SERVER_PORT']}
    Script Name:    {$_SERVER['SCRIPT_NAME']}
    Request Method: {$_SERVER['REQUEST_METHOD']}

    Request: {$request}
INFO;
fputs($stderr, "INPUT:\n {$info} \n");