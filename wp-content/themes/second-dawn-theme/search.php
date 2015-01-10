<?php get_header();
#Emulate default settings for page without personal ID
$gt3_theme_pagebuilder = gt3_get_default_pb_settings();
gt3_the_pb_custom_bg_and_color($gt3_theme_pagebuilder);
$gt3_current_page_sidebar = $gt3_theme_pagebuilder['settings']['layout-sidebars'];

?>

<div class="content_wrapper search">
    <?php if (gt3_get_theme_option("show_breadcrumb_area") !== "no") { ?>
        <div class="page_title_block">
            <div class="container">
                <?php gt3_the_breadcrumb(); ?>
            </div>
        </div>
    <?php } ?>
    <div class="container">
        <div class="content_block <?php echo $gt3_theme_pagebuilder['settings']['layout-sidebars'] ?> row">
            <div class="fl-container <?php echo (($gt3_theme_pagebuilder['settings']['layout-sidebars'] == "right-sidebar") ? "span9" : "span12"); ?>">
                <div class="row">
                    <div class="posts-block <?php echo (($gt3_theme_pagebuilder['settings']['layout-sidebars'] == "left-sidebar" || $gt3_theme_pagebuilder['settings']['layout-sidebars'] == "right-sidebar") ? "span9" : "span12"); ?>">
                        <div class="contentarea">
                            <?php
                            echo '<div class="row-fluid"><div class="span12 module_cont module_blog search_results">';

                            global $paged;
                            $foundSomething = false;

                            if ($paged < 1) {
                                $args = array(
                                    'numberposts' => -1,
                                    'post_type' => 'any',
                                    'meta_query' => array(
                                        array(
                                            'key' => 'pagebuilder',
                                            'value' => get_search_query(),
                                            'compare' => 'LIKE',
                                            'type' => 'CHAR'
                                        )
                                    )
                                );
                                $query = new WP_Query( $args );
                                while ($query->have_posts()) : $query->the_post();
									$pf = get_post_format();
									if (empty($pf)) $pf = "text";
									$pfIcon = gt3_get_pf_icon($pf);
									$featured_image = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'single-post-thumbnail');
									$gt3_theme_pagebuilder = gt3_get_theme_pagebuilder(get_the_ID());
									
									$post_categ = '';
									$separator = ', ';
									if(get_the_tags() !== '') {
										$posttags = get_the_tags();
									}
									if ($posttags) {
										$post_tags = '';
										$post_tags_compile = '<span class="preview_meta_tags">tags:';
										foreach($posttags as $tag) {
											$post_tags = $post_tags . '<a href="?tag='.$tag->slug.'">'.$tag->name .'</a>'. ', ';
										}
										$post_tags_compile .= ' '.trim($post_tags, ', ').'</span>';
									} else {
										$post_tags_compile = '';
									}
									?>
									
									<div class="blog_post_preview date_content search_post">
										<div class="preview_wrapper">
											<div class="global_preview">
												<?php include ("ext/pf_type1.php"); ?>
												<div class="preview_content">
													<div class="content_date boxed_date">
														<div class="boxed_date_month"><?php the_time("M"); ?></div>
														<div class="boxed_date_day"><?php the_time("d"); ?></div>
													</div>
													<h2><a class="blogpost_title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
													<div class="preview_meta">										
														<span class="preview_meta_author">by <?php the_author_meta('display_name'); ?></span>
														<span class="preview_meta_comments"><a href="<?php echo get_comments_link(); ?>"><?php echo __('Comments','theme_localization').": " . get_comments_number(get_the_ID()); ?></a></span>
														<?php echo $post_tags_compile; ?>
													</div>
													<hr class="blogpreview_content_seperator">
													<article class="contentarea">
														<?php
														global $more; $more = 0;
														the_excerpt(__('Read more!','theme_localization'));
														?>
													</article>
												</div><!-- .preview_content -->
											</div><!-- .global_preview -->
										</div>
									</div>
									
                                <?php $foundSomething = true;
                                endwhile;
                                wp_reset_query();
                            }

                            $defaults = array('numberposts' => 10, 'post_type' => 'any', 'post_status' => 'publish', 'post_password' => '', 'suppress_filters' => false, 's' => get_search_query(), 'paged' => $paged);
                            $query = http_build_query($defaults);
                            $posts = get_posts( $query );

                            foreach( $posts as $post ) {
                                setup_postdata($post);
									$pf = get_post_format();
									if (empty($pf)) $pf = "text";
									$pfIcon = gt3_get_pf_icon($pf);
									$featured_image = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'single-post-thumbnail');
									$gt3_theme_pagebuilder = gt3_get_theme_pagebuilder(get_the_ID());
									
									$post_categ = '';
									$separator = ', ';
									if(get_the_tags() !== '') {
										$posttags = get_the_tags();
									}
									if ($posttags) {
										$post_tags = '';
										$post_tags_compile = '<span class="preview_meta_tags">tags:';
										foreach($posttags as $tag) {
											$post_tags = $post_tags . '<a href="?tag='.$tag->slug.'">'.$tag->name .'</a>'. ', ';
										}
										$post_tags_compile .= ' '.trim($post_tags, ', ').'</span>';
									} else {
										$post_tags_compile = '';
									}
									?>
									
									<div class="blog_post_preview date_content search_post">
										<div class="preview_wrapper">
											<div class="global_preview">
												<?php include ("ext/pf_type1.php"); ?>
												<div class="preview_content">
													<div class="content_date boxed_date">
														<div class="boxed_date_month"><?php the_time("M"); ?></div>
														<div class="boxed_date_day"><?php the_time("d"); ?></div>
													</div>
													<h2><a class="blogpost_title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
													<div class="preview_meta">										
														<span class="preview_meta_author">by <?php the_author_meta('display_name'); ?></span>
														<span class="preview_meta_comments"><a href="<?php echo get_comments_link(); ?>"><?php echo __('Comments','theme_localization').": " . get_comments_number(get_the_ID()); ?></a></span>
														<?php echo $post_tags_compile; ?>
													</div>
													<hr class="blogpreview_content_seperator">
													<article class="contentarea">
														<?php
														global $more; $more = 0;
														the_excerpt(__('Read more!','theme_localization'));
														?>
													</article>
												</div><!-- .preview_content -->
											</div><!-- .global_preview -->
										</div>
									</div>
                                <?php $foundSomething = true;
                            }
                            gt3_get_theme_pagination();

                            if ($foundSomething == false) {
                                ?>
                                <div class="block404" style="width:100%; text-align: center;">
                                    <h1 class="title404"><?php echo __('Oops!','theme_localization'); ?> <?php echo __('Not Found :(','theme_localization'); ?></h1>
                                    <div class="text404"><?php echo __('Apologies, but we were unable to find what you were looking for.','theme_localization'); ?></div>
                                    <div class="search_form_wrap">
                                        <form name="search_field" method="get" action="<?php echo home_url(); ?>" class="search_form" style="margin-top: 14px; margin-bottom: 40px;">
                                            <input type="text" name="s" value="<?php _e('Search the site...','theme_localization'); ?>" title="<?php _e('Search the site...','theme_localization'); ?>" class="field_search">
                                        </form>
                                    </div>
                                </div>
                            <?php
                            }

                            echo '</div><div class="clear"></div></div>';
                            ?>
                        </div>
                    </div>
                    <?php get_sidebar('left'); ?>
                </div>
            </div>
            <?php get_sidebar('right'); ?>
            <div class="clear"></div>
        </div>
    </div>
</div>

<?php get_footer(); ?>