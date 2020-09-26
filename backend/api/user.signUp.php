<?php

    include 'definitions.php';
    include 'config.php';

    $username = $request['email'];
    $password = $request['password'];
    $title = $request['title'];

    $password = $user->setPassword($password)->getPassword();

    $qb = new QueryBuilder($connection, 'users');
    $req = [
        'userData' => [
            'title' => $title,
            'email' => $username,
            'password' => $password
        ]
    ];
    $qb->insert($req);
    $qb->execute($req);
    $otp = bin2hex( random_bytes(4) );
    $user_id = $qb->output['lastInsertId'];
    $req2 = [
        'userData' => [
            'id' => $user_id,
            'otp' => $otp
        ]
        ];

    $qb2 = new QueryBuilder($connection, 'user_request');
    $qb2->insert($req2);
    $qb2->execute($req2);

    $response->addMessage('User Created Successfully')
    ->setSuccess()
    ->setData([['id' => $user_id, 'otp' => $otp]])
    ->send();
