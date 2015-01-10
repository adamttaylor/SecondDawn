<?php

require_once("core/loader.php");

if (!isset($content_width)) $content_width = 940;

function gt3_get_theme_pagebuilder($postid, $args = array())
{
    $gt3_theme_pagebuilder = get_post_meta($postid, "pagebuilder", true);
    if (!is_array($gt3_theme_pagebuilder)) {
        $gt3_theme_pagebuilder = array();
    }

    if (!isset($gt3_theme_pagebuilder['settings']['show_content_area'])) {
        $gt3_theme_pagebuilder['settings']['show_content_area'] = "yes";
    }
    if (!isset($gt3_theme_pagebuilder['settings']['show_page_title'])) {
        $gt3_theme_pagebuilder['settings']['show_page_title'] = "yes";
    }
    if (!isset($gt3_theme_pagebuilder['settings']['show_breadcrumb'])) {
        $gt3_theme_pagebuilder['settings']['show_breadcrumb'] = "yes";
    }
    if (!isset($gt3_theme_pagebuilder['settings']['show_breadcrumb_area'])) {
        $gt3_theme_pagebuilder['settings']['show_breadcrumb_area'] = "yes";
    }
    if (isset($args['not_prepare_sidebars']) && $args['not_prepare_sidebars'] == "true") {

    } else {
        if (!isset($gt3_theme_pagebuilder['settings']['layout-sidebars']) || $gt3_theme_pagebuilder['settings']['layout-sidebars'] == "default") {
            $gt3_theme_pagebuilder['settings']['layout-sidebars'] = gt3_get_theme_option("default_sidebar_layout");
        }
    }

    return $gt3_theme_pagebuilder;
}

function gt3_get_theme_sidebars_for_admin()
{
    $theme_sidebars = gt3_get_theme_option("theme_sidebars");
    if (!is_array($theme_sidebars)) {
        $theme_sidebars = array();
    }
    return $theme_sidebars;
}

function gt3_get_theme_option($optionname, $defaultValue = "")
{
    global $gt3_themeshort;
    $returnedValue = get_option($gt3_themeshort . $optionname, $defaultValue);

    if (gettype($returnedValue) == "string") {
        return stripslashes($returnedValue);
    } else {
        return $returnedValue;
    }
}

function gt3_the_theme_option($optionname, $beforeoutput = "", $afteroutput = "")
{
    global $gt3_themeshort;
    $returnedValue = get_option($gt3_themeshort . $optionname);

    if (strlen($returnedValue) > 0) {
        echo $beforeoutput . stripslashes($returnedValue) . $afteroutput;
    }
}

function gt3_get_text($optionname, $beforeoutput = "", $afteroutput = "")
{
    global $gt3_themeshort;
    $returnedValue = get_option($gt3_themeshort . $optionname);

    if (strlen($returnedValue) > 0) {
        return $beforeoutput . stripslashes($returnedValue) . $afteroutput;
    }
}

function gt3_get_if_strlen($str, $beforeoutput = "", $afteroutput = "")
{
    if (strlen($str) > 0) {
        return $beforeoutput . $str . $afteroutput;
    }
}

function gt3_the_text($optionname, $beforeoutput = "", $afteroutput = "")
{
    global $gt3_themeshort;
    $returnedValue = get_option($gt3_themeshort . $optionname);

    if (strlen($returnedValue) > 0) {
        echo $beforeoutput . stripslashes($returnedValue) . $afteroutput;
    }
}

function gt3_delete_theme_option($optionname)
{
    global $gt3_themeshort;
    return delete_option($gt3_themeshort . $optionname);
}

function gt3_update_theme_option($optionname, $optionvalue)
{
    global $gt3_themeshort;
    if (update_option($gt3_themeshort . $optionname, $optionvalue)) {
        return true;
    }
}

function gt3_messagebox($actionmessage)
{
    $compile = "<div class='admin_message_box fadeout'>" . $actionmessage . "</div>";
    return $compile;
}

