<?php get_header();
the_post();

/* LOAD PAGE BUILDER ARRAY */
$gt3_theme_pagebuilder = gt3_get_theme_pagebuilder(get_the_ID());
$pf = get_post_format();
if (empty($pf)) $pf = "text";
$pfIcon = gt3_get_pf_icon($pf);
$featured_image = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'single-post-thumbnail');
gt3_the_pb_custom_bg_and_color($gt3_theme_pagebuilder);
$gt3_current_page_sidebar = $gt3_theme_pagebuilder['settings']['layout-sidebars'];
?>

    <div class="content_wrapper page">
        <?php if ($gt3_theme_pagebuilder['settings']['show_breadcrumb_area'] !== "no" && gt3_get_theme_option("show_breadcrumb_area") !== "no") { ?>
            <div class="page_title_block paralax">
                <div class="container">
                    <h1 class="title"><?php the_title(); ?></h1>
                    <?php gt3_the_breadcrumb(); ?>
                </div>
            </div>
        <?php } 
		if ( $gt3_theme_pagebuilder['settings']['standalone-page-status'] == 'No' ) {
			$top_padding = 'disable-padding';
		} else {
			$top_padding = '';
		}
		?>
        <div class="container">
        <?php if(memberAccess(false)):?>
             <!--<div class="content_block <?php echo $gt3_theme_pagebuilder['settings']['layout-sidebars'] ?> row <?php echo $top_padding ?>">
               <div
                    class="fl-container <?php echo(($gt3_theme_pagebuilder['settings']['layout-sidebars'] == "right-sidebar") ? "span9" : "span12"); ?>">
                    <div class="row">
                        <div
                            class="posts-block <?php echo(($gt3_theme_pagebuilder['settings']['layout-sidebars'] == "left-sidebar" || $gt3_theme_pagebuilder['settings']['layout-sidebars'] == "right-sidebar") ? "span9" : "span12"); ?>">-->
                            <div class="contentarea">

                                <?php
                                echo '<div class="row-fluid"><div class="span12">';
                                the_content(__('Read more!', 'theme_localization'));
                                echo '</div><div class="clear"></div></div>';

                                wp_link_pages(array('before' => '<div class="page-link"><span>' . __('Pages', 'theme_localization') . ': </span>', 'after' => '</div>'));
                                ?>

                            </div>
                            <!-- .contentarea -->
                        <!--</div>
                        <?php get_sidebar('left'); ?>
                    </div>
                    <div class="clear"><!-- ClearFix --</div>
                </div>
                <!-- .fl-container --
                <?php get_sidebar('right'); ?>
                <div class="clear"><!-- ClearFix --</div>
           <!-- </div> -->
        <?php else:?>
        <h1>You must be a member to access this page</h1>
        <?php endif;?>
        </div>
        <!-- .container -->
    </div><!-- .content_wrapper -->

<?php get_footer(); ?>