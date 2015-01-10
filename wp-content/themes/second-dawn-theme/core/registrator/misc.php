<?php
if (function_exists('add_theme_support')) {
    add_theme_support('post-thumbnails', array('post', 'page', 'port', 'team', 'testimonials', 'partners'));
    add_theme_support('automatic-feed-links');

    add_theme_support( 'post-formats', array( 'image', 'video' ) );
}

#Support menus
add_action( 'init', 'register_my_menus' );
function register_my_menus() {
	register_nav_menus(
		array(
		'main_menu' => 'Main menu'
		)
	);
}

#Enable shortcodes in sidebar
add_filter('widget_text', 'do_shortcode');

#ADD localization folder
add_action('init', 'enable_pomo_translation');
function enable_pomo_translation(){
    load_theme_textdomain( 'theme_localization', get_template_directory() . '/core/languages/' );
}

add_action('admin_head', 'reg_font_js');
function reg_font_js() {
    global $gt3_themeconfig;
    ?>
    <script type="text/javascript" >
        <?php
            $compile = array();
            if ($gt3_themeconfig['custom_fonts'] == true) {
                if (is_array($gt3_themeconfig['custom_fonts_array'])) {
                    foreach ($gt3_themeconfig['custom_fonts_array'] as $id => $font) {
                        array_push($compile, "'".$font['font_family']."'");
                    }
                    echo "var fontsarray = [".implode(",", $compile)."]";
                }
            } else {
                echo "var fontsarray = '';";
            }
        ?>
    </script>
<?php
}

add_action( 'add_meta_boxes', 'side_sidebar_settings_meta_box' );
function side_sidebar_settings_meta_box()
{
    $types = array( 'post', 'page', 'port' );

    foreach( $types as $type ) {
        add_meta_box(
            'side_sidebar_settings_meta_box', // id, used as the html id att
            __( 'Custom Sidebars' ), // meta box title, like "Page Attributes"
            'side_sidebar_settings_meta_box_cb', // callback function, spits out the content
            $type, // post type or page. We'll add this to pages only
            'side', // context (where on the screen
            'low' // priority, where should this go in the context?
        );
    }
}

function side_sidebar_settings_meta_box_cb( $post )
{
    $gt3_theme_pagebuilder = gt3_get_theme_pagebuilder($post->ID, array("not_prepare_sidebars" => "true"));
    $available_sidebars = array("default" => "Default", "no-sidebar" => "None", "left-sidebar" => "Left", "right-sidebar" => "Right");

    echo '<div class="select_sidebar_layout sidebar_option">Sidebar layout:<br><select name="pagebuilder[settings][layout-sidebars]" class="sidebar_layout admin_newselect">';
    foreach ($available_sidebars as $sidebar_id => $sidebar_caption) {
        echo "<option ".((isset($gt3_theme_pagebuilder['settings']['layout-sidebars']) && $gt3_theme_pagebuilder['settings']['layout-sidebars'] == $sidebar_id) ? 'selected="selected"' : '')." value='$sidebar_id'>$sidebar_caption</option>";
    }
    echo '</select></div>';

    $all_available_sidebars = array("Default");
    $theme_sidebars = gt3_get_theme_option("theme_sidebars");
    if (!is_array($theme_sidebars)) {
        $theme_sidebars = array();
    }

    $i = 1;
    foreach ($theme_sidebars as $theme_sidebar) {
        $all_available_sidebars[$i] = $theme_sidebar;
        $i++;
    }

    echo '<div class="select_sidebar sidebar_option '.(gt3_get_theme_option("default_sidebar_layout") == "no-sidebar" ? "sidebar_none" : "").'">Select sidebar:<br><select name="pagebuilder[settings][selected-sidebar-name]" class="sidebar_name admin_newselect">';
    foreach ($all_available_sidebars as $sidebar_id => $sidebar_caption) {
        echo "<option ".((isset($gt3_theme_pagebuilder['settings']['selected-sidebar-name']) && $gt3_theme_pagebuilder['settings']['selected-sidebar-name'] == $sidebar_caption) ? 'selected="selected"' : '')." value='$sidebar_caption'>$sidebar_caption</option>";
    }
    echo '</select></div>';
}

add_action( 'add_meta_boxes', 'side_onepage_settings_meta_box' );
function side_onepage_settings_meta_box()
{
    $types = array( 'page' );

    foreach( $types as $type ) {
        add_meta_box(
            'side_onepage_settings_meta_box', // id, used as the html id att
            __( 'OnePage Settings' ), // meta box title, like "Page Attributes"
            'side_onepage_settings_meta_box_cb', // callback function, spits out the content
            $type, // post type or page. We'll add this to pages only
            'side', // context (where on the screen
            'low' // priority, where should this go in the context?
        );
    }
}