function gt3_breaksToBR($content, $changeto = "")
{

    $content = nl2br($content);
    $content = str_replace("\r\n", "", $content);
    $content = str_replace("\n", "", $content);

    return $content;
}


function gt3_theme_comment($comment, $args, $depth)
{
    $max_depth_comment = $args['max_depth'];
    if ($max_depth_comment > 4) {
        $max_depth_comment = 4;
    }
    $GLOBALS['comment'] = $comment; ?>
<li <?php comment_class(); ?> id="li-comment-<?php comment_ID() ?>">
    <div id="comment-<?php comment_ID(); ?>" class="stand_comment">
        <div class="commentava wrapped_img">
            <?php echo get_avatar($comment->comment_author_email, 160); ?>
            <div class="img_inset"></div>
        </div>
        <div class="thiscommentbody">
            <div class="comment_info">
                <span
                    class="author_name"><?php printf('%s', get_comment_author_link()) ?> <?php edit_comment_link('(Edit)', '  ', '') ?></span>
                <span class="date"><?php printf('%1$s', get_comment_date("F d, Y")) ?></span>
                <?php comment_reply_link(array_merge($args, array('before' => ' <span class="comments">', 'after' => '</span>', 'depth' => $depth, 'reply_text' => __('Reply', 'theme_localization'), 'max_depth' => $max_depth_comment))) ?>
            </div>
            <?php if ($comment->comment_approved == '0') : ?>
                <p><em><?php _e('Your comment is awaiting moderation.', 'theme_localization'); ?></em></p>
            <?php endif; ?>
            <?php comment_text() ?>
        </div>
        <div class="clear"></div>
    </div>
<?php
}

#Custom paging
function gt3_get_theme_pagination($range = 10, $type = "")
{
    if ($type == "show_in_shortcodes") {
        global $paged, $wp_query_in_shortcodes;
        $wp_query = $wp_query_in_shortcodes;
    } else {
        global $paged, $wp_query;
    }

    if (empty($paged)) {
        $paged = (get_query_var('page')) ? get_query_var('page') : 1;
    }

    $max_page = $wp_query->max_num_pages;

    if ($max_page > 1) {
        echo '<ul class="pagerblock">';
    }

    if ($max_page > 1) {
        if (!$paged) {
            $paged = 1;
        }

        $ppl = "<span class='btn_prev'></span>";

        if ($max_page > $range) {
            if ($paged < $range) {
                for ($i = 1; $i <= ($range + 1); $i++) {
                    echo "<li><a href='" . get_pagenum_link($i) . "'";
                    if ($i == $paged) echo " class='current'";
                    echo ">$i</a></li>";
                }
            } elseif ($paged >= ($max_page - ceil(($range / 2)))) {
                for ($i = $max_page - $range; $i <= $max_page; $i++) {
                    echo "<li><a href='" . get_pagenum_link($i) . "'";
                    if ($i == $paged) echo " class='current'";
                    echo ">$i</a></li>";
                }
            } elseif ($paged >= $range && $paged < ($max_page - ceil(($range / 2)))) {
                for ($i = ($paged - ceil($range / 2)); $i <= ($paged + ceil(($range / 2))); $i++) {
                    echo "<li><a href='" . get_pagenum_link($i) . "'";
                    if ($i == $paged) echo " class='current'";
                    echo ">$i</a></li>";
                }
            }
        } else {
            for ($i = 1; $i <= $max_page; $i++) {
                echo "<li><a href='" . get_pagenum_link($i) . "'";
                if ($i == $paged) echo " class='current'";
                echo ">$i</a></li>";
            }
        }
        $npl = "<span class='btn_next'></span>";
    }
    if ($max_page > 1) {
        echo '</ul>';
    }
}

