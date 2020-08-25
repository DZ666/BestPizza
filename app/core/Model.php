<?php 
	
	/**
	 * Model Class
	 * @author Ilin Danil
	 */

	namespace app\core;

	class Model {
		private $db;
		function __construct () {
			$host = 'localhost';
			$userName = 'root';
			$userPass = '';
			$dbName = 'best_pizza';
			$this->db = mysqli_connect($host, $userName, $userPass, $dbName);
		}

		public function query ($value) {
			return mysqli_query($this->db, $value);
		}
	}

 ?>