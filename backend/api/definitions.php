<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Authorization');

class Response{
    private $status;
    private $errors;
    private $data;
    public $lastInsertId;
    private $message;
    public $token;
    public $additional_data;

    function __construct()
    {
        $this->status = false;
        $this->errors = [];
        $this->data = [];
        $this->message = [];    
        $this->token = "";    
    }

    function push_additional($data) {
        array_push($this->additional_data, $data);
        return $this;
    }

    function addError($error) {
        array_push($this->errors, $error);
        return $this;
    }

    function setSuccess(){
        $this->status = true;
        return $this;
    }

    function setFailed(){
        $this->status = false;
        return $this;
    }

    function setData($data) {
        $this->data = $data;
        return $this;
    }

    function getData() {
        return $this->data;
    }

    function addMessage($message){
        array_push($this->message, $message);
        return $this;
    }

    function setLastInsert($lastInsert) {
        $this->lastInsertId = $lastInsert;
        return $this;
    }

    function send(){
        die( json_encode([
            'status' => $this->status,
            'errors' => $this->errors,
            'message' => $this->message,
            'data' => $this->data,
            'token' => $this->token,
            'lastInsertId' => $this->lastInsertId
        ]));
    }

    function getStatus() {
        return $this->status;
    }

    function setToken($token) {
        $this->token = $token;
        return $this;
    }
}

class User {
    public $id;
    public $email;
    public $title;
    private $password;
    public $generatedOn;
    public $token;
    public $isAdmin;
    public $balance;
    private $loggedIn;
    public $query;

    function __construct() {
        $this->id = 0;
        $this->username = NULL;
        $this->password = NULL;
        $this->generatedOn = NULL;
        $this->token = NULL;
        $this->isAdmin = false;
        $this->balance = 0;
        $this->loggedIn = false;
    }
    
    /**
     * @param str $password
     */
    function setPassword($password) {
        $this->password = hash_hmac("sha256", $password, 'Hmvi8lvHWrUCFp15p1XduJg9mgfGoDOI');
        return $this;
    }

    function getPassword(){
        return $this->password;
    }

    function isLoggedIn(){
        return $this->loggedIn;
    }

    /**
     * @param PDO $connection
     * @param str $email
     * @param str $password
     */
    function login($connection, $email, $password) {
        $this->username = $email;
        $this->setPassword($password);

        $params = [
            "andWhere" => [
                "mobile" => $this->username,
                "password" => $this->password
            ]
        ];
        $qb = new QueryBuilder($connection, "users");
        $qb->select($params);
        $qb->execute($params);
        $this->query = $qb->output['query'];
        $users = $qb->get_output()["rows"];

        if ( count($users) === 1 ){
            $this->id = $users[0]["id"];
            $this->token = bin2hex( random_bytes(16) );
            $params = array(
                    "userData" => array("token" => $this->token),
                    "andWhere" => array("id" => $users[0]["id"])
            );
            
            $qb2 = new QueryBuilder($connection, "users");
            $qb2->update($params);
            $qb2->execute($params);

            $this->generatedOn = $users[0]["generatedOn"];
            $this->isAdmin = $users[0]["isAdmin"];
            $this->loggedIn = true;
            $this->title = $users[0]["title"];
            $this->balance = $users[0]["balance"];
            return true;    // Login Successfull
        }

        // Login Failed
        return false;
    }

    function validateToken($connection, $token) {
        $token = "'" . $token . "'";
        $query = <<<SQL
        SELECT 
            id, title, email, generatedOn, isAdmin, balance
        FROM
            users
        WHERE
            token = $token AND 
            TIMESTAMPDIFF(SECOND, NOW(), generatedOn) < 3600
SQL;
        $this->query = $query;
        $stmt = $connection->prepare($query);
        $stmt->execute();
        if( $stmt->rowCount() === 1) {
            $user = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
            $this->username = $user["email"];
            $this->title = $user["title"];
            $this->id = $user["id"];
            $this->generatedOn = $user["generatedOn"];
            $this->loggedIn = true;
            $this->token = $token;
            $this->isAdmin = $user["isAdmin"];
            $this->balance = $user["balance"];
            return true;
        }
        return false;
    }

