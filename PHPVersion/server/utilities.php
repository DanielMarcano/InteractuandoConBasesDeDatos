<?php

session_start();

function return_value($variable) {
  if ($variable) {
    return $variable;
  } else {
    return '';
  }
}
