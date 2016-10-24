<?php

require 'info.php';


header('Content-Type: text/json');

echo <<< JSON
{
    "classes": [
        {"id": 1, "name": "Class 1 - Miriam"},
        {"id": 2, "name": "Class 2 - Smith"},
        {"id": 3, "name": "Class 3 - Zulu"}
    ]
}

JSON;
