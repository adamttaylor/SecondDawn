<?php if ( bp_group_has_members( bp_ajax_querystring( 'group_members' ) ) ) : ?>

	<?php do_action( 'bp_before_group_members_content' ); ?>

	<div id="pag-top" class="pagination">

		<div class="pag-count" id="member-count-top">

			<?php bp_members_pagination_count(); ?>

		</div>

		<div class="pagination-links" id="member-pag-top">

			<?php bp_members_pagination_links(); ?>

		</div>

	</div>

	<?php do_action( 'bp_before_group_members_list' ); ?>

	<ul id="member-list" class="item-list" role="main">
		<?php while ( bp_group_members() ) : bp_group_the_member(); ?>

			<li class="notice-item">
            	<div class="activity-header">
					<div class="activity-avatar">
                    <a href="<?php bp_group_member_domain(); ?>">
    
                        <?php bp_group_member_avatar_thumb(); ?>
    
                    </a>
                    </div>               
                    <div class="top-right">
                        <span><?php bp_group_member_link(); ?></span>
                        <div class="second-line">
                            <span class="view activity-time-since"><?php bp_group_member_joined_since(); ?></span>
                        </div>
                    </div>
                </div>
                <div class="activity-inner"></div>
                <div class="activity-meta">
					<?php do_action( 'bp_group_members_list_item' ); ?>
    
                    <?php if ( bp_is_active( 'friends' ) ) : ?>
    
                   		<?php bp_add_friend_button( bp_get_group_member_id(), bp_get_group_member_is_friend() ); ?>
    
                        <?php do_action( 'bp_group_members_list_item_action' ); ?>
    
                    <?php endif; ?>
                </div>
			</li>

		<?php endwhile; ?>

	</ul>

	<?php do_action( 'bp_after_group_members_list' ); ?>

	<div id="pag-bottom" class="pagination">

		<div class="pag-count" id="member-count-bottom">

			<?php bp_members_pagination_count(); ?>

		</div>

		<div class="pagination-links" id="member-pag-bottom">

			<?php bp_members_pagination_links(); ?>

		</div>

	</div>

	<?php do_action( 'bp_after_group_members_content' ); ?>

<?php else: ?>

	<div id="message" class="info">
		<p><?php _e( 'This group has no members.', 'buddypress' ); ?></p>
	</div>

<?php endif; ?>
