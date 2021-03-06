<?php 

	namespace application\modules\lobby;

	use \caspar\core\Request;

	/**
	 * Actions for the market module
	 */
	class Actions extends \caspar\core\Actions
	{

		public function preExecute(Request $request, $action)
		{
			if (!$this->getUser()->isAuthenticated()) {
				return $this->forward403();
			}
		}

		/**
		 * Index page
		 *  
		 * @param Request $request
		 */
		public function runIndex(Request $request)
		{
			$this->getResponse()->setFullscreen();
		}

		public function runGetLobbyContent(Request $request)
		{
			return $this->renderJSON(array('content' => $this->renderComponent('lobby/lobbycontent')));
		}

		public function runSay(Request $request)
		{
			try {
				$room = new \application\entities\ChatRoom($request['room_id']);
				if (trim($request->getRawParameter('text'))) {
					$room->say(stripslashes($request->getRawParameter('text')), $this->getUser()->getId());
				}
				return $this->renderJSON(array('say' => 'ok'));
			} catch (\Exception $e) {
				$this->getResponse()->setHttpStatus(400);
				return $this->renderJSON(array('error' => $e->getMessage()));
			}
		}

	}