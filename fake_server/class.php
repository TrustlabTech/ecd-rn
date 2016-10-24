<?php

require 'info.php';


header('Content-Type: text/json');
switch( $_GET['id'] ) {

  case 1:
echo <<< JSON
{
  "children": [
    {"id": 1, "name": "John Smith", "imageUrl": "https://media.creativemornings.com/uploads/user/avatar/6930/small_avatar.jpg" },
    {"id": 2, "name": "Peter Jones", "imageUrl": "https://media.creativemornings.com/uploads/user/avatar/6930/small_avatar.jpg" }
  ]
}
JSON;
  break;

  case 2:
  echo <<< JSON
{
  "children": [
    {"id": 1, "name": "Betty Smith", "imageUrl": "https://media.creativemornings.com/uploads/user/avatar/6930/small_avatar.jpg" },
    {"id": 2, "name": "Sarah Jones", "imageUrl": "https://media.creativemornings.com/uploads/user/avatar/6930/small_avatar.jpg" },
    {"id": 3, "name": "Jan Patrick ", "imageUrl": "https://media.creativemornings.com/uploads/user/avatar/6930/small_avatar.jpg" },
    {"id": 4, "name": "Alexis Webster", "imageUrl": "https://media.creativemornings.com/uploads/user/avatar/6930/small_avatar.jpg" },
    {"id": 5, "name": "Antonia Powers", "imageUrl": "https://media.creativemornings.com/uploads/user/avatar/6930/small_avatar.jpg" }
  ]
}
JSON;
  break;

  case 3:
  echo <<< JSON
{
  "children": [
    {"id": 1, "name": "Kate Smith", "imageUrl": "https://media.creativemornings.com/uploads/user/avatar/6930/small_avatar.jpg" },
    {"id": 2, "name": "Jessica Jones", "imageUrl": "https://media.creativemornings.com/uploads/user/avatar/6930/small_avatar.jpg" }
  ]
}
JSON;
  break;

}
