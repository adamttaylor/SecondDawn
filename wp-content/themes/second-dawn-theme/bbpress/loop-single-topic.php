<?php

/**
 * Topics Loop - Single
 *
 * @package bbPress
 * @subpackage Theme
 */
if(function_exists('bbp_pencil_unread')){
	$read = bbppu_user_has_read_topic(bbp_get_topic_id())? 'read' : 'unread';
	$editlink = '<span class="edit-topic">'.bbp_get_topic_edit_link(array('edit_text'=>'')).'</span>';
}
?>
<div id="bbp-topic-<?php bbp_topic_id(); ?>" <?php bbp_topic_class(0,array("forum-item",$read));?> >					
	<div class="bbp-forum-info">
		<div class="text"><h3><a href="<?php bbp_topic_permalink(); ?>"><?php bbp_topic_title();?></a><?php echo $editlink;?></h3>
		<p class="author-name"><?php printf( __( 'by: %1$s', 'bbpress' ), bbp_get_topic_author_link( array( 'size' => '14' ) ) ); echo ' &raquo; '.bbp_get_topic_post_date();?> </p></div>
	</div>
	<div class="bbp-forum-topic-count"><?php bbp_topic_voice_count(); ?></div>
	<div class="bbp-forum-reply-count"><?php bbp_show_lead_topic() ? bbp_topic_reply_count() : bbp_topic_post_count(); ?></div>
	<div class="bbp-forum-freshness">
           <div class="bbp-topic-meta">
               <span class="author-name"><?php bbp_author_link( array( 'post_id' => bbp_get_topic_last_active_id(), 'type'=>'name') ); ?></span><br/>
               <span class="last-post-time"><?php echo bbp_get_forum_freshness_link( bbp_get_topic_id() );?></span>
           </div>            
           <span class="bbp-topic-freshness-author-av"><?php bbp_author_link( array( 'post_id' => bbp_get_topic_last_active_id(), 'size' => 30, 'type'=>'avatar') ); ?></span>
	</div>
	<div class="clear"></div>
</div><!-- #bbp-topic-<?php bbp_topic_id(); ?> -->