function gt3_socsm($socname, $class = "", $title = "")
{
    if (strlen(gt3_get_theme_option($socname)) > 0) {
        return "<li><a target='_blank' href='" . gt3_get_theme_option($socname) . "' class='{$class}' title='{$title}'></a></li>";
    } else {
        return false;
    }
}

function gt3_get_pf_icon($pf)
{
    $icon = '';
    switch ($pf) {
        case "default":
            $icon = "blog_text";
            break;
        case "image":
            $icon = "blog_slider";
            break;
        case "video":
            $icon = "blog_video";
            break;
        case "audio":
            $icon = "blog_audio";
            break;
    }

    return $icon;
}


function gt3_the_breadcrumb()
{
    $showOnHome = 1;
    $delimiter = '';
    $home = __('Home', 'theme_localization');
    $showCurrent = 1;
    $before = '<span class="current">';
    $after = '</span>';

    global $post;
    $homeLink = home_url();
    if (is_home() || is_front_page()) {
        if ($showOnHome == 1) echo '<div class="breadcrumbs"><span>' . $home . '</span></div>';
    } else {

        echo '<div class="breadcrumbs"><a href="' . $homeLink . '">' . $home . '</a>' . $delimiter . '';
        if (is_category()) {
            $thisCat = get_category(get_query_var('cat'), false);
            if ($thisCat->parent != 0) echo get_category_parents($thisCat->parent, TRUE, ' ' . $delimiter . ' ');
            echo $before . 'Archive "' . single_cat_title('', false) . '"' . $after;

        }
        elseif (get_post_type() == 'port') {

            the_terms($post->ID, 'portcat', '', '', '');

            if ($showCurrent == 1) echo ' ' . $delimiter . ' ' . $before . get_the_title() . $after;

        } elseif (is_search()) {
            echo $before . 'Search for "' . get_search_query() . '"' . $after;

        } elseif (is_day()) {
            echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a> ' . $delimiter . ' ';
            echo '<a href="' . get_month_link(get_the_time('Y'), get_the_time('m')) . '">' . get_the_time('F') . '</a> ' . $delimiter . ' ';
            echo $before . get_the_time('d') . $after;

        } elseif (is_month()) {
            echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a> ' . $delimiter . ' ';
            echo $before . get_the_time('F') . $after;

        } elseif (is_year()) {
            echo $before . get_the_time('Y') . $after;

        } elseif (is_single() && !is_attachment()) {
            if (get_post_type() != 'post') {

                $parent_id = $post->post_parent;
                if ($parent_id > 0) {
                    $breadcrumbs = array();
                    while ($parent_id) {
                        $page = get_page($parent_id);
                        $breadcrumbs[] = '<a href="' . get_permalink($page->ID) . '">' . get_the_title($page->ID) . '</a>';
                        $parent_id = $page->post_parent;
                    }
                    $breadcrumbs = array_reverse($breadcrumbs);
                    for ($i = 0; $i < count($breadcrumbs); $i++) {
                        echo $breadcrumbs[$i];
                        if ($i != count($breadcrumbs) - 1) echo ' ' . $delimiter . ' ';
                    }
                    if ($showCurrent == 1) echo ' ' . $delimiter . ' ' . $before . get_the_title() . $after;
                } else {
                    echo $before . get_the_title() . $after;
                }

            } else {
                $cat = get_the_category();
                $cat = $cat[0];
                $cats = get_category_parents($cat, TRUE, ' ' . $delimiter . ' ');
                if ($showCurrent == 0) $cats = preg_replace("#^(.+)\s$delimiter\s$#", "$1", $cats);
                echo $cats;
                if ($showCurrent == 1) echo $before . get_the_title() . $after;
            }

        } elseif (!is_single() && !is_page() && get_post_type() != 'post' && !is_404()) {
            $post_type = get_post_type_object(get_post_type());
            echo $before . $post_type->labels->singular_name . $after;

        } elseif (is_attachment()) {
            $parent = get_post($post->post_parent);
            $cat = get_the_category($parent->ID);
            $cat = $cat[0];
            echo get_category_parents($cat, TRUE, ' ' . $delimiter . ' ');
            echo '<a href="' . get_permalink($parent) . '">' . $parent->post_title . '</a>';
            if ($showCurrent == 1) echo ' ' . $delimiter . ' ' . $before . get_the_title() . $after;

        } elseif (is_page() && !$post->post_parent) {
            if ($showCurrent == 1) echo $before . get_the_title() . $after;

        } elseif (is_page() && $post->post_parent) {
            $parent_id = $post->post_parent;
            $breadcrumbs = array();
            while ($parent_id) {
                $page = get_page($parent_id);
                $breadcrumbs[] = '<a href="' . get_permalink($page->ID) . '">' . get_the_title($page->ID) . '</a>';
                $parent_id = $page->post_parent;
            }
            $breadcrumbs = array_reverse($breadcrumbs);
            for ($i = 0; $i < count($breadcrumbs); $i++) {
                echo $breadcrumbs[$i];
                if ($i != count($breadcrumbs) - 1) echo ' ' . $delimiter . ' ';
            }
            if ($showCurrent == 1) echo ' ' . $delimiter . ' ' . $before . get_the_title() . $after;

        } elseif (is_tag()) {
            echo $before . 'Tag "' . single_tag_title('', false) . '"' . $after;

        } elseif (is_author()) {
            global $author;
            $userdata = get_userdata($author);
            echo $before . 'Author ' . $userdata->display_name . $after;

        } elseif (is_404()) {
            echo $before . 'Error 404' . $after;
        }

        echo '</div>';

    }
}

