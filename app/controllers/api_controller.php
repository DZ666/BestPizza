<?php 
  
  /**
   * API_controller
   * @author Ilin Danil
   */

  class api_controller extends app\core\Controller {
    function index_action () {
      echo json_encode(array("success" => true));
    }

    function getGoods_action ($data) {
      $Model = new api_model();
      $goods = $Model->allGoods();
      echo json_encode(array($goods));
    }

    function get_ordered_goods_action ($data) {
      $Model = new api_model();
      $result = $Model->GetAllOrderedGoods();
      echo json_encode($result);
    }

    function removeToBasket_action ($data) {
      $Model = new api_model();
      $result = $Model->removeToBasket();
      echo json_encode($result);
    }

    function createNewOrder_action () {
      $Model = new api_model();
      $NewOrderRequest = $Model->CreateNewOrder($_POST);
      if ($NewOrderRequest) {
        $Model->removeAllFromBasket();
      }
      if ($NewOrderRequest) {
        echo json_encode([ 'response' => true ]);
      } else {
        echo json_encode([ 'response' => false ]);
      }
    }
  }
 ?>