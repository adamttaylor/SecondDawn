<?php do_action( 'bp_before_member_messages_loop' ); ?>

<?php if ( bp_has_message_threads( bp_ajax_querystring( 'messages' ) ) ) : ?>

	<div class="pagination no-ajax" id="user-pag">

		<div class="pag-count" id="messages-dir-count">
			<?php bp_messages_pagination_count(); ?>
		</div>

		<div class="pagination-links" id="messages-dir-pag">
			<?php bp_messages_pagination(); ?>
		</div>

	</div><!-- .pagination -->

	<?php do_action( 'bp_after_member_messages_pagination' ); ?>

	<?php do_action( 'bp_before_member_messages_threads'   ); ?>

	<ul id="message-threads" class="messages-notices item-list">
		<?php while ( bp_message_threads() ) : bp_message_thread(); ?>

			<li id="m-<?php bp_message_thread_id(); ?>" class="notice-item  <?php bp_message_css_class(); ?><?php if ( bp_message_thread_has_unread() ) : ?> unread<?php else: ?> read<?php endif; ?>">
				<div class="thread-options">
					<input type="checkbox" name="message_ids[]" value="<?php bp_message_thread_id(); ?>" />					
				</div>
                <div class="profile">
					<div class="activity-header">
                    	<span class="unread-count"><?php bp_message_thread_unread_count(); ?></span>
                        <div class="activity-avatar"><?php bp_message_thread_avatar(); ?></div>
    
                        <?php if ( 'sentbox' != bp_current_action() ) : ?>
                            <div class="top-right">
                                <?php bp_message_thread_from(); ?>
                                <div class="second-line">
                                	<span class="subject"><a href="<?php bp_message_thread_view_link(); ?>" title="<?php esc_attr_e( "View Message", "buddypress" ); ?>"><?php bp_message_thread_subject(); ?></a></span>
                                    <span class="activity"><?php bp_message_thread_last_post_date(); ?></span>
                                </div>
                            </div>
                        <?php else: ?>
                            <div class="top-right">
                                <?php bp_message_thread_to(); ?>
                                <div class="second-line">
                                	<span class="subject"><a href="<?php bp_message_thread_view_link(); ?>" title="<?php esc_attr_e( "View Message", "buddypress" ); ?>"><?php bp_message_thread_subject(); ?></a></span>
                                    <span class="view activity-time-since"><?php bp_message_thread_last_post_date(); ?></span>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
				<div class="activity-inner">
					
					<p class="thread-excerpt"><?php bp_message_thread_excerpt(); ?></p>
				</div>
				<div class="activity-meta">
                	<a class="button confirm" href="<?php bp_message_thread_delete_link(); ?>" title="<?php esc_attr_e( "Delete Message", "buddypress" ); ?>"><?php _e( 'Delete', 'buddypress' ); ?></a> &nbsp;<a class="button" href="<?php bp_message_thread_view_link()?>">Read >></a>
                </div>
				<?php do_action( 'bp_messages_inbox_list_item' ); ?>

				
			</li>
		<?php endwhile; ?>
	</ul><!-- #message-threads -->

	<div class="messages-options-nav">
		<?php bp_messages_options(); ?>
	</div><!-- .messages-options-nav -->

	<?php do_action( 'bp_after_member_messages_threads' ); ?>

	<?php do_action( 'bp_after_member_messages_options' ); ?>

<?php else: ?>

	<div id="message" class="info">
		<p><?php _e( 'Sorry, no messages were found.', 'buddypress' ); ?></p>
	</div>

<?php endif;?>

<?php do_action( 'bp_after_member_messages_loop' ); ?>
