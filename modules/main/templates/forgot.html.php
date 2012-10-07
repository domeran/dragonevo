<?php $csp_response->setTitle('Join Dragon Evo:TCG'); ?>
<div class="content login">
	<div class="menu-left<?php if ($csp_user->isAuthenticated()): ?> small<?php endif; ?>">
		<img src="/images/swirl_top_right.png" class="swirl top-right">
		<img src="/images/swirl_bottom_right.png" class="swirl bottom-right">
		<img src="/images/swirl_bottom_left.png" class="swirl bottom-left">
		<img src="/images/swirl_top_left.png" class="swirl top-left">
		<?php if ($csp_user->isAuthenticated()): ?>
			<h4>You are already logged in</h4>
			<p style="padding-left: 30px;">
				Click to <a href="<?php echo make_url('logout'); ?>">log out</a>.
			</p>
		<?php else: ?>
			<h1>Forgot your password?</h1>
			<p>
				Enter your username or email address here.
			</p>
			<p>
				We'll send you an email with instructions on how to generate a new password
			</p>
			<?php if (isset($error) && $error): ?>
				<p class="error" style="margin-bottom: 10px;">
					<?php echo $error; ?>
				</p>
			<?php endif; ?>
			<form accept-charset="utf-8" action="<?php echo make_url('join'); ?>" method="post" id="login_form" <?php /*onsubmit="Devo.Main.Login.login('<?php echo make_url('login'); ?>'); return false;" */ ?>>
				<dt>
					<label class="login_fieldheader" for="desired_username"><?php echo __('Username'); ?></label>
				</dt>
				<dd>
					<input type="text" id="desired_username" name="desired_username" style="width: 200px;" value="<?php echo $csp_request['desired_username']; ?>">
				</dd>
				<dt>
					<label class="login_fieldheader" for="email"><?php echo __('Your email address'); ?></label>
				</dt>
				<dd>
					<input type="text" id="email" name="email" style="width: 200px;" value="<?php echo $csp_request['email']; ?>">
				</dd>
				<dt>
					<label class="login_fieldheader" for="desired_password"><?php echo __('Password'); ?></label>
				</dt>
				<dd>
					<input type="password" id="desired_password" name="desired_password_1" style="width: 200px;">
				</dd>
				<dt>
					<label class="login_fieldheader" for="desired_password_2"><?php echo __('Password'); ?> (repeat)</label>
				</dt>
				<dd>
					<input type="password" id="desired_password_2" name="desired_password_2" style="width: 200px;">
				</dd>
				<div style="padding: 20px 35px 20px 0; text-align: right;">
					<input type="submit" id="login_button" value="<?php echo __('Continue'); ?>" style="font-size: 1em;">
					<span id="login_indicator" style="display: none;"><?php echo image_tag('/images/spinning_20.gif'); ?></span>
				</div>
			</form>
		<?php endif; ?>
	</div>
</div>