    function refreshToken($connection) {
        $newToken = bin2hex( random_bytes(16) );
        $params = [
                "userData" => ["token" => $newToken],
                "andWhere" => ["token" => $this->token]
        ];
        
        $qb2 = new QueryBuilder($connection, "users");
        $qb2->update($params);
        $qb2->execute($params);
        $this->token = $newToken;
    }

    function get() {
        return [
            "id" => $this->id,
            "email" => $this->email,
            "title" => $this->title,
            "token" => $this->token,
            "generatedOn" => $this->generatedOn,
            "isAdmin" => $this->isAdmin,
            "balance" => $this->balance
        ];
    }
}


class QueryBuilder {
    private $tableName      = ""; 
    private $connection     = NULL; 
    private $query          = ""; 
    private $autoCommit     = false;
    public $output          = array(); 
    
    public function __construct($con, $table) {
        $this->tableName = $table; 
        $this->connection = $con; 
    }

    public function select($params = NULL) {
        $cols = ""; 
        $columns = isset($params['columns']) ? $params['columns'] : NULL;
        $this->autoCommit = true;

        if (is_null($columns)) {
            $cols = "{$this->tableName}.*"; 
        }
        else if (is_array($columns)) {
            $cols = implode(",", $columns); 
        }
        else {
            $cols = $columns; 
        }
        $this->query = "SELECT {$cols} FROM $this->tableName"; 
        
        if (isset($params['join'])) {
            $this->query .= $this->join($params['join']);
        }

        if (isset($params['leftJoin'])) {
            $this->query .= $this->leftJoin($params['leftJoin']);
        }

        if (isset($params['rightJoin'])) {
            $this->query .= $this->rightJoin($params['rightJoin']);
        }

        if (isset($params['andWhere']) || isset($params['orWhere']) ) {
            $this->query .= $this->where($params);
        }

        if (isset($params['groupBy'])) {
            $this->query .= $this->group($params['groupBy']);
        }

        if (isset($params['orderBy'])) {
            $this->query .= $this->orderBy($params['orderBy']);
        }

        if(isset($params['limit'])) {
            $this->query = $this->query . ' LIMIT ' . $params['limit'];
        }
    }

    public function insert($param){
        $this->query = "INSERT INTO `{$this->tableName}` (";
        $columns = $this->isMultiDimensional($param['userData']) ? array_keys($param['userData'][0]) : array_keys($param['userData']);
        $this->query .= implode(", ", $this->encapsulate($columns, "`")) . ") VALUES (";
        $this->query .= implode(", ", $this->prefix($columns, ":")) . ")";
    }

    public function update($param){
        $this->query = "UPDATE `{$this->tableName}` SET ";
        $userData = array();
        foreach($param['userData'] as $key=>$value){
            if( is_array($value) ){
                array_push($userData, "{$key} = {$value[0]} {$value[1]} {$value[2]}");
            } else{
                array_push($userData, "{$key} = '{$value}'");
            }
        }
        $this->query .= implode(", ", $userData);
        $this->query .= $this->where($param);
    }

    public function delete($param){
        $this->query = "DELETE FROM `{$this->tableName}`";
        $this->query .= $this->where($param);
    }

