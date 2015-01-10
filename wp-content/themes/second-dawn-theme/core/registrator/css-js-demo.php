<?php
#Only demo stuff
#gt3_update_theme_option("demo_server", "true");
#gt3_delete_theme_option("demo_server");

#Add color panel
//&& isset($_COOKIE['show_landing_at'])) || (gt3_get_theme_option("demo_server") == "true" && gt3_get_theme_option("landing_page") == "off")
if (gt3_get_theme_option("demo_server") == "true") {
    if (!function_exists('css_js_demo')) {
        function css_js_demo()
        {
            wp_enqueue_style('css_only_for_demo', get_template_directory_uri() . '/ext/demo_panel/only_for_demo.css');
            wp_enqueue_style('css_colorpicker', get_template_directory_uri() . '/ext/demo_panel/colorpicker.css');
            wp_enqueue_script('js_colorpicker', get_template_directory_uri() . '/ext/demo_panel/colorpicker.js', array(), false, true);
            wp_enqueue_script('js_demo_panel', get_template_directory_uri() . '/ext/demo_panel/demo_panel.js', array(), false, true);
        }
    }
    add_action('wp_enqueue_scripts', 'css_js_demo');
}

?>