<?php 

	namespace application\modules\ask;

	use \caspar\core\Request;

	/**
	 * Actions for the market module
	 */
	class Actions extends \caspar\core\Actions
	{

		/**
		 * Index page
		 *  
		 * @param Request $request
		 */
		public function runIndex(Request $request)
		{
			switch ($request['for']) {
				case 'game_invites':
					$invites = array();
					if ($this->getUser()->isAuthenticated()) {
						$game_invites = \application\entities\tables\GameInvites::getTable()->getInvitesByUserId($this->getUser()->getId(), $request->getParameter('invites', array()));
						foreach ($game_invites as $invite_id => $invite) {
							$invites[$invite_id] = array('player_name' => $invite->getFromPlayer()->getName(), 'game_id' => $invite->getGameId(), 'invite_id' => $invite->getId());
						}
					}
					return $this->renderJSON(array('invites' => $invites));
					break;
			}
			return $this->renderJSON(array('for' => $request['for']));
		}

	}