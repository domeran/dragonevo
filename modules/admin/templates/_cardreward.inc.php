<li id="card_reward_<?php echo $reward->getId(); ?>"><a href="javascript:void(0);" onclick="Devo.Admin.removeCardReward(<?php echo $reward->getId(); ?>)" class="button button-standard" style="font-size: 0.9em; margin-right: 5px;"><img src="/images/spinning_16.gif" style="display: none;">Remove</a> <span class="card_name <?php if ($reward->getCard() instanceof application\entities\CreatureCard) echo $reward->getCard()->getFaction(); ?>"><?php echo $reward->getCard()->getName(); ?></span></li>