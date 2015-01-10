<?php

/**
 * Forums Loop - Single Forum
 *
 * @package bbPress
 * @subpackage Theme
 */

?>

<ul id="bbp-forum-<?php bbp_forum_id(); ?>" <?php bbp_forum_class(); ?>>

	<li class="bbp-forum-info">

		<?php if ( bbp_is_user_home() && bbp_is_subscriptions() ) : ?>

			<span class="bbp-row-actions">

				<?php do_action( 'bbp_theme_before_forum_subscription_action' ); ?>

				<?php bbp_forum_subscription_link( array( 'before' => '', 'subscribe' => '+', 'unsubscribe' => '&times;' ) ); ?>

				<?php do_action( 'bbp_theme_after_forum_subscription_action' ); ?>

			</span>

		<?php endif; ?>

		<?php do_action( 'bbp_theme_before_forum_title' ); ?>

		<li class="bbp-header">
            <ul class="forum-titles">
                <li class="bbp-forum-info"><?php bbp_forum_title(); ?></a></li>
                <li class="bbp-forum-topic-count"><?php _e( 'Topics', 'bbpress' ); ?></li>
                <li class="bbp-forum-reply-count"><?php bbp_show_lead_topic() ? _e( 'Replies', 'bbpress' ) : _e( 'Posts', 'bbpress' ); ?></li>
                <li class="bbp-forum-freshness"><?php _e( 'Last Post', 'bbpress' ); ?></li>
            </ul>
    
        </li>

		<?php do_action( 'bbp_theme_after_forum_title' ); ?>

		<?php do_action( 'bbp_theme_before_forum_sub_forums' ); ?>
        
        <?php $sub_forums = bbp_forum_get_subforums( $r['forum_id'] );
		if ( !empty( $sub_forums ) ) {

			// Total count (for separator)
			$total_subs = count( $sub_forums );
			foreach ( $sub_forums as $sub_forum ) {
				$permalink = bbp_get_forum_permalink( $sub_forum->ID );
				$title     = bbp_get_forum_title( $sub_forum->ID );
				$lastpost  = bbp_get_topic_last_active_id($sub_forum->ID);
				$author	   = bbp_get_author_link( array( 'post_id' => $lastpost, 'type'=>'name'));
				$read	   = bbppu_user_has_read_forum($sub_forum->ID)? 'read' : 'unread';
				echo 
				'<div class="forum-item '.$read.'">					
					<div class="bbp-forum-info">
						<div class="text"><h3><a href="'.$permalink.'">'.$title.'</a></h3>
						<p>'.$sub_forum->post_content.'</p></div>
					</div>
					<div class="bbp-forum-topic-count">'.bbp_get_forum_topic_count( $sub_forum->ID ).'</div>
					<div class="bbp-forum-reply-count">'.bbp_get_forum_reply_count( $sub_forum->ID ).'</div>
					<div class="bbp-forum-freshness">'
						.($author? '<span class="author-name">'.$author.'</span><br/>' :'').
						'<span class="last-post-time">'.bbp_get_forum_freshness_link( $sub_forum->ID ).'</span>
					</div>
					<div class="clear"></div>
				</div>';
			}
		}
		?>

		
		<?php bbp_forum_row_actions(); ?>

	</li>
</ul><!-- #bbp-forum-<?php bbp_forum_id(); ?> -->
