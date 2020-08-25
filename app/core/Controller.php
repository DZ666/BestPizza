<?php 
	
	/**
	 * Controller Class
	 * @author Ilin Danil
	 */

	namespace app\core;

	class Controller {
		public $Model;
      public $View;
      public $curr_model;

      function __construct() {
        $this->Model = new Model();
        $this->View = new View();
        
        $el = explode('/', $_SERVER['REQUEST_URI'])[1] . '_model';
        if ($el == '_model') {
            $el = 'main' . $el;
        }
        // include 'app/models/' . $el . '.php';
        $this->curr_model = new $el();
        $_SESSION['AllUsers'] = mysqli_fetch_assoc($this->curr_model->query("SELECT COUNT(id) AS 'ALL' FROM users"))['ALL'];
      }

      public function CheckOnStatus ($Value) {
        if ($_SESSION['us_data']['status'] < $Value) {
          header('Location: /');
        } 
      }

      public function CheckOnError ($typeOfError ,$reason) {
        switch ($typeOfError) {
          case 'regOrLog':
            if (empty($_SESSION['us_data'])) {
              $_SESSION['errReason'] = $reason;
              header('Location: /info/Error');
            } 
            break;
          
          default:
            # code...
            break;
        }
      }

	}

 ?>