function gt3_is_now_custom_font_selected($field_name_in_admin_panel)
{
    global $gt3_themeconfig;
    if (is_array($gt3_themeconfig['custom_fonts_array'])) {
        foreach ($gt3_themeconfig['custom_fonts_array'] as $id => $font) {
            if ($font['font_family'] == $field_name_in_admin_panel) {
                return true;
            }
        }
    }
    return false;
}

function gt3_the_pb_custom_bg_and_color($gt3_theme_pagebuilder)
{
    $cover = '';
    $bgcolor = '';
    $bgimg = '';
    $repeat = '';
    $fullcolor = '';
    $fullimg = '';
    $classimg = '';
    if (!isset($gt3_theme_pagebuilder['page_settings']['page_layout']['layout_type'])) {
        $gt3_theme_pagebuilder['page_settings']['page_layout']['layout_type'] = "default";
    }

    $default_on_start = false;

    if ($gt3_theme_pagebuilder['page_settings']['page_layout']['layout_type'] == "default") {
        $default_on_start = true;
        $page_layout = gt3_get_theme_option("default_theme_layout");
        unset($gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid'], $gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash']);
    } else {
        $page_layout = $gt3_theme_pagebuilder['page_settings']['page_layout']['layout_type'];
    }

    switch ($page_layout) {
        case "clean":
            echo '<div class="layout_trigger clean_bg_cont"></div>';
            break;

        case "boxed":
            if ($default_on_start == true) {
                if (isset($gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid']) && $gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid'] > 0) {
                    $bgimg = wp_get_attachment_url($gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid']);
                } else {
                    $bgimg = gt3_get_theme_option("bg_img");
                }
                if (isset($gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash']) && strlen($gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash']) > 0) {
                    $bgcolor = $gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash'];
                } else {
                    $bgcolor = gt3_get_theme_option("default_bg_color");
                }
            } else {
                if (isset($gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid']) && $gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid'] > 0) {
                    $bgimg = wp_get_attachment_url($gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid']);
                } else {
                    $bgimg = "";
                }
                if (isset($gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash']) && strlen($gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash']) > 0) {
                    $bgcolor = $gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash'];
                } else {
                    $bgcolor = "";
                }
            }

            echo '<div class="layout_trigger boxed_bg_cont" style="background-image:url(' . $bgimg . '); background-repeat: repeat; background-color:#' . $bgcolor . ';"></div>';
            break;

        case "bgimage":
            if (isset($gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid']) && $gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid'] > 0) {
                $bgimg = wp_get_attachment_url($gt3_theme_pagebuilder['page_settings']['page_layout']['img']['attachid']);
            } else {
                $bgimg = gt3_get_theme_option("bg_img");
            }
            if (isset($gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash']) && strlen($gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash']) > 0) {
                $bgcolor = $gt3_theme_pagebuilder['page_settings']['page_layout']['color']['hash'];
            } else {
                $bgcolor = gt3_get_theme_option("default_bg_color");
            }
            echo '<div class="layout_trigger image_bg_cont" style="background-image:url(' . $bgimg . '); background-repeat: no-repeat; background-color:#' . $bgcolor . ';"></div>';
            break;
    }
}

