<?php

  require_once('utilities.php');
  require_once('conector.php');

  // We assemble the event
  $event['titulo'] = isset($_POST['titulo']) ? $_POST['titulo'] : '';
  $event['start_date'] = isset($_POST['start_date']) ? $_POST['start_date'] : '';
  $event['all_day'] = isset($_POST['allDay']) ? $_POST['allDay'] : '';

  if ($event['all_day']) {
    $event['end_date'] = NULL;
    $event['end_hour'] = NULL;
    $event['start_hour'] = NULL;
  } else {
    $event['end_date'] = isset($_POST['end_date']) ? $_POST['end_date'] : '';
    $event['end_hour'] = isset($_POST['end_hour']) ? $_POST['end_hour'] : '';
    $event['start_hour'] = isset($_POST['start_hour']) ? $_POST['start_hour'] : '';
  }
  // We finish assembling the event

  $mysqli = new ConnectDB();
  $mysqli_response = $mysqli->initConnection('nextu_calendar');

  if ($mysqli_response == 'OK') {

    $event['usuario_id'] = $this->checkUser($_SESSION['username']);

      if ($event['usuario_id']) {
        if($mysqli->createEvent($event)) {
          $response['message'] = 'OK';
        } else {
          $response['message'] = 'error';
          $response['description'] = 'Could not add the new event';
        }
      } else {
        $response['message'] = 'error';
        $response['description'] = 'Could not find the user id...';
      }

  } else {
    $response['message'] = 'error';
    $response['description'] = 'Could not connect to the db';
  }

  echo json_encode($response);
