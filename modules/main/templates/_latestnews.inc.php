<div class="content left">
	<div class="menu-left">
		<img src="/images/swirl_top_right.png" class="swirl top-right">
		<img src="/images/swirl_bottom_right.png" class="swirl bottom-right">
		<img src="/images/swirl_bottom_left.png" class="swirl bottom-left">
		<img src="/images/swirl_top_left.png" class="swirl top-left">
		<h1>Latest news</h1>
		<ul>
			<?php if (!count($latest_news)): ?>
				<p class="faded_out">
					No news posted yet
				</p>
			<?php else: ?>
				<?php foreach ($latest_news as $news): ?>
					<li>
						<a href="<?php echo ($news->hasUrl()) ? $news->getUrl() : make_url('news', array('year' => $news->getYear(), 'month' => $news->getMonth(), 'day' => $news->getDay(), 'id' => $news->getId(), 'title' => $news->getKey())); ?>"><?php echo $news->getTitle(); ?></a><br>
						<time><?php echo ($news->getCreatedAt() >= mktime(0, 0, 1)) ? 'Today' : date('dS M', $news->getCreatedAt()); ?>, <?php echo date('H:i', $news->getCreatedAt()); ?></time>
					</li>
				<?php endforeach; ?>
			<?php endif; ?>
			<?php /*<li>
				<a href="<?php echo make_url('media'); ?>">New media posted</a><br>
				<time>Today, 17:00</time>
			</li>
			<li>
				<a href="http://www.dragonevo.com">New website launched</a><br>
				<time>8th April, 15:00</time>
			</li>
			<li>
				<a href="<?php echo make_url('unavailable'); ?>">Indiegogo campaign closed</a><br>
				<time>8th April, 08:00</time>
			</li>
			<li>
				<a href="https://twitter.com/#!/dragonevotcg">Follow us on Twitter!</a><br>
				<time>5th April, 2012</time>
			</li>
			<li>
				<a href="https://plus.google.com/105501147172105536563">We're on Google+</a><br>
				<time>5th April, 2012</time>
			</li>
			<li>
				<a href="https://www.facebook.com/DragonEvoThecardgame">Dragon Evo TCG is on Facebook</a><br>
				<time>30th March, 2012</time>
			</li>
			<li>
				<a href="#">Dragon Evo TCG relaunch</a><br>
				<time>25th February, 2012</time>
			</li> */ ?>
		</ul>
	</div>
	<h5>Follow us</h5>
	<p>
		Please follow us on your favourite social network, and let us know what you think!
	</p>
	<div class="social-buttons">
		<a href="https://www.facebook.com/DragonEvoThecardgame" title="Like us on Facebook!"><img src="/images/facebook.png" alt="[F]"></a>
		<a href="https://plus.google.com/105501147172105536563" title="Add us to your circles on Google+"><img src="/images/google.png" alt="[G+]"></a>
		<a href="https://twitter.com/dragonevotcg" title="Follow us on twitter!"><img src="/images/twitter.png" alt="[T]"></a>
	</div>
</div>