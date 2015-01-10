<?php get_header();
#Emulate default settings for page without personal ID
$gt3_theme_pagebuilder = gt3_get_default_pb_settings();
gt3_the_pb_custom_bg_and_color($gt3_theme_pagebuilder);
?>

<div class="content_wrapper author">
    <?php if (gt3_get_theme_option("show_breadcrumb_area") !== "no") { ?>
    <div class="page_title_block">
        <div class="container">
            <?php gt3_the_breadcrumb(); ?>
        </div>
    </div>
    <?php } ?>    
    <div class="container">
    	<section class="blogpost_user_meta">        	
            <div class="author-body">
            	<div class="author-ava"> <?php echo get_avatar(get_the_author_meta('ID'), 176); ?> </div>
            	<div class="author-name">
                	<h5><?php the_author_posts_link(); ?></h5>
            	</div>
             	<div class="author-description">
					<?php the_author_meta('description'); ?>
                </div>
        	</div>
        	<div class="clear"></div>
        </section>
        <div class="content_block <?php echo $gt3_theme_pagebuilder['settings']['layout-sidebars'] ?> row">
            <div class="fl-container <?php echo (($gt3_theme_pagebuilder['settings']['layout-sidebars'] == "right-sidebar") ? "span9" : "span12"); ?>">
                <div class="row">
                    <div class="posts-block <?php echo (($gt3_theme_pagebuilder['settings']['layout-sidebars'] == "left-sidebar" || $gt3_theme_pagebuilder['settings']['layout-sidebars'] == "right-sidebar") ? "span9" : "span12"); ?>">
                        <div class="contentarea">
                            <?php
                            echo '<div class="row-fluid"><div class="span12 module_blog">';
                            while (have_posts()) : the_post();
                                get_template_part("bloglisting");
                            endwhile; gt3_get_theme_pagination();
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