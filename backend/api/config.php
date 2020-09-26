<?php
    define('LOCALHOST', 'localhost');
    define('DBNAME', 'ludoJunction');
    define('USER', 'root');
    define('PASSWORD', '');

    $connection;
    try{
        $connection = new PDO('mysql:host=localhost;dbname=' . DBNAME, USER, PASSWORD);
        // $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    } catch( PDOException $ex ){
        $response->addError($ex->getMessage())->send();
    }

    $request = json_decode( file_get_contents("php://input") );
    $request = json_decode( json_encode($request), true );
    $user = new User();
    $response = new Response();
    $headers = apache_request_headers();
    $token = '';

    foreach ($headers as $header=>$value) {
        if ($header == "Authorization") {
            $token = $value;
        }
    }
    $loggedIn = $user->validateToken($connection, $token);
    if ($loggedIn) {
        $response->setToken($token);
    }