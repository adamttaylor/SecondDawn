<?php

/**
 * Topics Loop
 *
 * @package bbPress
 * @subpackage Theme
 */

?>

<?php do_action( 'bbp_template_before_topics_loop' ); ?>

<ul id="bbp-forum-<?php bbp_forum_id(); ?>" class="bbp-topics">

	<li class="bbp-header">
		
		<div class="forum-titles">
			<div class="bbp-topic-title">
             <?php if(is_user_logged_in()): ?>
            	<button class="fa fa-plus new-topic">New Topic</button>
            <?php endif; ?>
            </div>
			<div class="right-hand"><div class="bbp-topic-voice-count"><?php _e( 'Voices', 'bbpress' ); ?></div>
            <div class="bbp-topic-reply-count"><?php bbp_show_lead_topic() ? _e( 'Replies', 'bbpress' ) : _e( 'Posts', 'bbpress' ); ?></div>
            <div class="bbp-topic-freshness"><?php _e( 'Last Post', 'bbpress' ); ?></div>
            </div>
		</div>

	</li>

	<li class="bbp-body">

		<?php while ( bbp_topics() ) : bbp_the_topic(); ?>

			<?php bbp_get_template_part( 'loop', 'single-topic' ); ?>

		<?php endwhile; ?>

	</li>
	
    <li class="bbp-header bottom">
		
		<div class="forum-titles">
			<div class="bbp-topic-title">
             <?php if(is_user_logged_in()): ?>
             	<button class="fa fa-plus new-topic">New Topic</button>
             <?php endif;?>
             </div>
			<div class="right-hand"><div class="bbp-topic-voice-count"><?php _e( 'Voices', 'bbpress' ); ?></div><div class="bbp-topic-reply-count"><?php bbp_show_lead_topic() ? _e( 'Replies', 'bbpress' ) : _e( 'Posts', 'bbpress' ); ?></div><div class="bbp-topic-freshness"><?php _e( 'Last Post', 'bbpress' ); ?></div>
            </div>
		</div>

	</li>
    
</ul><!-- #bbp-forum-<?php bbp_forum_id(); ?> -->

<?php do_action( 'bbp_template_after_topics_loop' ); ?>
