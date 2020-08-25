<?php 
	
	/**
	 * View Class
	 * @author Ilin Danil
	 */

	namespace app\core;

	class View {
		private $path;
		private $header;
		private $footer;
		public function Render ($fileName, $pageTitle) {
			$this->path = 'app/views/' . $fileName . '.php';
			$this->header = 'app/views/templates/header.php';
			$this->footer = 'app/views/templates/footer.php';
			$_SESSION['pageTitle'] = $pageTitle;
			$_SESSION['block-title'] = $blockName;
			$_SESSION['renderName'] = $functionOfBlockName;
			$_SESSION['isShow'] = $isShow;
			$el = explode('/', $_SERVER['REQUEST_URI'])[1] . '_model';
			if ($el == '_model') {
				$el = 'main' . $el;
			}
			$Model = new $el();
			include $this->header;
			include $this->path;
			include $this->footer;
		}
	}

 ?>