if (!function_exists('gt3_get_default_pb_settings')) {
    function gt3_get_default_pb_settings()
    {
        $gt3_theme_pagebuilder['settings']['layout-sidebars'] = gt3_get_theme_option("default_sidebar_layout");
        $gt3_theme_pagebuilder['settings']['left-sidebar'] = "Default";
        $gt3_theme_pagebuilder['settings']['right-sidebar'] = "Default";
        $gt3_theme_pagebuilder['settings']['bg_image']['status'] = gt3_get_theme_option("show_bg_img_by_default");
        $gt3_theme_pagebuilder['settings']['bg_image']['src'] = gt3_get_theme_option("bg_img");
        $gt3_theme_pagebuilder['settings']['custom_color']['status'] = gt3_get_theme_option("show_bg_color_by_default");
        $gt3_theme_pagebuilder['settings']['custom_color']['value'] = gt3_get_theme_option("default_bg_color");
        $gt3_theme_pagebuilder['settings']['bg_image']['type'] = gt3_get_theme_option("default_bg_img_position");

        if (gt3_get_theme_option("show_breadcrumb") == "on") {
            $gt3_theme_pagebuilder['settings']['show_breadcrumb'] = "yes";
        } else {
            $gt3_theme_pagebuilder['settings']['show_breadcrumb'] = "no";
        }
        return $gt3_theme_pagebuilder;
    }
}

if (!function_exists('gt3_get_selected_pf_images')) {
    function gt3_get_selected_pf_images($gt3_theme_pagebuilder)
    {
        if (!isset($compile)) {
            $compile = '';
        }
        if (isset($gt3_theme_pagebuilder['post-formats']['images']) && is_array($gt3_theme_pagebuilder['post-formats']['images'])) {
            if (count($gt3_theme_pagebuilder['post-formats']['images']) == 1) {
                $onlyOneImage = "oneImage";
            } else {
                $onlyOneImage = "";
            }
            $compile .= '
                <div class="slider-wrapper theme-default">
                    <div class="nivoSlider ' . $onlyOneImage . '">
            ';

            if (is_array($gt3_theme_pagebuilder['post-formats']['images'])) {
                foreach ($gt3_theme_pagebuilder['post-formats']['images'] as $imgid => $img) {
                    $compile .= '
                        <img src="' . aq_resize($img['src'], "1170", "500", true, true, true) . '" data-thumb="' . aq_resize($img['src'], "1170", "500", true, true, true) . '" alt="" />
                    ';
                }
            }
            $compile .= '
                    </div>
                </div>
            ';
        }
        return $compile;
    }
}

if (!function_exists('gt3_HexToRGB')) {
    function gt3_HexToRGB($hex)
    {
        $color = array();

        if (strlen($hex) == 3) {
            $color['r'] = hexdec(substr($hex, 0, 1) . $r);
            $color['g'] = hexdec(substr($hex, 1, 1) . $g);
            $color['b'] = hexdec(substr($hex, 2, 1) . $b);
        } else if (strlen($hex) == 6) {
            $color['r'] = hexdec(substr($hex, 0, 2));
            $color['g'] = hexdec(substr($hex, 2, 2));
            $color['b'] = hexdec(substr($hex, 4, 2));
        }

        return $color['r'] . "," . $color['g'] . "," . $color['b'];
    }
}

