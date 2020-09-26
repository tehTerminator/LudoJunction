<?php
include 'definitions.php';
include 'config.php';

if (!$loggedIn) {
    $response->setFailed()
    ->addError("Unauthorised Access")
    ->send();
} 

if (!isset($request['imageData'])) {
    $response->addMessage("Screenshot Not Provided")
    ->addMessage($request)
    ->setFailed()
    ->send();
}

$screenshot = $request['imageData'];
$challenge_id = $request["id"];
$amount = $request["amount"];
$winAmount = ($amount * 2) * 0.95;
$fileName = $challenge_id . ".jpg";
$imageUrl = "../assets/" . $fileName; 

$qbCha = new QueryBuilder($connection, 'challenges');
$qbUser = new QueryBuilder($connection, 'users');
$qbTran = new QueryBuilder($connection, "transaction");

$p = ["andWhere"=>["id" => $challenge_id]];
$qbCha->select($p);
$qbCha->execute($p);

$challengeState = $qbTran->output['rows'][0]["state"];

if ($challengeState == "COMPLETED") {
    $response->setFailed()
    ->addMessage("Result Already Posted")
    ->send();
}


if (preg_match('/^data:image\/(\w+);base64,/', $screenshot, $type)) {
    $screenshot = substr($screenshot, strpos($screenshot, ',') + 1);
    $screenshot = base64_decode($screenshot);

    if ($screenshot === false) {
        throw new \Exception('base64_decode failed');
    }
} else {
    throw new \Exception('did not match data URI with image data');
}

file_put_contents($imageUrl, $screenshot);

$p = [
    "userData" => [
        "state" => "COMPLETED", 
        "winner" => $user->id,
        "screenshot" => $imageUrl
    ],
    "andWhere" => ["id" => $challenge_id]
];
$qbCha->update($p);
$qbCha->execute($p);
$response->addMessage("Updated challenge Table");
// Winner Added to Challenge Table

$newBalance = $user->balance + $winAmount;

$p = [
    "andWhere" => ["id" => $user->id],
    "userData" => ["balance" => $newBalance ]
];
$qbUser->update($p);
$qbUser->execute($p); 
$response->addMessage("User Balance Updated"); // Updated User Balance

$param = [
    "columns" => ["balance"],
    "andWhere" => ["id" => 1],
];
$qbUser->select($param);
$qbUser->execute($param);
$newAdminBalance = $qbUser->output["rows"][0]["balance"] - $winAmount;

$param = [
    "andWhere" => ["id" => 1],
    "userData" => ["balance" => $newAdminBalance ]
];
$qbUser->update($param);
$qbUser->execute($param);
$response->addMessage($qbUser->output['query']);

$p = [
    "userData" => [
        "fromUser" => 1,
        "toUser" => $user->id,
        "amount" => $winAmount,
        "description" => "Won Challenge #" . $challenge_id,
        "fromBalance" => $newAdminBalance,
        "toBalance" => $newBalance
    ]
];
$qbTran->insert($p);
$qbTran->execute($p);
$response->setSuccess()
->addMessage($qbTran->output['query'])
->send();
