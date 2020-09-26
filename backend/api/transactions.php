<?php

use function PHPSTORM_META\map;

include 'definitions.php';
include 'config.php';

if ($loggedIn) {
    $params = [
        "orWhere" => [
            "fromUser" => $user->id,
            "toUser" => $user->id
        ],
        "order" => "id DESC",
        "limit" => "30"
    ];
    $qb = new QueryBuilder($connection, "transaction");
    $qb->select($params);
    $qb->execute($params);
    $response->setData($qb->output["rows"])
    ->setSuccess()
    ->send();
} else {
    $response->setFailed()
    ->addError("Unauthorised Access")
    ->send();
}