    public function execute($params){
        $userData = isset($params['userData']) ? $params['userData'] : NULL;
        $stmt = $this->connection->prepare($this->query);
        $rowCounter = 0;

        $this->output['userData'] = $userData;

        if( $this->autoCommit == false ){
            $this->connection->beginTransaction();
        }

        try{
            if( $this->isMultiDimensional($userData) ){
                foreach($userData as $key=>$value){
                    if( $stmt->execute($value) ){
                        $rowCounter++;
                    } else {
                        $this->output['error'] = $stmt->errorCode();
                    }
                }
            } else {
                $stmt->execute($userData);
                $rowCounter++;
            }
            $this->output['lastInsertId'] = $this->connection->lastInsertId();
            
            if( $this->autoCommit == false ){
                if( $rowCounter >= $stmt->rowCount() ){
                    $this->connection->commit();
                    $this->output['commit'] = true;
                } else {
                    $this->output['message'] = "rowCounter({$rowCounter}) != stmtRowCount({$stmt->rowCount()})";
                    $this->connection->rollBack();
                    $this->output['commit'] = false;
                }
            }

            $this->output['rows'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $this->output['rowCount'] = $stmt->rowCount();
            $this->output['query'] = $this->query;
        } catch (PDOException $e) {
            $this->connection->rollBack();
            $output['hasRolledBack'] = true;
        }
    }

    public function get_output() {
        return $this->output;
    }

    private function prefix($someArray, $pre){
        $count = count($someArray);
        $output = array();
        for ($i=0; $i<$count; $i++){
            array_push($output, "{$pre}{$someArray[$i]}");
        }
        return $output;
    }

    private function encapsulate($someArray, $char){
        $count = count($someArray);
        $output = array();
        for ($i=0; $i<$count; $i++) {
            array_push($output, "{$char}{$someArray[$i]}{$char}");
        }
        return $output;
    }

    
    private function where($param=NULL) {
        $condition = "";
        $operator = "AND";
        $where = array();

        if ($param == NULL) {
            return "";
        } else if (isset($param['andWhere'])) {
            $operator = "AND";
            $where = $param['andWhere'];
        } else if (isset($param['orWhere'])) {
            $operator = "OR";
            $where = $param['orWhere'];
        } 

        if (isset($where['andWhere']) && isset($where['orWhere'])) {
            $c1 = $this->conditionsArrayCreator($where['andWhere'], "AND"); 
            $c2 = $this->conditionsArrayCreator($where['orWhere'], "OR"); 
            $condition = "({$c1}) {$operator} ({$c2})"; 
        } else {
            $condition = $this->conditionsArrayCreator($where, $operator);
        }
        return " WHERE {$condition}";
    }
    
    private function orderBy($orderType){
        return " ORDER BY {$orderType}";
    }
    
    private function join($joinType){
        return " JOIN {$joinType}";
    }
    
    private function leftJoin($joinType){
        return " LEFT JOIN {$joinType}";
    }

    private function rightJoin($joinType){
        return " RIGHT JOIN {$joinType}";
    }
    
    private function group($by){
        return " GROUP BY {$by}";
    }
    
    private function conditionsArrayCreator($conditionArray, $conditional_operator) {
        $conditions = array(); 
        $conditional_operator = " {$conditional_operator} "; 
        foreach ($conditionArray as $key => $value) {
            $val = "";
            if(is_string($key) && is_string($value) && strcmp($key, $value) == 0 ) {
                die("{'message': '$key is equal to $value'}");
            } else if (is_array($value) && in_array('noQuotes', $value)) {
                $val = " = {$value[0]}"; 
            } else if (is_array($value)) {
                if (count($value) == 2) {
                    $val = "{$value[0]} '{$value[1]}'"; 
                } else if (count($value) == 3 ) {
                    $val = "{$value[0]} '{$value[1]}' AND '{$value[2]}'"; 
                } else {
                    $valList = array();
                    for($i = 1; $i < count($value); $i++){
                        if( $value[$i] == 'LIST'){
                            continue;
                        }
                        array_push($valList, "'{$value[$i]}'");
                    }
                    $val = "{$value[0]} (" . implode(',', $valList) . ")";
                }
            } else {
                $val = " = '{$value}'"; 
            }
            array_push($conditions, "{$key} {$val}"); 
        }
        return implode($conditional_operator, $conditions); 
    }
    
    private function isMultiDimensional($someArray){
        if (is_array($someArray)) {
            foreach ($someArray as $key=>$value) {
                return is_array($value);
            }
        } else {
            return false;
        }
    }
}

