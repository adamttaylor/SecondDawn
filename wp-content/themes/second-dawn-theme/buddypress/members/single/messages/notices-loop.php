<?php do_action( 'bp_before_notices_loop' ); ?>

<?php if ( bp_has_message_threads() ) : ?>

	<div class="pagination no-ajax" id="user-pag">

		<div class="pag-count" id="messages-dir-count">
			<?php bp_messages_pagination_count(); ?>
		</div>

		<div class="pagination-links" id="messages-dir-pag">
			<?php bp_messages_pagination(); ?>
		</div>

	</div><!-- .pagination -->

	<?php do_action( 'bp_after_notices_pagination' ); ?>
	<?php do_action( 'bp_before_notices' ); ?>

	<ul id="message-threads" class="messages-notices item-list">
		<?php while ( bp_message_threads() ) : bp_message_thread(); ?>
			<li id="notice-<?php bp_message_notice_id(); ?>" class="<?php bp_message_css_class(); ?>">
            <div class="notice-active">
				<?php if ( bp_messages_is_active_notice() ) : ?>
					<strong><?php bp_messages_is_active_notice(); ?></strong>
				<?php endif; ?>	
			</div>
            <div class="activity-head">
            	<strong><?php bp_message_notice_subject(); ?></strong>
                <span class="activity-time-since"><?php _e( 'Sent:', 'buddypress' ); ?> <?php bp_message_notice_post_date(); ?></span>
            </div>
            <div class="activity-content">
           		<div class="activity-inner">
					<?php bp_message_notice_text(); ?>
                   
            	</div>
            	<div class="activity-meta">
					<a class="button" href="<?php bp_message_activate_deactivate_link(); ?>" class="confirm"><?php bp_message_activate_deactivate_text(); ?></a>
					<a class="button" href="<?php bp_message_notice_delete_link(); ?>" class="confirm" title="<?php esc_attr_e( "Delete Message", "buddypress" ); ?>">Delete</a>
            	</div>
            </div>
			
				

				<?php do_action( 'bp_notices_list_item' ); ?>
				
			</li>
		<?php endwhile; ?>
	</ul><!-- #message-threads -->

	<?php do_action( 'bp_after_notices' ); ?>

<?php else: ?>

	<div id="message" class="info">
		<p><?php _e( 'Sorry, no notices were found.', 'buddypress' ); ?></p>
	</div>

<?php endif;?>

<?php do_action( 'bp_after_notices_loop' ); ?>