if (!function_exists('gt3_smarty_modifier_truncate')) {
    function gt3_smarty_modifier_truncate($string, $length = 80, $etc = '... ', $break_words = false, $middle = false)
    {
        if ($length == 0) {
            return '';
        }

        if (mb_strlen($string, 'utf8') > $length) {
            $length -= mb_strlen($etc, 'utf8');
            if (!$break_words && !$middle) {
                $string = preg_replace('/\s+\S+\s*$/su', '', mb_substr($string, 0, $length + 1, 'utf8'));
            }
            if (!$middle) {
                return mb_substr($string, 0, $length, 'utf8') . $etc;
            } else {
                return mb_substr($string, 0, $length / 2, 'utf8') . $etc . mb_substr($string, -$length / 2, utf8);
            }
        } else {
            return $string;
        }
    }
}
if(!function_exists('add_this')){
	function add_this(){
		?>
        <!-- AddThis Smart Layers BEGIN -->
        <!-- Go to http://www.addthis.com/get/smart-layers to customize -->
        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-538d304c371ce1c0"></script>
        <script type="text/javascript">
          addthis.layers({
            'theme' : 'transparent',
            'share' : {
              'position' : 'left',
              'numPreferredServices' : 5
            }   
          });
        </script>
        <!-- AddThis Smart Layers END -->
        <?php	
	}
}
// Used to get custom field and avoid errors
if(!function_exists('get_safe_custom')){
	function get_safe_custom($field,$id){
		$custom_fields = get_post_custom($id);
		if($custom_fields){
			if(array_key_exists($field, $custom_fields)){
				$my_custom_field = $custom_fields[$field];
				if($my_custom_field){
					return $custom_fields[$field][0];
				}
			}
		}
		return '';
	}
}
include("libs/jw6-and-colorbox/assets.php");

if(function_exists('bbpress')){
	//BBpress seperator
	function filter_bbPress_breadcrumb_separator() {
	//$sep = ' &raquo; ';
	$sep = is_rtl() ? __( ' &laquo; ', 'bbpress' ) : __( ' &raquo; ', 'bbpress' );
	return $sep;
	}
	
	add_filter('bbp_breadcrumb_separator', 'filter_bbPress_breadcrumb_separator');
	
	function my_pagination( $args ) {
		$args['prev_text'] = '<<';
		$args['next_text'] = '>>';
		return $args;
	}
	add_filter( 'bbp_topic_pagination', 'my_pagination' );
	add_filter( 'bbp_replies_pagination', 'my_pagination' );
	add_filter( 'bbp_search_results_pagination', 'my_pagination' );
}

/*Remove Mark all unread links from pagination, added to the menu instead.*/
if(function_exists('bbp_pencil_unread')){
	function unhook(){		
		remove_action('bbp_template_after_pagination_loop', array(bbp_pencil_unread(), "mark_as_read_single_forum_link"));
	}
	add_action('bbp_init','unhook');
}