function side_onepage_settings_meta_box_cb( $post )
{
    $gt3_theme_pagebuilder = gt3_get_theme_pagebuilder($post->ID);

    echo '<div class="select_sidebar_layout sidebar_option">Standalone page:<br><select name="pagebuilder[settings][standalone-page-status]" class="admin_newselect">';
    foreach (array("No", "Yes") as $standalone_variant) {
        echo "<option ".((isset($gt3_theme_pagebuilder['settings']['standalone-page-status']) && $gt3_theme_pagebuilder['settings']['standalone-page-status'] == $standalone_variant) ? 'selected="selected"' : '')." value='$standalone_variant'>$standalone_variant</option>";
    }
    echo '</select></div>';

}


#Work with Custom background
add_action( 'add_meta_boxes', 'side_bg_settings_meta_box' );
function side_bg_settings_meta_box()
{
    $types = array( 'post', 'page', 'port' );

    foreach( $types as $type ) {
        add_meta_box(
            'side_bg_settings_meta_box', // id, used as the html id att
            __( 'Custom Layout' ), // meta box title, like "Page Attributes"
            'side_bg_settings_meta_box_cb', // callback function, spits out the content
            $type, // post type or page. We'll add this to pages only
            'side', // context (where on the screen
            'low' // priority, where should this go in the context?
        );
    }
}

function side_bg_settings_meta_box_cb( $post )
{
    $gt3_theme_pagebuilder = gt3_get_theme_pagebuilder($post->ID);
    $available_layouts = array("default" => "Default", "clean" => "Clean", "boxed" => "Boxed (pattern or color)", "bgimage" => "Background Image");

    echo '<div class="sidebar_option">Page layout:<br><select name="pagebuilder[page_settings][page_layout][layout_type]" class="admin_newselect page_layout">';
    foreach ($available_layouts as $layout_id => $layout_caption) {
        echo "<option ".((isset($gt3_theme_pagebuilder['page_settings']['page_layout']['layout_type']) && $gt3_theme_pagebuilder['page_settings']['page_layout']['layout_type'] == $layout_id) ? 'selected="selected"' : '')." value='$layout_id'>$layout_caption</option>";
    }
    echo '</select>';
    echo '</div>';

    echo '
	<div class="boxed_options no_boxed">
			<input type="hidden" class="custom_select_img_attachid" name="pagebuilder[page_settings][page_layout][img][attachid]" value="'.(isset($gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid']) ? $gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid'] : '').'">
			<div class="custom_select_img_preview">';
			  if (isset($gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid'])) {
				  $img_attachment = wp_get_attachment_image_src( $gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid'], "medium" );
				  if ($img_attachment[0] == '') {} else {
				  	echo '<img src="'.$img_attachment[0].'" alt="">';
				  }
			  }
    echo '
			</div>
		<div class="custom_select_image">
			<span class="add_image_from_wordpress_library_popup">Add Image</span>
	    </div>
    ';

    echo '
		<div id="pb_section" class="custom_select_bgcolor">
			<div class="custom_select_color">
				<div class="color_picker_block ">
					<span class="sharp">#</span>
					<input type="text" class="medium cpicker textoption type1" maxlength="25" name="pagebuilder[page_settings][page_layout][color][hash]" value="'.(isset($gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash']) ? $gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash'] : '').'">
					<input type="text" disabled="disabled" class="textoption type1 cpicker_preview" value="" style="">
				</div>
			</div>
		</div>
		<div class="clear"></div>
	</div>

    <div class="custom_select_bcarea">';

    echo '<span class="htitle">Breadcrumb & Title area:</span><select name="pagebuilder[settings][show_breadcrumb_area]" class="admin_newselect">';
    $available_bc_type = array("yes" => "Show", "no" => "Hide");
    foreach ($available_bc_type as $bc_id => $bc_caption) {
        echo "<option ".((isset($gt3_theme_pagebuilder['settings']['show_breadcrumb_area']) && $gt3_theme_pagebuilder['settings']['show_breadcrumb_area'] == $bc_id) ? 'selected="selected"' : '')." value='$bc_id'>$bc_caption</option>";
    }
    echo '</select>';

    echo '
    </div>
    <div class="clear"></div>
    ';
}


if (!defined("GT3PBVERSION")) {

    function gt3_update_theme_pagebuilder_without_plugin($post_id, $variableName, $gt3_theme_pagebuilderArray)
    {
        update_post_meta($post_id, $variableName, $gt3_theme_pagebuilderArray);
        return true;
    }

    add_action('save_post', 'save_postdata_in_theme');
    function save_postdata_in_theme($post_id)
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {return;}

        #CHECK PERMISSIONS
        if (!current_user_can('edit_post', $post_id)) {return;}

        #START SAVING
        if (!isset($_POST['pagebuilder'])) {
            $pbsavedata = array();
        } else {
            $pbsavedata = $_POST['pagebuilder'];
            gt3_update_theme_pagebuilder_without_plugin($post_id, "pagebuilder", $pbsavedata);
        }
    }
}

?>