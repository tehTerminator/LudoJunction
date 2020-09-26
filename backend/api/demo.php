<?php

include 'definitions.php';
include 'config.php';

$qb3 = new QueryBuilder($connection, 'users');
$p3 = [
    "columns" => ["balance"],
    "andWhere" => ["id" => 1]
];
$qb3->select($p3);
$qb3->execute($p3);

echo 1