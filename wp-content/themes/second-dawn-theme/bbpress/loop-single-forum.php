<?php

/**
 * Forums Loop - Single Forum
 *
 * @package bbPress
 * @subpackage Theme
 */
$permalink = bbp_get_forum_permalink();
$title     = bbp_get_forum_title();
$lastpost  = bbp_get_topic_last_active_id(bbp_get_forum_id());
$author	   = bbp_get_author_link( array( 'post_id' => $lastpost, 'type'=>'name'));
$read	   = bbppu_user_has_read_forum(bbp_get_forum_id())? 'read' : 'unread';

?>
<!-- loop-single-forum -->
<div id="bbp-forum-<?php bbp_forum_id(); ?>" <?php bbp_forum_class(0,array('forum-item',$read)); ?>>
	<?php if ( bbp_is_user_home() && bbp_is_subscriptions() ) : ?>
		<span class="bbp-row-actions">
			<?php do_action( 'bbp_theme_before_forum_subscription_action' ); ?>
			<?php bbp_forum_subscription_link( array( 'before' => '', 'subscribe' => '+', 'unsubscribe' => '&times;' ) ); ?>
			<?php do_action( 'bbp_theme_after_forum_subscription_action' ); ?>
		</span>
	<?php endif; ?>
	<?php do_action( 'bbp_theme_before_forum_title' ); ?>
        
	<?php
		
		echo 
		'					
			<div class="bbp-forum-info">
				<div class="text"><h3><a href="'.$permalink.'">'.$title.'</a></h3>
				<p>'.bbp_get_forum_content().'</p></div>
			</div>
			<div class="bbp-forum-topic-count">'.bbp_get_forum_topic_count(  ).'</div>
			<div class="bbp-forum-reply-count">'.bbp_get_forum_reply_count(  ).'</div>
			<div class="bbp-forum-freshness">'
				.($author? '<span class="author-name">'.$author.'</span><br/>' :'').
				'<span class="last-post-time">'.bbp_get_forum_freshness_link(  ).'</span>
			</div>
			<div class="clear"></div>
		';
	?>

	<?php do_action( 'bbp_theme_after_forum_title' ); ?>

	<?php do_action( 'bbp_theme_before_forum_sub_forums' ); ?>

	<?php bbp_list_forums(); ?>

	<?php do_action( 'bbp_theme_after_forum_sub_forums' ); ?>

	<?php bbp_forum_row_actions(); ?>

</div><!-- #bbp-forum-<?php bbp_forum_id(); ?> -->
<!-- loop-single-forum -->