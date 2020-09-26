<?php
include 'definitions.php';
include 'config.php';

if (!$loggedIn) {
    $response->setFailed()
    ->addMessage("Unauthorised Access")
    ->send();
} 

$challenge_id = $request["id"];
$amount = $request['amount'];

$qbUsers = new QueryBuilder($connection, 'users');
$qbChallenge = new QueryBuilder($connection, 'challenges');
$qbTransaction = new QueryBuilder($connection, 'transaction');

$p = ["andWhere" => ["id" => $challenge_id] ];
$qbChallenge->select($p);
$qbChallenge->execute($p);
$state = $qbChallenge->output['rows'][0]["state"];

if ($state == "ACTIVE" ) {
    $response->setFailed()
    ->addMessage("Challenge No Longer Available")
    ->send();
}

// Check if User has Balance
if ( $user->balance < $amount ) {
    $response->setFailed()
    ->addMessage('Insufficient Balance')
    ->setData([["balance" => $user->balance]])
    ->send();   
}
$newBalance = $user->balance - $amount;

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
unset($p1);

/********************************************* */
/*********** Update Challenge Table ********** */
/********************************************* */
$p1 = [
    "andWhere" => ["id" => $challenge_id],
    "userData" => ["receiver" => $user->id, "state" => "ACCEPTED"]
];
$qbChallenge->update($p1);
$qbChallenge->execute($p1); //Create New Game
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
$newAdminBalance = $qbUsers->output["rows"][0]["balance"] + $amount;
unset($param);

// Here We update Administrator Balance
$param = [
    "andWhere" => ["id" => 1],
    "userData" => ["balance" => $newAdminBalance ]
];
$qbUsers->update($param);
$qbUsers->execute($param);
unset($param); 

// Record Transaction
$param = [
    "userData" => [
        "fromUser" => $user->id,
        "toUser" => 1,
        "amount" => $amount,
        "description" => "Accepted Challenge #" . $challenge_id,
        "fromBalance" => $newBalance,
        "toBalance" => $newAdminBalance
    ]
];
$qbTransaction->insert($param);
$qbTransaction->execute($param);
$response->setSuccess()
->addMessage("Game Accepted. New Balance: " . $newBalance)
->send();