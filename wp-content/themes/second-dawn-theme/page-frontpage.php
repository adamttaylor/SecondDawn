<?php get_header('frontpage');
/*
	Template Name: Page - FrontPage
*/
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

    <div class="content_wrapper onepage_container">
        <div class="container">
            <div class="content_block <?php echo $gt3_theme_pagebuilder['settings']['layout-sidebars'] ?> row">
                <div
                    class="fl-container <?php echo(($gt3_theme_pagebuilder['settings']['layout-sidebars'] == "right-sidebar") ? "span9" : "span12"); ?>">
                    <div class="row">
                        <div
                            class="posts-block <?php echo(($gt3_theme_pagebuilder['settings']['layout-sidebars'] == "left-sidebar" || $gt3_theme_pagebuilder['settings']['layout-sidebars'] == "right-sidebar") ? "span9" : "span12"); ?>">
                            <div class="contentarea">

		<?php
            if (!isset($compile)) {
                $compile = '';
            }
			$menu_locations = get_nav_menu_locations();
			if (wp_get_nav_menu_object( $menu_locations['main_menu'])) {
				$main_menu = wp_get_nav_menu_object( $menu_locations['main_menu'] );
				$menu_items = wp_get_nav_menu_items($main_menu->term_id);
				$post_array = array();
				foreach($menu_items as $item) {
					if($item->object == 'page')
						$post_array[] = $item->object_id;
				}
				   
				$main_query = 
				new WP_Query(array('post_type' => 'page', 
					'post__in' => $post_array, 
					'posts_per_page' => count($post_array), 
					'orderby' => 'post__in' )
				);			
			} else {
				$main_query = 
				new WP_Query(array('post_type' => 'page', 
					'order' => 'ASC',
					'orderby' => 'menu_order',
					'posts_per_page' => '-1'
				));
				
			}

            while ($main_query->have_posts()) : $main_query->the_post();
				$gt3_theme_pagebuilder = get_post_meta(get_the_ID(), "pagebuilder", true);
				if ( is_array($gt3_theme_pagebuilder) && $gt3_theme_pagebuilder['settings']['standalone-page-status'] == 'No' ) {
					global $post;
					$post_slug = $post->post_name;
			?>
                	<div class="section_wrapper">
                        <a href="#<?php echo $post_slug ?>" class="go2page"></a>
                        <?php //var_dump($post); ?>
                        <section id="<?php echo $post_slug ?>" class="page_section">
                            <div class="page_body"><?php the_content(); ?></div>
                        </section>
                    </div>
            <?php } endwhile;?>

                            </div>
                            <!-- .contentarea -->
                        </div>
                        <?php get_sidebar('left'); ?>
                    </div>
                    <div class="clear"><!-- ClearFix --></div>
                </div>
                <!-- .fl-container -->
                <?php get_sidebar('right'); ?>
                <div class="clear"><!-- ClearFix --></div>
            </div>
        </div>
        <!-- .container -->
    </div><!-- .content_wrapper -->
	<div class="onepage_trigger">
   		<a href="javascript:void(0)" class="btn2top"></a>
    </div>
<?php get_footer(); ?>