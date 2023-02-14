<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $local_shopping_list = file_get_contents('./Course.json');

    $online_shopping_list = json_decode($shopping_list, true);

    // echo($shopping_list);

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        // $received_shopping_list = json_decode(file_get_contents("php://input"), true);
        $received_shopping_list = json_decode($_POST['chg'], true);

        $remaining = $received_shopping_list;

        // foreach($online_shopping_list['courses'] as $online_list){
        //     foreach($received_shopping_list as $local_list){
        //         if($online_shopping_list['produit'] == $received_shopping_list['produit']){
        //             $online_shopping_list['qte'] = $received_shopping_list['qte'];
        //             // unset($remaining['courses'][$j]);
        //         }
        //     }

        // }

        for($i=0; $i < count($online_shopping_list['courses']); $i++){
            for($j=0; $j < count($received_shopping_list); $j++)
                if($online_shopping_list['courses'][$i]['produit'] == $received_shopping_list[$j]){
                    $online_shopping_list['course'][$i]['qte'] = $received_shopping_list[$j]['qte'];
                }
        }

        // if(count($remaining['courses']) > 0){
        //     for($k = 0; $k < count($shopping_list); $k++){
        //         array_push($shopping_list['courses'], $remaining['courses'][$k]);
        //     }
        // }


        $fp = fopen("./Course.json", "w");
        fwrite($fp, json_encode($online_shopping_list, JSON_PRETTY_PRINT));
        fclose($fp);

        // echo json_encode($online_shopping_list, JSON_PRETTY_PRINT);

    }

?>
