<?php

//   session_start();
//
//   function is_set($variable) {
//     return isset($_SESSION[$variable]) ? $_SESSION[$variable] : '';
//   }
//
//   $username = is_set('username');
//
//   if (empty($username)) {
//     $response['msg'] = 'You have not logged in...';
//   } else {
//     require_once("../db/credentials.php");
//     $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
//     $reponse['eventos'] = find_events($username);
//     $response['msg'] = 'OK';
//
//   }
//
//   function find_events($username) {
//     global $mysqli;
//     $sql = "SELECT * FROM evento AS e LEFT JOIN usuario AS u ON e.usuario_id = u.id WHERE (u.email = '{$username}')";
//     $events = $mysqli->query($sql);
//     return $events;
//   }
//
// echo json_encode($response);

$username = 'danielmarcanodev@gmail.com';

if (empty($username)) {
  $response['msg'] = 'You have not logged in...';
} else {
  require_once("../db/credentials.php");
  $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
  // $reponse['eventos'] = find_events($username);
  $eventos_mysqli = find_events($username);
  $eventos = array();

  while($evento = $eventos_mysqli->fetch_assoc()) {
    $eventos[] = $evento;
  }

  $response['eventos'] = $eventos;

  $response['msg'] = 'OK';

}

function find_events($username) {
  global $mysqli;
  $sql = "SELECT e.title, e.start_date, e.start_hour, e.end_date, e.end_hour, e.full_day
  FROM evento AS e LEFT JOIN usuario AS u ON e.usuario_id = u.id WHERE (u.email = '{$username}')";
  $events = $mysqli->query($sql);
  return $events;
}

// var_dump();

echo json_encode($response);
