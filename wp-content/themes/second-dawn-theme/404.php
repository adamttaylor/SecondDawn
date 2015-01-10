<?php get_header();
#Emulate default settings for page without personal ID
$gt3_theme_pagebuilder = gt3_get_default_pb_settings();
gt3_the_pb_custom_bg_and_color($gt3_theme_pagebuilder);
?>

<div class="content_wrapper">
    <?php if (gt3_get_theme_option("show_breadcrumb_area") !== "no") { ?>
        <div class="page_title_block">
            <div class="container">
                <h1 class="title"><?php echo __('Oops!','theme_localization'); ?></h1>
                <?php gt3_the_breadcrumb(); ?>
            </div>
        </div>
    <?php } ?>
    <div class="container">
        <div class="content_block no-sidebar row">
            <div class="fl-container span12">
                <div class="row">
                    <div class="posts-block span12">
                        <div class="contentarea">

                            <div class="module_cont module_404">
                                <div class="wrapper404">
                                    <div class="block404">
                                        <h1><?php echo __('404 Error.','theme_localization'); ?> <?php echo __('Oops! Not Found :(','theme_localization'); ?></h1>
                                        <h4><?php echo __('Apologies, but we were unable to find what you were looking for.','theme_localization'); ?></h4>
                                    </div>
                                    <form name="search_field" method="get" action="<?php echo home_url(); ?>" class="search_form">
                                        <input type="text" name="s" value="<?php _e('Search the site...','theme_localization'); ?>" title="<?php _e('Search the site...','theme_localization'); ?>" class="field_search">
                                        <span class="search_ico"></span>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                    <?php /*get_sidebar('left');*/ ?>
                </div>
            </div>
            <?php /*get_sidebar('right');*/ ?>
            <div class="clear"></div>
        </div>
    </div>
</div>

<?php get_footer(); ?>