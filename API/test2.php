<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fp = fopen("courses.json", "r");
    $data = json_decode(fread($fp, filesize("Courses.json")), true);
    fclose($fp);

    $postData = json_decode(file_get_contents("php://input"), true);
    $courses = $data['courses'];
    $newProduct = $postData['produit'];
    $newQuantity = $postData['qte'];

    $productExists = false;
    for ($i = 0; $i < count($courses); $i++) {
        if ($courses[$i]['produit'] == $newProduct) {
            $courses[$i]['qte'] = $newQuantity;
            $productExists = true;
            break;
        }
    }

    if (!$productExists) {
        $courses[] = array("produit" => $newProduct, "qte" => $newQuantity);
    }

    $data['courses'] = $courses;

    $fp = fopen("courses.json", "w");
    fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
    fclose($fp);

    echo json_encode($data);
}
