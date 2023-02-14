<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$initial_list = file_get_contents('./courses.json');
$online_shopping_list = json_decode($initial_list, true);

$received_shopping_list = json_decode($_POST['chg'], true);


// for($i=0; $i < count($online_shopping_list['courses']); $i++){
//     for($j=0; $j < count($received_shopping_list); $j++)
//         if($online_shopping_list['courses'][$i]['produit'] == $received_shopping_list[$j]){
//             $online_shopping_list['course'][$i]['qte'] = $received_shopping_list[$j]['qte'];
//         }
// }

foreach($received_shopping_list as $received_list){
    $found = false;
    foreach($online_shopping_list['courses'] as &$online_list){
        if($online_list['produit'] == $received_list['produit']) {
            $online_list['qte'] = intval($online_list['qte']) + intval($received_list['qte']);
            $found = true;
            break;
        }
    }

    if(!$found){
        $online_shopping_list['courses'][] = $received_list;
    }
}

echo $online_shopping_list; 

$online_shopping_list['sequence'] = intval($online_shopping_list['sequence']) + 1;
file_put_contents('./courses.json', json_encode($online_shopping_list, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

echo json_encode($online_shopping_list, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// $fp = fopen("./courses.json", "w");
// fwrite($fp, json_encode($online_shopping_list, JSON_PRETTY_PRINT));
// fclose($fp);

?>