<?php
include 'definitions.php';
include 'config.php';

if (!$loggedIn) {
    $response->setFailed()
    ->addError("Unauthorised Access")
    ->send();
} 

$amount = $request['amount'];
// Check if User has Balance
if ( $user->balance < $amount ) {
    $response->setFailed()
    ->addError('Insufficient Balance')
    ->addMessage('Insufficient Balance')
    ->setData([["balance" => $user->balance]])
    ->send();   
}
$newBalance = $user->balance - $amount;

$qbUsers = new QueryBuilder($connection, 'users');
$qbChallenge = new QueryBuilder($connection, 'challenges');
$qbTransaction = new QueryBuilder($connection, 'transaction');

$p1 = [
    "andWhere" => [
        "id" => $user->id
    ],
    "userData" => [
        "balance" => $newBalance
    ]
];
$qbUsers->update($p1);
$qbUsers->execute($p1); //Deduct Balance From User Account
$response->addMessage('Balance Deducated From User');
$response->addMessage($qbUsers->output['query']);
unset($p1);

/********************************************* */
/*********** Create Challenge ********** */
/********************************************* */


$p1 = [
    "userData" => [
        "sender" => $user->id,
        "amount" => $amount,
    ]
];
$qbChallenge->insert($p1);
$qbChallenge->execute($p1); //Create New Game
$response->addMessage("Game Added Successfully")
->addMessage($qbChallenge->output['query'])
->setSuccess()
->setLastInsert($qbChallenge->output["lastInsertId"]);
unset($p1);

/****************************************** */
/* *********** UPDATE PASSBOOK ****************
/******************************************* */

//Update Administrators Balance
$param = [
    "columns" => ["balance"],
    "andWhere" => ["id" => 1],
];
$qbUsers->select($param);
$qbUsers->execute($param);
$response->addMessage($qbUsers->output['query']);
$newAdminBalance = $qbUsers->output["rows"][0]["balance"] + $amount;
unset($param);

// Here We update Administrator Balance
$param = [
    "andWhere" => ["id" => 1],
    "userData" => ["balance" => $newAdminBalance ]
];
$qbUsers->update($param);
$qbUsers->execute($param);
$response->addMessage($qbUsers->output['query']);
unset($param); 

$response->addMessage("START: Transaction Entry");
// Record Transaction
$param = [
    "userData" => [
        "fromUser" => $user->id,
        "toUser" => 1,
        "amount" => $amount,
        "description" => "New Challenge Created #" . $qbChallenge->output["lastInsertId"],
        "fromBalance" => $newBalance,
        "toBalance" => $newAdminBalance
    ]
];
$qbTransaction->insert($param);
$qbTransaction->execute($param);
$response->addMessage($qbTransaction->output['query'])
->setSuccess()
->send();