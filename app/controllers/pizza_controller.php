<?php 
  
  /**
   * pizza_controller
   * @author Ilin Danil
   */

  class pizza_controller extends app\core\Controller {
    function index_action () {
      $this->View->Render('pages/pizza.list', 'BestPizza - All Pizza');
    }
  }
 ?>