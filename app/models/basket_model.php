<?php 
  
  /**
   * basket_model
   * @author Ilin Danil
   */

  class basket_model extends app\core\Model {
    public function remove_one_from_basket($id) {
      $newInBasket = [];
      $isTaked = false;
      foreach ($_SESSION['user']['basket'] as $good) {
        if ($isTaked) {
          $newInBasket[] = $good;
        } elseif ($good['GoodId'] !== $_POST['id']) {
          $newInBasket[] = $good;
        } else {
          $isTaked = true;
        }
      }
      $_SESSION['user']['basket'] = $newInBasket;
      echo json_encode([ 'response' => true ]);
    }

    public function add_one_to_the_basket($id) {
      $_SESSION['user']['basket'][] = array(
        'GoodId' => $_POST['id'],
      );
      echo json_encode([ 'response' => true ]);
    }
  }
  
 ?>