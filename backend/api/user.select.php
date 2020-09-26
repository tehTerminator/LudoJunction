<?php
include 'definitions.php';
include 'config.php';


$params = [
    "andWhere" => $request["andWhere"],
    "columns" => ["email"]
];
$qb = new QueryBuilder($connection, 'users');
$qb->select($params);
$qb->execute($params);

$response->setSuccess()
->addMessage($qb->output['query'])
->setData($qb->output["rows"])
->send();