function bbpress_get_conditional(){
	if(bbp_is_single_reply())	return 'bbp_is_single_reply';
	if(bbp_is_forum_archive())	return 'bbp_is_forum_archive';
	if(bbp_is_topic_tag())		return 'bbp_is_topic_tag';
	if(bbp_is_topic_tag_edit()) return 'bbp_is_topic_tag_edit';
	if(bbp_is_single_forum())	return 'bbp_is_single_forum';
	if(bbp_is_single_topic())	return 'bbp_is_single_topic';
	if(bbp_is_single_reply())	return 'bbp_is_single_reply';
	if(bbp_is_topic_edit())		return 'bbp_is_topic_edit';
	if(bbp_is_topic_merge())	return 'bbp_is_topic_merge';
	if(bbp_is_topic_split())	return 'bbp_is_topic_split';
	if(bbp_is_reply_edit())		return 'bbp_is_reply_move';
	if(bbp_is_single_view())	return 'bbp_is_single_view';
	if(bbp_is_single_user_edit())return 'bbp_is_single_user';
	if(bbp_is_user_home())		return 'bbp_is_user_home';
	if(bbp_is_user_home_edit()) return 'bbp_is_user_home_edit';
	if(bbp_is_topics_created()) return 'bbp_is_topics_created';
	if(bbp_is_replies_created())return 'bbp_is_replies_created';
	if(bbp_is_subscriptions())	return 'bbp_is_subscriptions';
	if(bbp_is_search())			return 'bbp_is_search';
	if(bbp_is_search_results()) return 'bbp_is_search_results';
	return 'No contition met';
}
/*Only admins can view the admin bar*/
if ( ! current_user_can( 'manage_options' ) ) {
	show_admin_bar( false );
}

define( 'BP_MESSAGES_AUTOCOMPLETE_ALL', true );

function the_title_trim($title)
{
  $pattern[0] = '/Protected:/';
  $pattern[1] = '/Private:/';
  $replacement[0] = '<span class="awesome gray">&#xf023;</span>'; // Enter some text to put in place of Protected:
  $replacement[1] = '<span class="awesome gray">&#xf023;</span>'; // Enter some text to put in place of Private:

  return preg_replace($pattern, $replacement, $title);
}
add_filter('the_title', 'the_title_trim');

//Add shortcode to widgets
add_filter('widget_text', 'do_shortcode'); 



/*Members functions*/
add_role( 'member', 'Member', array( 'read' => true, 'level_0' => true ) );

//Returns True is the user can access the page.
//Either the page is not designated a member page or the user has the proper access
function memberAccess($type){
	global $post;
	$mp = get_post_meta($post->ID, '__restrict_to_member', true);
	if($mp){
		$current_user = wp_get_current_user();
		$membergroups = array('administrator', 'editor', 'contributor', 'member');
		
		$isMember = false;
		foreach($current_user->roles as $key => $val){
			if(in_array($val, $membergroups)){
				$isMember = true;
			}
		}
		return $isMember;
	}
	return true;
}

add_action( 'post_submitbox_misc_actions', 'members_only_metabox' );
//add_action( 'add_meta_boxes', 'gsma_video_add_meta_box' );

function members_only_metabox(  ) {
	global $post;
	// Add an nonce field so we can check for it later.
	wp_nonce_field( 'gsmavideo_meta_box', 'gsmavideo_meta_box_nonce' );

	/*
	 * Use get_post_meta() to retrieve an existing value
	 * from the database and use the value for the form.
	 */
	$value = get_post_meta( $post->ID, '__restrict_to_member', true );
	echo
	'<div class="misc-pub-section restrict_member">		
		<input type="text" id="member_only_field" name="member_only_field" value="'.esc_attr( $value ).'" style="display:none"/>
		<input type="checkbox" name="member_only" value="1" '.($value==1?'checked="checked"':'').'/><label>Members Only</label>
	</div>';
}
function members_only_save_metabox_data( $post_id ) {

	/*
	 * We need to verify this came from our screen and with proper authorization,
	 * because the save_post action can be triggered at other times.
	 */

	// Check if our nonce is set.
	if ( ! isset( $_POST['gsmavideo_meta_box_nonce'] ) ) {
		return;
	}

	// Verify that the nonce is valid.
	if ( ! wp_verify_nonce( $_POST['gsmavideo_meta_box_nonce'], 'gsmavideo_meta_box' ) ) {
		return;
	}

	// If this is an autosave, our form has not been submitted, so we don't want to do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	// Check the user's permissions.
	if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {

		if ( ! current_user_can( 'edit_page', $post_id ) ) {
			return;
		}

	} else {

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
	}

	/* OK, it's safe for us to save the data now. */
	
	// Make sure that it is set.
	if ( ! isset( $_POST['member_only_field'] ) ) {
		return;
	}

	// Sanitize user input.
	$my_data = sanitize_text_field( $_POST['member_only'] );

	// Update the meta field in the database.
	update_post_meta( $post_id, '__restrict_to_member', $my_data );
}
add_action( 'save_post', 'members_only_save_metabox_data' );

