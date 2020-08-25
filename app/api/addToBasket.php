<?
  @session_start();
  $_SESSION['user']['basket'][] = array(
    'GoodId' => $_POST['GoodId'],
    'Valute' => $_POST['Valute'],
  );
  echo json_encode(array('all_data_in_the_basket' => count($_SESSION['user']['basket'])));
?>