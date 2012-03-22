<fieldset>
	<legend>Basic details</legend>
	<div>
		<label for="card_name">Card name</label>
		<input type="text" name="name" id="card_name" value="<?php echo $card->getName(); ?>" placeholder="Enter the name of the card / character here">
	</div>
	<div>
		<label for="is_special_card">Special card</label>
		<select name="is_special_card" id="is_special_card">
			<option value="1"<?php if ($card->isSpecialCard()) echo ' selected'; ?>>Yes</option>
			<option value="0"<?php if (!$card->isSpecialCard()) echo ' selected'; ?>>No</option>
		</select>
	</div>
	<div>
		<label for="card_image">Card image</label>
		<input type="file" name="image" id="card_image">
	</div>
	<div>
		<label for="card_brief_description">Brief description</label>
		<input type="text" name="brief_description" class="long" id="card_brief_description" value="<?php echo $card->getBriefDescription(); ?>" placeholder="Enter a *short* description here">
	</div>
	<div>
		<label for="card_long_description">Long description</label>
		<textarea name="long_description" class="long" id="card_long_description" placeholder="Enter a long, descriptive text here. Feel free to add a short history."><?php echo $card->getLongDescription(); ?></textarea>
	</div>
</fieldset>
<fieldset>
	<legend>Getting hold of this card</legend>
	<div style="width: 480px; float: left; clear: none;">
		<div>
			<label for="card_cost">Card cost</label>
			<input type="text" name="cost" id="card_cost" value="<?php echo $card->getCost(); ?>" class="points"> gold
		</div>
	</div>
	<div style="width: 480px; float: left; clear: none;">
		<div>
			<label for="card_likelihood">Likelihood</label>
			<input type="text" name="likelihood" id="card_likelihood" value="<?php echo $card->getLikelihood(); ?>" class="points"> of 100
		</div>
	</div>
</fieldset>
<fieldset>
	<legend>Resources</legend>
	<div style="width: 480px; float: left; clear: none;">
		<div>
			<label for="gpt_player">GPT player</label>
			<select name="gpt_player">
				<option value="increase"<?php if (!$card->getGPTDecreasePlayer()) echo ' selected'; ?>>Increase by</option>
				<option value="decrease"<?php if ($card->getGPTDecreasePlayer()) echo ' selected'; ?>>Decrease by</option>
			</select>
			<input type="text" name="gpt_player_modifier" value="<?php echo $card->getGPTPlayerModifier(); ?>" class="points"> gold / turn
		</div>
		<div>
			<label for="gpt_opponent">GPT opponent</label>
			<select name="gpt_opponent">
				<option value="increase"<?php if (!$card->getGPTDecreaseOpponent()) echo ' selected'; ?>>Increase by</option>
				<option value="decrease"<?php if ($card->getGPTDecreaseOpponent()) echo ' selected'; ?>>Decrease by</option>
			</select>
			<input type="text" name="gpt_opponent_modifier" value="<?php echo $card->getGPTOpponentModifier(); ?>" class="points"> gold / turn
		</div>
	</div>
	<div style="width: 480px; float: left; clear: none;">
		<div>
			<label for="mpt_player">MPT player</label>
			<select name="mpt_player">
				<option value="increase"<?php if (!$card->getMPTDecreasePlayer()) echo ' selected'; ?>>Increase by</option>
				<option value="decrease"<?php if ($card->getMPTDecreasePlayer()) echo ' selected'; ?>>Decrease by</option>
			</select>
			<input type="text" name="mpt_player_modifier" value="<?php echo $card->getMPTPlayerModifier(); ?>" class="points"> magic / turn
		</div>
		<div>
			<label for="mpt_opponent">MPT opponent</label>
			<select name="mpt_opponent">
				<option value="increase"<?php if (!$card->getMPTDecreaseOpponent()) echo ' selected'; ?>>Increase by</option>
				<option value="decrease"<?php if ($card->getMPTDecreaseOpponent()) echo ' selected'; ?>>Decrease by</option>
			</select>
			<input type="text" name="mpt_opponent_modifier" value="<?php echo $card->getMPTOpponentModifier(); ?>" class="points"> magic / turn
		</div>
	</div>
</fieldset>