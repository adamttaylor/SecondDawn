<?php

/**
 * BuddyPress - Members Loop
 *
 * Querystring is set via AJAX in _inc/ajax.php - bp_legacy_theme_object_filter()
 *
 * @package BuddyPress
 * @subpackage bp-legacy
 */

?>

<?php do_action( 'bp_before_members_loop' ); ?>

<?php if ( bp_has_members( bp_ajax_querystring( 'members' ) ) ) : ?>

	<div id="pag-top" class="pagination">

		<div class="pag-count" id="member-dir-count-top">

			<?php bp_members_pagination_count(); ?>

		</div>

		<div class="pagination-links" id="member-dir-pag-top">

			<?php bp_members_pagination_links(); ?>

		</div>

	</div>

	<?php do_action( 'bp_before_directory_members_list' ); ?>

	<ul id="members-list" class="item-list" role="main">

	<?php while ( bp_members() ) : bp_the_member(); ?>
		<li>
        	<div class="activity-header">
                <div class="activity-avatar">
                    <a href="<?php bp_member_permalink(); ?>"><?php bp_member_avatar(); ?></a>
                </div>
                <div class="top-right">
                	<a href="<?php bp_member_permalink(); ?>"><?php bp_member_name(); ?></a>					
                    <div class="item-meta"><span class="activity-time-since"><?php bp_member_last_active(); ?></span></div>
                    <?php do_action( 'bp_directory_members_item' ); ?>
                </div>
			</div>
            <div class="activity-content">
            	<?php if ( bp_get_member_latest_update() ) : ?>
					<div class="activity-inner"> <?php bp_member_latest_update(); ?></div>
				<?php endif; ?>
             </div>
             <div class="activity-meta">
             	<?php do_action( 'bp_directory_members_actions' ); ?>
            </div>
		</li>

	<?php endwhile; ?>

	</ul>

	<?php do_action( 'bp_after_directory_members_list' ); ?>

	<?php bp_member_hidden_fields(); ?>

	<div id="pag-bottom" class="pagination">

		<div class="pag-count" id="member-dir-count-bottom">

			<?php bp_members_pagination_count(); ?>

		</div>

		<div class="pagination-links" id="member-dir-pag-bottom">

			<?php bp_members_pagination_links(); ?>

		</div>

	</div>

<?php else: ?>

	<div id="message" class="info">
		<p><?php _e( "Sorry, no members were found.", 'buddypress' ); ?></p>
	</div>

<?php endif; ?>

<?php do_action( 'bp_after_members_loop' ); ?>
