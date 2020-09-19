<?php

    include 'config.php';
    include 'definitions.php';

    $username = $request['username'];
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

    $qb2 = new QueryBuilder($connection, 'user_request');
    $otp = bin2hex( random_bytes(4) );
    $user_id = $qb->output['lastInsertId'];
    $qb2->insert([
        'userData' => ['id' => $user_id, 'otp' => $otp]
    ]);

    $response->addMessage('User Created Successfully')
    ->setSuccess()
    ->setData(['id' => $user_id])
    ->send();