add_action( 'admin_init', 'posts_order_wpse_91866' );

function posts_order_wpse_91866() {
    add_post_type_support( 'post', 'page-attributes' );
}
$order_posts = new WP_Query(array(
    'post_type' => 'post', 
    'post_status' => 'publish', 
    'orderby' => 'menu_order', 
    'order' => 'ASC', 
) );

define ( 'BP_AVATAR_FULL_WIDTH', 350 );
define ( 'BP_AVATAR_FULL_HEIGHT', 350 );


if(!function_exists('all_redirects')){
	function all_redirects(){
		$url = $_SERVER['REQUEST_URI'];
		$query = $_SERVER['QUERY_STRING'];
		if($url == '/register/' && !strpos($query,'realuser')){
			wp_redirect( '/', 302);
			exit;
		}	
	}
}
add_action('template_redirect', 'all_redirects');

function twentyfourteen_scripts() {
	$tmpurl = get_template_directory_uri();
	wp_enqueue_script( 'modernizr-js',get_template_directory_uri(). '/js/masonry.js', false, false, true );
}
add_action( 'wp_enqueue_scripts', 'twentyfourteen_scripts' );


function get_include_contents($filename) {
	// if you want to call a file to display its contents remember
	// the file needs to be within this directory or below it. 
	ob_start();
	if(file_exists($filename)) echo "file exists";
        include( $filename);
        return ob_get_clean();
}

function include_func( $atts ){
	$att2 = extract( shortcode_atts( array(
		'url' => '',
	), $atts ) );
	
	$includefile= "". $url;
	return  get_include_contents($includefile);
}
function includeHere($url){
	$includefile= "". $url;
	return  get_include_contents($includefile);
}
add_shortcode( 'include', 'include_func' );

function inventory_include(){
	include('inventory-system/embed.php');
}
add_shortcode( 'inventory', 'inventory_include' );

function download_button($atts,$content){
	$content = $content? $content : 'Download';
	$att2 = extract( shortcode_atts( array(
		'url' => '',		
	), $atts ) );
	return '<a class="download-button" href="'.$url.'" target="_blank">'.$content.'</a>';
}
add_shortcode( 'button', 'download_button' );

function inventory_callback(){
	global $current_user;
	//var_dump($current_user);
	//define('INVENTORY_USER',$current_user->id);
	//echo '<h1>'.$current_user->id.'</h1>';
	include('inventory-system/inventory-system.php');	
}
add_action( 'wp_ajax_inventory', 'inventory_callback' );



add_action( 'wp_ajax_nopriv_ajaxlogin', 'ajax_login' );
function ajax_login(){
	 // First check the nonce, if it fails the function will break
    check_ajax_referer( 'ajax-login-nonce', 'security' );
	
	// Nonce is checked, get the POST data and sign user on
    $info = array();
    $info['user_login'] = $_POST['log'];
    $info['user_password'] = $_POST['pwd'];
    $info['remember'] = true;

    $user_signon = wp_signon( $info, false );
    if ( is_wp_error($user_signon) ){
        echo json_encode(array('loggedin'=>false, 'message'=>__('Wrong username or password.')));
    } else {
        echo json_encode(array('loggedin'=>true, 'message'=>__('Login successful, redirecting...')));
    }

    die();
}
if ( function_exists( 'add_image_size' ) ) {
	add_image_size( 'story', 350);
}
?>