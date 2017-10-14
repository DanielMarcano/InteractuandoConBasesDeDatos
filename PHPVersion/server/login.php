<?php
session_start();

require_once("../db/credentials.php");

function is_set($variable) {
  return isset($_POST[$variable]) ? $_POST[$variable] : '';
}

$username = is_set('username');
$password = is_set('password');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if ($mysqli->connect_errno) {
  $response['message'] = 'Error en la conexión con la base de datos';
}

function find_user($email) {
  global $mysqli;
  $sql = "SELECT * FROM usuario WHERE email = '{$email}'";
  $user = $mysqli->query($sql);
  return $user->fetch_assoc();
}

$user = find_user($username);

if (password_verify($password, $user['pwd'])) {
  $_SESSION['username'] = $user['email'];
  $response['msg'] = 'OK';
  $response['username'] = $user['email'];

} else {
  $response['msg'] = 'Incorrect email or password';
}

echo json_encode($response);
