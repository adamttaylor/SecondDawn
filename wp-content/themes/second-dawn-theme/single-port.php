<?php get_header();
the_post();

/* LOAD PAGE BUILDER ARRAY */
$gt3_theme_pagebuilder = gt3_get_theme_pagebuilder(get_the_ID());
$pf = get_post_format();
if (empty($pf)) $pf = "text";
$pfIcon = gt3_get_pf_icon($pf);
$featured_image = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'single-post-thumbnail' );
gt3_the_pb_custom_bg_and_color($gt3_theme_pagebuilder);
$gt3_current_page_sidebar = $gt3_theme_pagebuilder['settings']['layout-sidebars'];
?>

<div class="content_wrapper port">
    <?php if ($gt3_theme_pagebuilder['settings']['show_breadcrumb_area'] !== "no" && gt3_get_theme_option("show_breadcrumb_area") !== "no") { ?>
        <div class="page_title_block paralax">
            <div class="container">
                <h1 class="title"><?php the_title(); ?></h1>
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
                                <div class="row-fluid">
                                    <div class="span12 module_cont module_blog module_blog_page module_none_padding">
                                            <div class="blog_post_page portfolio_post_page blog_post_preview date_content">
                                                <div class="preview_wrapper">
                                                    <div class="global_preview">
                                                        <?php include("ext/pf_type1.php"); ?>
                                                        <div class="preview_content blog_post_content">
                                                            <div class="content_date boxed_date">
                                                                <div class="boxed_date_month"><?php echo get_the_time("F") ?></div>
                                                                <div class="boxed_date_day"><?php echo get_the_time("d") ?></div>
                                                            </div>
                                                            <h2><?php echo the_title(); ?></h2>
                                                            <div class="preview_meta">										

                                                                <span class="preview_meta_author">by <?php echo the_author_posts_link(); ?></span>
                                                                <span class="preview_categ">in <?php 
                                                                    $terms = get_the_terms( get_the_ID(), 'portcat' );
                                                                    if ( $terms && ! is_wp_error( $terms ) ) {
                                                                        $draught_links = array();
                                                                        foreach ( $terms as $term ) {
                                                                            $draught_links[] = '<a href="'.get_term_link($term->slug, "portcat").'">'.$term->name.'</a>';
                                                                        }
                                                                        $on_draught = join( ", ", $draught_links );
                                                                        $show_cat = true;
                                                                    }
                        
                                                                    if ($terms !== false) {
                                                                        echo ''.$on_draught.'';
                                                                    }													
                                                                ?></span>
                                                                <?php 
                                                                    if (isset($gt3_theme_pagebuilder['page_settings']['portfolio']['skills']) && is_array($gt3_theme_pagebuilder['page_settings']['portfolio']['skills'])) {
                                                                        foreach ($gt3_theme_pagebuilder['page_settings']['portfolio']['skills'] as $skillkey => $skillvalue) {
                                                                            echo "<span class='preview_skills'>".$skillvalue['name'].": ".$skillvalue['value']."</span>";
                                                                        }
                                                                    }												
                                                                ?>

                                                            </div>
                                                            <hr class="blogpreview_content_seperator">
                                                            <article class="contentarea">
                                                                <?php
                                                                global $contentAlreadyPrinted;
                                                                if ($contentAlreadyPrinted !== true) {
                                                                    the_content(__('Read more!', 'theme_localization'));
                                                                }
                                                                wp_link_pages(array('before' => '<div class="page-link"><span>' . __('Pages', 'theme_localization') . ': </span>', 'after' => '</div>'));
                                                                ?>
                                                            </article>
                                                        </div><!-- .preview_content -->
                                                    </div><!-- .global_preview -->
                                                </div>
                                            </div>                    

                                            <section class="blog_post-footer portfolio-footer">
                                                <div class="prev_next_links">
                                                    <div class="fleft"><?php previous_post_link('%link') ?></div>
                                                    <div class="fright"><?php next_post_link('%link') ?></div>
                                                </div>
                                                <div class="blogpost_share">                                                    
                                                    <a target="_blank"
                                                       href="http://www.facebook.com/share.php?u=<?php echo get_permalink(); ?>"
                                                       class="share_facebook"><i class="stand_icon icon-facebook-sign"></i></a>
                                                    <a target="_blank"
                                                       href="https://twitter.com/intent/tweet?text=<?php echo get_the_title(); ?>&amp;url=<?php echo get_permalink(); ?>"
                                                       class="share_tweet"><i class="stand_icon icon-twitter"></i></a>
                                                    <a target="_blank"
                                                       href="http://pinterest.com/pin/create/button/?url=<?php echo get_permalink(); ?>&media=<?php echo (strlen($featured_image[0])>0) ? $featured_image[0] : gt3_get_theme_option("logo"); ?>"
                                                       class="share_pinterest"><i class="stand_icon icon-pinterest"></i></a>
                                                    <a target="_blank"
                                                       href="https://plus.google.com/share?url=<?php echo get_permalink(); ?>"
                                                       class="share_gplus"><i class="icon-google-plus-sign"></i></a>

                                                    <div class="clear"></div>
                                                </div>
                                                <div class="clear"></div>
                                                <span class="mark2"></span>
                                            </section>
                                        </div>
                                        <!--.blog_post_page -->
                                    </div>

							<?php
                            if (gt3_get_theme_option("related_posts") == "on") {

                                if ($gt3_theme_pagebuilder['settings']['layout-sidebars'] == "no-sidebar") {
                                    $posts_per_line = 4;
                                } else {
                                    $posts_per_line = 3;
                                }
								if ( comments_open() && gt3_get_theme_option("portfolio_comments") == "enabled" ) {
                                	echo '<div class="row-fluid"><div class="span12 module_cont module_small_padding module_feature_posts" style="margin-bottom:75px">';
								} else {
									echo '<div class="row-fluid"><div class="span12 module_cont module_small_padding module_feature_posts">';
								}

                                $new_term_list = get_the_terms(get_the_id(), "portcat");
                                $echoallterm = '';
                                $echoterm = array();
                                if (is_array($new_term_list)) {
                                    foreach ($new_term_list as $term) {
                                        $echoterm[] = $term->term_id;
                                    }
                                }
                                if (is_array($echoterm) && count($echoterm)>0) {
                                    $post_type_terms = implode(",", $echoterm);
                                } else {
                                    $post_type_terms = "";
                                }

                                echo do_shortcode("[feature_portfolio
                                heading_color=''
                                heading_size='h4'
                                heading_text='RECENT WORKS'
                                number_of_posts='".$posts_per_line."'
                                posts_per_line=".$posts_per_line."
                                sorting_type='random'
                                related='yes'
                                now_open_pageid='".get_the_id()."'
                                post_type_terms='".$post_type_terms."'
                                post_type='port'][/feature_portfolio]");
                                echo '</div></div>';
                            }

                            if ( comments_open() && gt3_get_theme_option("portfolio_comments") == "enabled" ) {
                            ?>
								<hr class="type2" style="margin:3px 0 47px 0">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <?php comments_template(); ?>
                                    </div>
                                </div>
                            <?php
                            }
                            ?>                                

                            </div>
                            <!-- .contentarea -->

                    </div>
                    <?php get_sidebar('left'); ?>
                </div>
                <div class="clear"><!-- ClearFix --></div>
            </div><!-- .fl-container -->
            <?php get_sidebar('right'); ?>
            <div class="clear"><!-- ClearFix --></div>
        </div>
    </div><!-- .container -->
</div><!-- .content_wrapper -->

<?php get_footer() ?>