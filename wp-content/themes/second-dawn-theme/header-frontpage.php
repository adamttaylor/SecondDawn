<!DOCTYPE html>
<!--[if IE 8 ]><html class="ie ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html class="ie ie9" <?php language_attributes(); ?>> <!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>">

    <!-- Mobile Specific Metas
   ================================================== -->
    <?php if (gt3_get_theme_option("responsive")=="on") { ?>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <?php } ?>

    <!-- Favicon && Apple touch -->
    <link rel="shortcut icon" href="<?php echo gt3_get_theme_option('favicon'); ?>" type="image/x-icon">
    <link rel="apple-touch-icon" href="<?php echo gt3_get_theme_option('apple_touch_57'); ?>">
    <link rel="apple-touch-icon" sizes="72x72" href="<?php echo gt3_get_theme_option('apple_touch_72'); ?>">
    <link rel="apple-touch-icon" sizes="114x114" href="<?php echo gt3_get_theme_option('apple_touch_114'); ?>">

    <title><?php bloginfo('name'); ?> <?php wp_title(); ?></title>
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php gt3_the_theme_option("code_before_head"); ?>
    <script>
        mixajaxurl = "<?php echo get_option("siteurl") ?>/wp-admin/admin-ajax.php";
        themerooturl = "<?php echo THEMEROOTURL; ?>";
    </script>
    <!--[if IE 8 ]><script>
        var e = ("article,aside,figcaption,figure,footer,header,hgroup,nav,section,time").split(',');
        for (var i = 0; i < e.length; i++) {
            document.createElement(e[i]);
        }
    </script><![endif]-->
    <?php wp_head(); ?>
    <?php echo gt3_get_if_strlen(gt3_get_theme_option("custom_css"), "<style>", "</style>"); ?>
</head>

<body <?php body_class("faded"); ?>>
	<?php if (gt3_get_theme_option("theme_top_slider") !== '') { ?>
    <div class="top-slider" style="height:100%;">
        <div class="top-module_line">
			<div class="module_line paralax fullsize" style="background: url(<?php echo gt3_get_theme_option("theme_top_slider_bg") ?>) no-repeat 50% 0px; padding-top: 0px;">
            	<div class="module_line_wrapper container">
                    <?php echo do_shortcode(gt3_get_theme_option("theme_top_slider")); ?>
                </div>
                <a href="javascript:void(0)" class="btn_down_arrow"></a>
            </div>
        <?php } ?>
        </div>
    </div>
    <?php if (gt3_get_theme_option("theme_top_slider") !== '') { $header_style = 'top-slider_header'; } else { $header_style = '';} ?>
	<header class="<?php echo $header_style ?> main_header">       
        <div class="header_wrapper container">
        	<a href="<?php echo get_site_url(); ?>" class="logo"><img src="<?php gt3_the_theme_option("logo"); ?>" alt=""  width="<?php gt3_the_theme_option("header_logo_standart_width"); ?>" height="<?php gt3_the_theme_option("header_logo_standart_height"); ?>" class="logo_def"><img src="<?php gt3_the_theme_option("logo_retina"); ?>" alt="" width="<?php gt3_the_theme_option("header_logo_standart_width"); ?>" height="<?php gt3_the_theme_option("header_logo_standart_height"); ?>" class="logo_retina"></a>
			<nav>
            	<?php
					wp_nav_menu( array(
					'container' =>false,
					'menu_class' => 'menu',
					'echo' => true,
					'before' => '',
					'after' => '',
					'link_before' => '',
					'link_after' => '',
					'depth' => 3,
					'walker' => new gt3_description_walker())
					);
				?>
                <div class="clear"></div>
            </nav>            
        </div>        
	</header>
	<?php if (gt3_get_theme_option("theme_top_slider") !== '') { ?>
	<div class="main_wrapper" style="padding-top:<?php echo gt3_get_theme_option("theme_top_slider_margin")?>;">
    <?php } else { ?>
    <div class="main_wrapper">
    <?php } ?>
    