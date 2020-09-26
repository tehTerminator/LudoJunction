<?php
include 'definitions.php';
include 'config.php';

if ($loggedIn) {
    $qb = new QueryBuilder($connection, 'challenges');
    $params = [
        "columns" => [
            "challenges.id",
            "challenges.sender",
            "challenges.receiver",
            "challenges.amount",
            "challenges.room",
            "challenges.state",
            "challenges.postedOn",
            "challenges.winner",
            "challenges.screenshot",
            "u1.title as stitle",
            "u2.title as rtitle"
        ],
        "andWhere" => [
            "challenges.state" => ["NOT IN", "REJECTED", "COMPLETED", "LIST"]
        ],
        "leftJoin" => "users AS u1 on u1.id = challenges.sender LEFT JOIN users as u2 on u2.id = challenges.receiver"
    ];

    $qb->select($params);
    $qb->execute($params);
    $response->setSuccess()
    ->setData($qb->output['rows'])
    ->addMessage($qb->output['query'])
    ->setToken($token)
    ->send();
} else {
    $response->setFailed()
    ->addError("Unauthorised Access")
    ->send();
}
