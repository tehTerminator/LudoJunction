<?php
    include 'definitions.php';
    include 'config.php';

    // $username = isset($request['username']) ? $request['username'] : NULL;
    // $password = isset($request['password']) ? $request['password'] : NULL;
    $username = $request['username'];
    $password = $request['password'];
    
    if( is_null($username) || is_null($password) ) {
        $response->setFailed()
        ->addError("Username or Password Not Provided")
        ->addMessage("Username or Password Not Provided")
        ->send();
    } 
    
    $state = $user->login($connection, $username, $password);
    if ($state) {
        $response->setSuccess()
        ->addMessage('User Logged in Successfully')
        ->setToken($user->token)
        ->setData([$user->get()])
        ->send();
    } 

    $response->setFailed()
    ->addMessage('Invalid Username or Password')
    ->addMessage($user->getPassword())
    ->setData([$user->get()])
    ->send();
    
