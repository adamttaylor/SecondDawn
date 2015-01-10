<?php

#Frontend
if (!function_exists('css_js_register')) {
	function css_js_register()
	{
        #CSS
    	wp_enqueue_style('theme_default_style', get_bloginfo('stylesheet_url'));
        wp_enqueue_style('theme_core_css', get_template_directory_uri() . '/css/core/core.css');
    	wp_enqueue_style('theme_bootstrap', get_template_directory_uri() . '/css/bs_grid.css');
		//wp_enqueue_style('font-awesome', get_template_directory_uri() . '/css/font-awesome.min.css');
		wp_enqueue_style('main_theme', get_template_directory_uri() . '/css/theme.css');
		wp_enqueue_style('theme_plugins', get_template_directory_uri() . '/css/plugins.css');
		wp_enqueue_style('theme_responsive', get_template_directory_uri() . '/css/responsive.css');
		wp_enqueue_style('theme_core_php', get_template_directory_uri() . '/css/core/core.php');
		if (gt3_get_theme_option("site_width")=="960px") {wp_enqueue_style('theme_css_960', get_template_directory_uri() . '/css/960.css');}

		#JS
		wp_enqueue_script("jquery");
        wp_enqueue_script(array("jquery-ui-core"));
		wp_enqueue_script('easing_js', get_template_directory_uri() . '/js/jquery.easing.1.3.js', array(), false, true);
		wp_enqueue_script('prettyPhoto_js', get_template_directory_uri() . '/js/jquery.prettyPhoto.js', array(), false, true);
		wp_enqueue_script('nivoSlider_js', get_template_directory_uri() . '/js/jquery.nivo.slider.js', array(), false, true);				
		wp_enqueue_script('main_theme', get_template_directory_uri() . '/js/theme.js', array(), false, true);
		wp_enqueue_script('theme_core', get_template_directory_uri() . '/js/core/core.php', array(), false, true);
	}
}
add_action('wp_enqueue_scripts', 'css_js_register');


#Admin
add_action('admin_enqueue_scripts', 'admin_css_js_register');
function admin_css_js_register()
{
	#CSS (MAIN)
	wp_enqueue_style('jquery-ui', get_template_directory_uri() . '/core/admin/css/jquery-ui.css');
	wp_enqueue_style('colorpicker_css', get_template_directory_uri() . '/core/admin/css/colorpicker.css');
	wp_enqueue_style('gallery_css', get_template_directory_uri() . '/core/admin/css/gallery.css');
    wp_enqueue_style('colorbox_css', get_template_directory_uri() . '/core/admin/css/colorbox.css');
	wp_enqueue_style('selectBox_css', get_template_directory_uri() . '/core/admin/css/jquery.selectBox.css');
    wp_enqueue_style('admin_css', get_template_directory_uri() . '/core/admin/css/admin.css');
    #CSS OTHER

	#JS (MAIN)
	wp_enqueue_script('admin_js', get_template_directory_uri() . '/core/admin/js/admin.js');
	wp_enqueue_script('ajaxupload_js', get_template_directory_uri() . '/core/admin/js/ajaxupload.js');
	wp_enqueue_script('colorpicker_js', get_template_directory_uri() . '/core/admin/js/colorpicker.js');
	wp_enqueue_script('selectBox_js', get_template_directory_uri() . '/core/admin/js/jquery.selectBox.js');
	wp_enqueue_script('backgroundPosition_js', get_template_directory_uri() . '/core/admin/js/jquery.backgroundPosition.js');
	wp_enqueue_script(array("jquery-ui-core", "jquery-ui-dialog", "jquery-ui-sortable"));
    #JS OTHER
}

?>