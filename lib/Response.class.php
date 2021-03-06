<?php

	namespace application\lib;

	class Response extends \caspar\core\Response
	{
		
		protected $_version = '0.4.502';

		protected $_fullscreen = false;

		public function setFullscreen($fullscreen = true)
		{
			$this->_fullscreen = $fullscreen;
		}
		
		public function isFullscreen()
		{
			return $this->_fullscreen;
		}

		public function getVersion()
		{
			return $this->_version;
		}

	}