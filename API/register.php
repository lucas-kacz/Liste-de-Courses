<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$file = "courses.json";

if(file_exists($file)){
    $content = file_get_contents($file);
    echo $content;
}

?>
