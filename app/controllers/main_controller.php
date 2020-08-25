<?php 
	
	/**
	 * main_controller
	 * @author Ilin Danil
	 */

	class main_controller extends app\core\Controller {
    function index_action () {
      $this->View->Render('pages/main', 'BestPizza - The Best Pizza Delivery Service');
    }
	}
 ?>