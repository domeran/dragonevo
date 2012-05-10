<?php $csp_response->setTitle('Dragon evo admin super powers!'); ?>
<div class="content left">
	<div class="menu-left">
		<img src="/images/swirl_top_right.png" class="swirl top-right">
		<img src="/images/swirl_bottom_right.png" class="swirl bottom-right">
		<img src="/images/swirl_bottom_left.png" class="swirl bottom-left">
		<img src="/images/swirl_top_left.png" class="swirl top-left">
		<h1>Manage site</h1>
		<ul>
			<li><a href="<?php echo make_url('admin_card_of_the_week'); ?>">Pick card of the week</a></li>
			<li><a href="#">Pick item of the week</a></li>
		</ul>
		<h1>Edit cards</h1>
		<ul>
			<?php foreach (array('event', 'creature', 'item', 'potion') as $type): ?>
				<li>
					<?php echo link_tag(make_url('edit_cards', array('card_type' => $type)), "Edit {$type} cards"); ?>
				</li>
			<?php endforeach; ?>
		</ul>
		<h1 style="margin-top: 25px;">Manage users</h1>
		<ul>
			<li><a href="#">Edit users</a></li>
		</ul>
		<h1 style="margin-top: 25px;">Manage games</h1>
		<ul>
			<li><a href="#">Show active games</a></li>
			<li><a href="#">Find finished games</a></li>
		</ul>
	</div>
</div>
<div class="content right">
	<div class="feature">
		<h6>Player statistics</h6>
		<p>
			<strong>Number of registered players:</strong> <?php echo application\entities\tables\Users::getTable()->getNumberOfRegisteredUsers(); ?><br>
			<strong>Number of logged in players:</strong> <?php echo application\entities\tables\Users::getTable()->getNumberOfLoggedInUsers(); ?><br>
			<br>
			<span class="faded_out">
				<strong>Players registered last 7 days:</strong> <?php echo application\entities\tables\Users::getTable()->getNumberOfRegisteredUsersLastWeek(); ?><br>
				<strong>Players registered last 24 hours:</strong> <?php echo application\entities\tables\Users::getTable()->getNumberOfRegisteredUsersLast24Hours(); ?><br>
				<br>
				<strong>Players logged in last 7 days:</strong> <?php echo application\entities\tables\Users::getTable()->getNumberOfLoggedInUsersLastWeek(); ?><br>
				<strong>Players logged in last 24 hours:</strong> <?php echo application\entities\tables\Users::getTable()->getNumberOfLoggedInUsersLast24Hours(); ?>
			</span>
		</p>
	</div>
	<div class="feature">
		<h5>Market statistics</h5>
		<p class="faded_out">
			<strong>Cards for sale right now:</strong> 0<br>
			<strong>Cards for trade right now:</strong> 0<br>
			<br>
			<strong>Cards sold last 24 hours:</strong> 0<br>
			<strong>Cards sold last 7 days:</strong> 0<br>
			<br>
			<strong>Market fee earned last 24 hours:</strong> 0 gold<br>
			<strong>Market fee earned last 7 days:</strong> 0 gold<br>
		</p>
	</div>
	<br style="clear: both;">
	<div class="feature">
		<h5>Game statistics</h5>
		<p class="faded_out">
			<strong>Games being played right now:</strong> 0<br>
			<strong>Games played last 24 hours:</strong> 0<br>
			<strong>Games played last 7 days:</strong> 0
		</p>
	</div>
	<div class="feature">
		<h5>Card statistics</h5>
		<p>
			<strong>Total number of cards:</strong> <?php echo $eventcards + $creaturecards + $itemcards; ?><br>
			<br>
			<strong>Number of Creature cards:</strong> <?php echo $creaturecards; ?><br>
			<strong>Number of Item cards:</strong> <?php echo $itemcards; ?><br>
			<strong>Number of Event cards:</strong> <?php echo $eventcards; ?>
		</p>
	</div>
</div>