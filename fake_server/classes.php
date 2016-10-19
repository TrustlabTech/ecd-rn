<?php

require 'info.php';

// Simulate latency
sleep(1);

header('Content-Type: text/json');

echo <<< JSON
{
    "classes": [
        {"name": "Class 1"},
        {"name": "Class 2"},
        {"name": "Class 3"}
    ]
}

JSON;
