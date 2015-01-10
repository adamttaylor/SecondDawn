    </div><!-- .main_wrapper -->
	
	<?php if (gt3_get_theme_option("footer_widgets_area") == "on") { ?>
    <div class="pre_footer paralax">
        <!--<div class="container">-->
            <aside id="footer_bar" class="row">
				<?php get_sidebar('footer'); ?>
            </aside>
        <!--</div>-->
    </div><!-- .pre_footer -->
	<?php } ?>

    <footer>
        <div class="footer_line">
            <!--<div class="socials">
            	<div class="container">
                    <ul class="socials_list">
                        <?php echo gt3_socsm("social_facebook", $class = "ico_social-facebook", $title = "Facebook"); ?>
                        <?php echo gt3_socsm("social_vimeo", $class = "ico_social-vimeo", $title = "Vimeo"); ?>
                        <?php echo gt3_socsm("social_tumblr", $class = "ico_social-tumblr", $title = "Tumblr"); ?>
                        <?php echo gt3_socsm("social_twitter", $class = "ico_social-twitter", $title = "Twitter"); ?>
                        <?php echo gt3_socsm("social_delicious", $class = "ico_social-delicious", $title = "Delicious"); ?>
                        <?php echo gt3_socsm("social_flickr", $class = "ico_social-flickr", $title = "Flickr"); ?>
                        <?php echo gt3_socsm("social_pinterest", $class = "ico_social-pinterest", $title = "Pinterest"); ?>
                        <?php echo gt3_socsm("social_dribbble", $class = "ico_social-dribbble", $title = "Dribbble"); ?>
                        <?php echo gt3_socsm("social_linked_in", $class = "ico_social-linked", $title = "LinkedIn"); ?>
                        <?php echo gt3_socsm("social_youtube", $class = "ico_social-youtube", $title = "YouTube"); ?>
                        <?php echo gt3_socsm("social_gplus", $class = "ico_social-gplus", $title = "Google Plus"); ?>
                        <?php echo gt3_socsm("social_instagram", $class = "ico_social-instagram", $title = "Instagram"); ?>
                    </ul>
                </div>
            </div>-->
        	<div class="copyright">				
				<div class="container"><?php gt3_the_theme_option("copyright"); ?></div>
            </div>
            <div class="clear"></div>
        </div>
    </footer>
    <?php add_this();?>
	<?php gt3_the_theme_option("code_before_body"); wp_footer(); ?>
</div><!--innderbody-->
</body>
</html>