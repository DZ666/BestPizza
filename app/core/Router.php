<?php 
	
	/**
	 * Router Class
	 * @author Ilin Danil
	 */

	namespace app\core;

	class Router {
		static function start () {
			// Getting Origin And Path
			$http = explode('/', $_SERVER['REQUEST_URI']);
			$http[2] = explode('?', $http[2])[0];

			// Default Controller And Action
			$controller_name = 'main';
			$action_name = 'index';

			// Getting Controller And Action Name
			if ( !empty($http[1]) ) $controller_name = $http[1]; 
			if ( !empty($http[2]) ) $action_name = $http[2]; 

			// Add Prefixes
			$model_name = strtolower($controller_name) . '_model';
			$controller_name = strtolower($controller_name) . '_controller';
			$action_name = strtolower($action_name) . '_action';

			// Add File With Model Class
			$model_file = $model_name . '.php';
			$model_path = "app/models/" . $model_file;
			if(file_exists($model_path))
			{
				include $model_path;				
			}

			// Add File With Controller Class
			$controller_file = strtolower($controller_name).'.php';
			$controller_path = "app/controllers/".$controller_file;
			if(file_exists($controller_path))
			{
				include "app/controllers/".$controller_file;
			}

			// Create Controller
			$controller = new $controller_name;
			$action = $action_name;
			
			if(method_exists($controller, $action))
			{
				// Call Controller Action
				$controller->$action(explode('&', explode('?', $_SERVER['REQUEST_URI'])[1]));
			}
		}
	}

 ?>