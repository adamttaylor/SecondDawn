<div class="notifications">
	<!--<div class="notice-header">
		<div class="title"><?php _e( 'Notification', 'buddypress' ); ?></div>
		<div class="date"><?php _e( 'Date Received', 'buddypress' ); ?></div>
		<div class="actions"><?php _e( 'Actions',    'buddypress' ); ?></div>
	</div>-->

	<div class="notice-body">

		<?php while ( bp_the_notifications() ) : bp_the_notification(); ?>

			<ul class="notice-item item-list ">
				<li>
                    <div class="description"><?php bp_the_notification_description();  ?></div>
                    <div class="activity-time-since"><?php bp_the_notification_time_since();   ?></div>
                    <div class="activity-meta"><?php bp_the_notification_action_links(array('sep'=>'')); ?></div>
                    <div style="clear:both;width:100%;"></div>
                </li>
			</ul>

		<?php endwhile; ?>

	</div>
</div>