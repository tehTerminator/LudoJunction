<?php

    include 'definitions.php';
    include 'config.php';

    $id = $request['id'];
    $otp = "'" . $request['otp'] . "'";

    $qb = new QueryBuilder($connection, 'users');

    $query = <<<SQL
    SELECT
        id, otp, generatedOn
    FROM
        user_request
    WHERE
        id = $id AND 
        otp = $otp AND
        TIMESTAMPDIFF(SECOND, NOW(), generatedOn) < 300
SQL;

    $stmt = $connection->prepare($query);
    $stmt->execute();
    
    if( $stmt->rowCount() === 1) {
        $q2 = "UPDATE users SET state = 'ACTIVE' where id = $id";
        $stmt2 = $connection->prepare($q2);
        $stmt2->execute();

        $response->addMessage('User Activate Successfully')
        ->setSuccess()
        ->send();
    } 

    $query2 = 'DELETE from users WHERE id = $id';
    $stmt3 = $connection->prepare($query2);
    $stmt3->execute();

    $response->addMessage('OTP Expired')
    ->addMessage('Please Register Again')
    ->setFailed()
    ->send();