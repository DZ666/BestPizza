<?php 
  
  /**
   * account_controller
   * @author Ilin Danil
   */

  class account_controller extends app\core\Controller {
    function index_action () {
      if (!$_SESSION["user"]["isAuthorized"]) {
        exit(header('Location: /auth'));
      }
      $this->View->Render("pages/account", "BestPizza - Account");
    }

    function get_orders_history_action () {
      if ( $_SESSION["user"]['isAuthorized'] === true ) {
        $Model = new account_model();
        $result = $Model->GetOrdersHistory();
        echo json_encode($result);
      } else {
        echo json_encode([ "response" => false ]);
      }
    }

  }
 ?>