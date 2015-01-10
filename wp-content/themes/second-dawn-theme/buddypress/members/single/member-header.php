<?php

/**
 * BuddyPress - Users Header
 *
 * @package BuddyPress
 * @subpackage bp-legacy
 */

?>

<?php do_action( 'bp_before_member_header' ); ?>



<div id="item-header-content">
    <div class="top-contents">
        <div id="item-header-avatar">
            <a href="<?php bp_displayed_user_link(); ?>">
        
                <?php bp_displayed_user_avatar( 'type=full' ); ?>
        
            </a>
        </div><!-- #item-header-avatar -->
        <div class="top-right-content">
            <?php if ( bp_is_active( 'activity' ) && bp_activity_do_mentions() ) : ?>
                <!--<h2 class="user-nicename">@<?php bp_displayed_user_mentionname(); ?></h2>-->
                <h2 class="user-nicename"><?php echo get_the_author_meta('display_name',bp_displayed_user_id())?></h2><span class="mention-name">(@<?php bp_displayed_user_mentionname(); ?>)</span>
            <?php endif; ?>
        
            <span class="activity"><?php bp_last_activity( bp_displayed_user_id() ); ?></span>
        	<div id="item-buttons">
    
                <?php do_action( 'bp_member_header_actions' ); ?>
    
            </div><!-- #item-buttons -->
            <?php do_action( 'bp_before_member_header_meta' ); ?>
        </div>
	</div>
	<div id="item-meta">

		<?php if ( bp_is_active( 'activity' ) ) : ?>

			<div id="latest-update">

				<?php bp_activity_latest_update( bp_displayed_user_id() ); ?>

			</div>

		<?php endif; ?>

		

		<?php
		/***
		 * If you'd like to show specific profile fields here use:
		 * bp_member_profile_data( 'field=About Me' ); -- Pass the name of the field
		 */
		 do_action( 'bp_profile_header_meta' );

		 ?>

	</div><!-- #item-meta -->

</div><!-- #item-header-content -->

<?php do_action( 'bp_after_member_header' ); ?>

<?php do_action( 'template_notices' ); ?>