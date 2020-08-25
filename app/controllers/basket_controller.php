<?php 
  
  /**
   * basket_controller
   * @author Ilin Danil
   */

  class basket_controller extends app\core\Controller {
    function index_action () {
      $this->View->Render('pages/basket', 'BestPizza - Basket');
    }

    function remove_one_action () {
      $Model = new basket_model();
      $result = $Model->remove_one_from_basket($_POST['id']);
      echo json_encode($result);
    }

    function add_one_to_the_basket_action () {
      $Model = new basket_model();
      $result = $Model->add_one_to_the_basket($_POST['id']);
      echo json_encode($result);
    }
  }
 ?>