<form action="<?php bp_messages_form_action('compose' ); ?>" method="post" id="send_message_form" class="standard-form" role="main" enctype="multipart/form-data">

	<?php do_action( 'bp_before_messages_compose_content' ); ?>

	<!--<label for="send-to-input"><?php _e("Send To (Username or Friend's Name)", 'buddypress' ); ?></label>-->
	<ul class="first acfb-holder">
		<li>
			<?php bp_message_get_recipient_tabs(); ?>
			<input type="text" name="send-to-input" class="send-to-input" id="send-to-input" placeholder="Send"/>
		</li>
	</ul>

	<?php if ( bp_current_user_can( 'bp_moderate' ) ) : ?>
		<input type="checkbox" id="send-notice" name="send-notice" value="1" /> <?php _e( "This is a notice to all users.", "buddypress" ); ?>
	<?php endif; ?>
 
	<!--<label for="subject"><?php _e( 'Subject', 'buddypress' ); ?></label>-->
	<input type="text" name="subject" id="subject" value="<?php bp_messages_subject_value(); ?>" placeholder="Subject"/>

	<!--<label for="content"><?php _e( 'Message', 'buddypress' ); ?></label>-->
	<textarea name="content" id="message_content" rows="15" cols="40" placeholder="Message Content"><?php bp_messages_content_value(); ?></textarea>

	<input type="hidden" name="send_to_usernames" id="send-to-usernames" value="<?php bp_message_get_recipient_usernames(); ?>" class="<?php bp_message_get_recipient_usernames(); ?>" />

	<?php do_action( 'bp_after_messages_compose_content' ); ?>

	<div class="submit">
		<button class="blue" type="submit" name="send" id="send" /><?php esc_attr_e( "Send Message", 'buddypress' ); ?></button>
	</div>

	<?php wp_nonce_field( 'messages_send_message' ); ?>
</form>

<script type="text/javascript">
	document.getElementById("send-to-input").focus();
</script>

