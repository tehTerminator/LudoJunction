<?php

    include 'config.php';
    include 'definitions.php';

    $username = $request['username'];
    $password = $request['password'];

    $state = $user->login($connection, $username, $password);

    if ($state) {
        $response->setSuccess()
        ->addMessage('User Logged in Successfully')
        ->setToken($user->token)
        ->setData([$user->get()])
        ->send();
    } else {
        $response->setFailed()
        ->addMessage('Invalid Username or Password')
        ->send();
    }
