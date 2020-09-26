<?php
include 'definitions.php';
include 'config.php';

if (!$loggedIn) {
    $response->setFailed()
    ->addError("Unauthorised Access")
    ->send();
} 

$qb = new QueryBuilder($connection, 'challenges');
$qb->update($request);
$qb->execute($request);

if ($qb->output['rowCount'] > 0 ){
    $response->setSuccess()
    ->addMessage('Room Saved Successfully.')
    ->setLastInsert($qb->output['lastInsertId'])
    ->send();
} 

$response->setFailed()
->addMessage("Failed to Updated")
->send();

