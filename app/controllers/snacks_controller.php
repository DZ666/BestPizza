<?php 
  
  /**
   * snacks_controller
   * @author Ilin Danil
   */

  class snacks_controller extends app\core\Controller {
    function index_action () {
      $this->View->Render('pages/snacks', 'BestPizza - Snacks');
    }
  }
 ?>